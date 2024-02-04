import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { noop } from '@shootismoke/ui';
import { ErrorContext } from './error';
import {
	fetchGpsPosition,
	fetchReverseGeocode,
	Location,
	withTimeout,
} from './util/fetchGpsPosition';

const LAST_KNOWN_LOCATION_KEY = 'LAST_KNOWN_LOCATION';

interface LocationWithSetter {
	currentLocation?: Location;
	isGps: boolean;
	setCurrentLocation: (location?: Location) => void;
}

export const GpsLocationContext = createContext<{
	gps?: Location;
	setGpsLocation: (location?: Location) => void;
}>({ setGpsLocation: noop });
export const CurrentLocationContext = createContext<LocationWithSetter>({
	isGps: false,
	setCurrentLocation: noop,
});

// fetchFromAsyncStorage will try to fetch the last known location from
// AsyncStorage, or throw an error if there is no last known location.
async function fetchFromAsyncStorage(err: Error): Promise<Location> {
	try {
		const locationString = await AsyncStorage.getItem(
			LAST_KNOWN_LOCATION_KEY
		);

		// Skip parsing if AsyncStorage is empty.
		if (!locationString) {
			throw new Error('AsyncStorage has no LAST_KNOWN_LOCATION');
		}

		const parsedLocation = JSON.parse(locationString) as Location;

		// Make sure parsedLocation is well-formed.
		if (!parsedLocation.latitude || !parsedLocation.longitude) {
			throw new Error(
				'AsyncStorage has ill-formatted LAST_KNOWN_LOCATION'
			);
		}

		console.log(
			'[LocationContext]: Using last known location',
			parsedLocation.name
		);
		return parsedLocation;
	} catch (_e) {
		throw err;
	}
}

export function LocationContextProvider({
	children,
}: {
	children: JSX.Element;
}): React.ReactElement {
	const { setError } = useContext(ErrorContext);

	const [gpsLocation, setGpsLocation] = useState<Location>();
	const [currentLocation, setCurrentLocation] = useState<Location>();

	// Fetch GPS location
	useEffect(() => {
		fetchGpsPosition()  //this will remove the timeout
		.then(({ coords }) => {
		setGpsLocation(coords);
		setCurrentLocation(coords);

				// don't want to wait for the reverse geocode to
				// finish, so we don't await/return it.
				//withTimeout(  --> uncomment if you want timeout enabled
					fetchReverseGeocode(coords).then((gpsLocation) => {
						setGpsLocation(gpsLocation);
						setCurrentLocation(coords);
					})//,
					//5000,
					//'for fetchReverseGeocode ')
				.catch((err) => {
					console.error(err);
				});
			})
			.catch((err) =>
				fetchFromAsyncStorage(err as Error).then(setCurrentLocation)
			)
			.catch((err: Error) => {
				setError(err);
			});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		currentLocation &&
			AsyncStorage.setItem(
				LAST_KNOWN_LOCATION_KEY,
				JSON.stringify(currentLocation)
			)
				.then(() => {
					console.log(
						'[LocationContext]: Last known location updated to',
						JSON.stringify(currentLocation)
					);
				})
				.catch((err) => {
					console.error(err);
				});
	}, [currentLocation]);

	return (
		<GpsLocationContext.Provider
			value={{ gps: gpsLocation, setGpsLocation }}
		>
			<CurrentLocationContext.Provider
				value={{
					currentLocation,
					isGps:
						!!currentLocation &&
						!!gpsLocation &&
						currentLocation.latitude === gpsLocation.latitude &&
						currentLocation.longitude === gpsLocation.longitude,
					setCurrentLocation,
				}}
			>
				{children}
			</CurrentLocationContext.Provider>
		</GpsLocationContext.Provider>
	);
}
