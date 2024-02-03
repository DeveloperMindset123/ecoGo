import type { LatLng } from '@shootismoke/dataproviders';
import * as ExpoLocation from 'expo-location';

export interface Location extends LatLng {
	city?: string;
	country?: string;
	name?: string;
}

/**
 * withTimeout wraps another promise, and rejects if the inner promise
 * time outs after `timeout`.
 *
 * @param p - Promise to add timeout to.
 */
export function withTimeout<T>(
	p: Promise<T>,
	timeout: number,
	desc?: string
): Promise<T> {
	return Promise.race([
		new Promise<T>((_resolve, reject) => {
			setTimeout(() => {
				return reject(new Error(`Request ${desc || ''}timed out.`));  //I am running into this error at the moment on the emulator
			}, timeout);
		}),
		p,
	]);
}

export async function fetchReverseGeocode(
	currentLocation: LatLng
): Promise<Location> {
	const reverseHits = await ExpoLocation.reverseGeocodeAsync(currentLocation);

	if (reverseHits.length) {
		// throw new Error('Reverse geocoding returned no results');
	}
	const reverse = reverseHits[0];

	return {
		...currentLocation,
		city: reverse.city || undefined, // Convert null to undefined.
		country: reverse.country || undefined, // Convert null to undefined.
		name:
			[reverse.street, reverse.city, reverse.country]
				.filter((x) => x)
				.join(', ') ||
			// This case happens when e.g. we're in the middle of the ocean
			[reverse.name, reverse.country].filter((x) => x).join(', '),
	};
}

export async function fetchGpsPosition(): Promise<ExpoLocation.LocationObject> {
	const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
	if (status !== 'granted') {
		throw new Error('Permission to access location was denied');
	}

	//const gps = await ExpoLocation.getCurrentPositionAsync();  // --> uncomment this later when we are testing it out on Garv's phone

	//define the hardcoded gps location here for testing purposes
	const gps = {
		coords: {
		  latitude: 40.8091,
		  longitude: -73.9604,
		},
		timestamp: Date.now(),
	  };
	// console.log('gps:', gps);
	// console.log(`[fetchGpsPosition]: Got ${JSON.stringify(gps.coords)}`);

	// Uncomment to get other locations
	// return {
	// 	coords: {
	// 		latitude: Math.random() * 90,
	// 		longitude: Math.random() * 90,
	// 	},
	// };
	// return {
	// 	coords: {
	// 		latitude: 48.4,
	// 		longitude: 2.34,
	// 	},
	// };
	return gps;
}
