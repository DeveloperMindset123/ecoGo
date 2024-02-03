//this is the distance view
import { StackNavigationProp } from '@react-navigation/stack';
import { stationName } from '@shootismoke/dataproviders';
import homeIcon from '@shootismoke/ui/assets/images/home.png';
import stationIcon from '@shootismoke/ui/assets/images/station.png';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ImageURISource, StyleSheet, View } from 'react-native';
import MapView, { MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import truncate from 'truncate';
import { distanceToStation, getCorrectLatLng } from '@shootismoke/ui';
import { Dimensions } from 'react-native';
import { t } from '../../localization';
import { ApiContext, CurrentLocationContext } from '../../stores';
import { useDistanceUnit } from '../../stores/distanceUnit';
import { RootStackParams } from '../routeParams';
import { GOOGLE_MAPS_API_KEY } from '@env';

interface DetailsProps {
	navigation: StackNavigationProp<RootStackParams, 'Details'>;
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height / 1.8,
	},
	map: {
		width: '100%',
		height: '100%',
	},
	mapContainer: {
		flexGrow: 1,
	},
});

// Holds the ref to the MapView.Marker representing the AQI station
let stationMarker: MapMarker | undefined;

export function TransportionView(props: DetailsProps): React.ReactElement {
	//this is the transportation view of the screen
	const { navigation } = props;

	const [showMap, setShowMap] = useState(false);
	const { api } = useContext(ApiContext);
	const { currentLocation: _currentLocation } = useContext(
		CurrentLocationContext
	);
	const { distanceUnit } = useDistanceUnit();

	useEffect(() => {
		// Show map after 200ms for smoother screen transition
		setTimeout(() => setShowMap(true), 500);
	}, []);

	const handleMapReady = (): void => {
		stationMarker &&
			stationMarker.showCallout &&
			stationMarker.showCallout();
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
			'Transportation/Transportation.tsx only convert `distanceToStation` when `currentLocation` is defined.'
		);
	} else if (!api) {
		throw new Error(
			'Transportation/Transportation.tsx only convert `distanceToStation` when `api` is defined.'
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

	return (
		<View style={styles.container}>
			<View style={styles.mapContainer}>
				{showMap && (
					<MapView
						initialRegion={{
							latitude:
								(currentLocation.latitude + station.latitude) /
								2,
							latitudeDelta:
								Math.abs(
									currentLocation.latitude - station.latitude
								) * 2,
							longitude:
								(currentLocation.longitude +
									station.longitude) /
								2,
							longitudeDelta:
								Math.abs(
									currentLocation.longitude -
										station.longitude
								) * 2,
						}}
						onMapReady={handleMapReady}
						provider={PROVIDER_GOOGLE}
						style={styles.map}
					>
						<MapMarker
							coordinate={station}
							ref={handleStationRef}
							title={t('details_air_quality_station_marker')}
							description={truncate(station.description, 40)}
						>
							{/* FIXME https://github.com/react-native-maps/react-native-maps/issues/3664 */}
							<Image source={stationIcon as ImageURISource} />
						</MapMarker>
						<MapMarker
							coordinate={currentLocation}
							title={t('details_your_position_marker')}
						>
							{/* FIXME https://github.com/react-native-maps/react-native-maps/issues/3664 */}
							<Image source={homeIcon as ImageURISource} />
						</MapMarker>
					</MapView>
				)}
			</View>
		</View>
	);
}
