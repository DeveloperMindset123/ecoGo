import { StackNavigationProp } from "@react-navigation/stack";
import { stationName } from "@shootismoke/dataproviders";
import homeIcon from "@shootismoke/ui/assets/images/home.png";
import stationIcon from "@shootismoke/ui/assets/images/station.png";
import React, { useContext, useEffect, useState } from "react";
import { Image, ImageURISource, StyleSheet, View } from "react-native";
import MapView, {
  MapMarker,
  Heatmap,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import truncate from "truncate";
import { distanceToStation, getCorrectLatLng } from "@shootismoke/ui";
import { Dimensions } from "react-native";
import { t } from "../../localization";
import { ApiContext, CurrentLocationContext } from "../../stores";
import { useDistanceUnit } from "../../stores/distanceUnit";
import { RootStackParams } from "../routeParams";
import axios from "axios";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { AuthContext } from "../../AuthProvider";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

interface DetailsProps {
  navigation: StackNavigationProp<RootStackParams, "Details">;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.8,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    flexGrow: 1,
  },
});

// Holds the ref to the MapView.Marker representing the AQI stationss
let stationMarker: MapMarker | undefined;

const fetchAirQualityData = async (latitude: any, longitude: any) => {
  try {
    const response = await axios.post(
      `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${GOOGLE_MAPS_API_KEY}`,
      {
        location: {
          latitude,
          longitude,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    return null;
  }
};

export function Pollution(props: DetailsProps): React.ReactElement {
  const { navigation } = props;
  const { markers } = useContext(AuthContext); // Add this line to use markers from AuthContext

  const [showMap, setShowMap] = useState(false);
  const { api } = useContext(ApiContext);
  const [processedData, setProcessedData] = useState<any>([]);
  const { currentLocation: _currentLocation } = useContext(
    CurrentLocationContext
  );
  const { distanceUnit } = useDistanceUnit();

  useEffect(() => {
    // Show map after 200ms for smoother screen transition
    setTimeout(() => setShowMap(true), 500);
  }, []);

  const handleMapReady = (): void => {
    stationMarker && stationMarker.showCallout && stationMarker.showCallout();
  };

  const handleStationRef = (ref: MapMarker): void => {
    stationMarker = ref;
  };

  // TODO
  // I have no idea why, but if we don't clone the object, and continue to
  // use `location.current` everywhere, we get a `setting key of frozen
  // object` error. It's related to the MapView below.
  // eslint-disable-next-line
  const currentLocation = { ..._currentLocation! };

  if (!currentLocation) {
    throw new Error(
      "Details/Details.tsx only convert `distanceToStation` when `currentLocation` is defined."
    );
  } else if (!api) {
    throw new Error(
      "Details/Details.tsx only convert `distanceToStation` when `api` is defined."
    );
  }

  const distance = distanceToStation(currentLocation, api.pm25, distanceUnit);

  const station = {
    description: stationName(api.pm25),
    title: stationName(api.pm25),
    ...getCorrectLatLng(
      currentLocation,
      // Only in rare cases is `api.pm25.coordinates` undefined. In this
      // case, we would just show 0km distance.
      api.pm25.coordinates || currentLocation
    ),
  };

  const calculateSurroundingPoints = (
    centerLocation: any,
    distance = 0.01,
    count = 4
  ) => {
    // Generates points in a square grid around centerLocation
    let points = [];
    for (let i = -count; i <= count; i++) {
      for (let j = -count; j <= count; j++) {
        points.push({
          latitude: centerLocation.latitude + i * distance,
          longitude: centerLocation.longitude + j * distance,
        });
      }
    }
    return points;
  };

  const fetchAirQualityData = async (latitude, longitude) => {
    try {
      const response = await axios.post(
        `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${GOOGLE_MAPS_API_KEY}`,
        { location: { latitude, longitude } },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("Fetched data:", response.data); // Log fetched data
      return [response.data, { latitude, longitude }];
    } catch (error) {
      console.error("Error fetching air quality data:", error);
      return null;
    }
  };

  const processAirQualityData = (data: any) => {
    if (data && data[0].indexes && Array.isArray(data[0].indexes)) {
      const aqiData = data[0].indexes[0];
      return {
        latitude: data[1].latitude,
        longitude: data[1].longitude,
        weight: aqiData.aqi,
      };
    }
    return null; // Return null for invalid data
  };

  const fetchSurroundingAirQualityData = async (currentLocation: any) => {
    const surroundingPoints = calculateSurroundingPoints(currentLocation);
    const allDataPromises = surroundingPoints.map((point) =>
      fetchAirQualityData(point.latitude, point.longitude)
    );

    try {
      const allData = await Promise.all(allDataPromises);
      // console.log("alllll data", allData);
      // console.log('index',)
      return allData
        .filter((data) => data && data[0].indexes)
        .map((data) => processAirQualityData(data))
        .filter((point) => point !== null) // Filter out null points
        .flat();
    } catch (error) {
      console.error("Error fetching data for surrounding areas:", error);
      return [];
    }
  };

  useEffect(() => {
    if (currentLocation && showMap) {
      fetchSurroundingAirQualityData(currentLocation)
        .then((surroundingData) => {
          const validData = surroundingData.filter((point) => point !== null);
          // console.log("Processed surrounding data:", validData); // Log processed data
          setProcessedData(validData);
        })
        .catch((err) => console.error(err));
    }
  }, [showMap]);
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {showMap && (
          <MapView
            initialRegion={{
              latitude: (currentLocation.latitude + station.latitude) / 2,
              latitudeDelta:
                Math.abs(currentLocation.latitude - station.latitude) * 2,
              longitude: (currentLocation.longitude + station.longitude) / 2,
              longitudeDelta:
                Math.abs(currentLocation.longitude - station.longitude) * 2,
            }}
            onMapReady={handleMapReady}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
          >
            {processedData && processedData.length > 0 && (
              <>
                <Heatmap
                  points={processedData}
                  radius={40} // Try adjusting the radius for better clarity
                  opacity={0.8} // Adjust opacity to prevent over-saturation
                  gradient={{
                    colors: ["green", "yellow", "orange", "red"], // You can add more colors for better gradation
                    startPoints: [0.1, 0.3, 0.6, 0.9], // Adjust these based on your AQI data range
                    colorMapSize: 256,
                  }}
                />
                <MapMarker
                  coordinate={station}
                  ref={handleStationRef}
                  title={t("details_air_quality_station_marker")}
                  description={truncate(station.description, 40)}
                >
                  {/* FIXME https://github.com/react-native-maps/react-native-maps/issues/3664 */}
                  <Image source={stationIcon as ImageURISource} />
                </MapMarker>
                <MapMarker
                  coordinate={currentLocation}
                  title={t("details_your_position_marker")}
                >
                  {/* FIXME https://github.com/react-native-maps/react-native-maps/issues/3664 */}
                  <Image source={homeIcon as ImageURISource} />
                </MapMarker>
                {markers.map((marker, index) => (
                  <MapMarker
                    key={index}
                    coordinate={{
                      latitude: Number(marker.latitude),
                      longitude: Number(marker.longitude),
                    }}
                    title={`Marker ${index + 1}`}
                  >
                    <Ionicons name="trash-bin-sharp" size={24} color="red" />
                  </MapMarker>
                ))}
              </>
            )}
          </MapView>
        )}
      </View>
    </View>
  );
}
