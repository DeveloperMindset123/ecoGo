import { config } from 'dotenv';

config();

module.exports = {
	android: {
		config: {
			googleMaps: {
				apiKey: process.env.GOOGLE_MAPS_API_KEY,
			},
		},
		bundleIdentifier: 'com.garvsl.hack-col',
		permissions: ['ACCESS_FINE_LOCATION'],
		versionCode: 20,
	},
	plugins: [
		[
			'expo-location',
			{
				locationAlwaysAndWhenInUsePermission:
					'Allow $(PRODUCT_NAME) to use your location.',
			},
		],
	],
	backgroundColor: '#000000',
	extra: {
		aqicnToken: process.env.AQICN_TOKEN,
		amplitudeApiKey: process.env.AMPLITUDE_API_KEY,
		backendSecret: process.env.BACKEND_SECRET,
		backendUrl: process.env.BACKEND_URL,
		geoapifyApiKey: process.env.GEOAPIFY_API_KEY,
	},
	ios: {
		config: {
			usesNonExemptEncryption: false,
			googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
		},
		bundleIdentifier: 'com.garvsl.hack-col',
		infoPlist: {
			NSLocationWhenInUseUsageDescription:
				'This app uses your location to find the air quality level near you.',
		},
	},
};
