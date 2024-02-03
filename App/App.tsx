import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { FrequencyContextProvider } from '@shootismoke/ui';

import { Screens } from './Screens';
import { Background as LoadingBackground } from './Screens/Loading/Background';
import {
	ApiContextProvider,
	DistanceUnitProvider,
	ErrorContextProvider,
	LocationContextProvider,
} from './stores';
import 'react-native-gesture-handler'; //may be needed according the gesture handler

//import the navigation container
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export function App(): React.ReactElement {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		Promise.all([
			Font.loadAsync({
				Montserrat400:
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					require('../assets/fonts/Montserrat_Regular_400.ttf') as Font.FontResource,
				Montserrat500:
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					require('../assets/fonts/Montserrat_Medium_500.ttf') as Font.FontResource,
				Montserrat800:
					// eslint-disable-next-line @typescript-eslint/no-var-requires
					require('../assets/fonts/Montserrat_ExtraBold_800.ttf') as Font.FontResource,
			}),
		])
			.then(() => setReady(true))
			.catch((e) => {
				console.error(e);
			});
	}, []);

	return (
		<ErrorContextProvider>
			<LocationContextProvider>
				<ActionSheetProvider>
					<ApiContextProvider>
						<FrequencyContextProvider>
							<DistanceUnitProvider>
								{ready ? <Screens /> : <LoadingBackground />}
							</DistanceUnitProvider>
						</FrequencyContextProvider>
					</ApiContextProvider>
				</ActionSheetProvider>
			</LocationContextProvider>
		</ErrorContextProvider>
	);
}
