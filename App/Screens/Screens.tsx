import { NavigationContainer } from '@react-navigation/native'; //establishes how screen navigation should be done
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; //already been implemented, so no need to reimplemnet
import React, { useContext } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Api } from '@shootismoke/ui';

import { ApiContext, ErrorContext } from '../stores';
import * as theme from '../util/theme';
import { Details } from './Details';
import { ErrorScreen } from './ErrorScreen';
import { Home } from './Home';
import { Loading } from './Loading';
import { RootStackParams } from './routeParams';
import { Search } from './Search';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Solar } from './Solar';
import { TransportionView } from './Transportation/Transporation'; //import the trnasportation view
import 'react-native-gesture-handler'; //may be needed according to the tutorial
import {Profile} from './Profile';

/**
 * The main stack navigator, for the app.
 */
const RootStack = createBottomTabNavigator();
const PooStack = createStackNavigator();

/**
 * A stack navigator for the error case.
 */
const ErrorStack = createStackNavigator();

/**
 * Shared navigator screen options across different screens.
 */
const screenOpt = {
	options: { headerShown: false },
};

const HomeScreen = () => {
	return (
		<PooStack.Navigator initialRouteName="Smoke">
			<PooStack.Screen component={Home} name="Smoke" {...screenOpt} />
			<PooStack.Screen component={Search} name="Search" {...screenOpt} />
		</PooStack.Navigator>
	);
};

const OptionsScreen = () => {
	//this screen will keep track of the flow of the options screen when clicked on the transporation ba
	return (
		<PooStack.Navigator initialRouteName="Options">
			<PooStack.Screen
				component={TransportionView}
				name="Restaurant"
				{...screenOpt}
			/>
			<PooStack.Screen
				component={Search}
				name="Transportation"
				{...screenOpt}
			/>
		</PooStack.Navigator>
	);
};

function renderScreen(api?: Api, error?: Error): React.ReactElement {
	//we are calling on this function on the Screens function below
	if (error) {
		return (
			<ErrorStack.Navigator initialRouteName="Error">
				<ErrorStack.Screen
					component={ErrorScreen}
					name="Error"
					{...screenOpt}
				/>
				<ErrorStack.Screen
					component={Search}
					name="Search"
					{...screenOpt}
				/>
			</ErrorStack.Navigator>
		);
	}

	if (!api) {
		return <Loading />;
	}

	return (
		<>
			<RootStack.Navigator
				initialRouteName="Home"
				screenOptions={{
					tabBarStyle: { borderTopWidth: 0, borderTopColor: 'white' },
				}}
			>
				<RootStack.Screen
					component={HomeScreen} //look into the function HomeScreen to see how the routing mechanism has been established above
					name="Home"
					{...screenOpt}
					options={{
						tabBarIcon: ({ focused, ...restProps }) => (
							<Ionicons
								name="home"
								// size={30}
								style={{ marginTop: 15 }}
								// color={focused ? 'tomato' : 'black'}
								{...restProps}
							/>
						),
						tabBarActiveTintColor: 'tomato',
						headerShown: false,
					}}
				/>
				<RootStack.Screen
					component={Solar}
					name="Solar"
					{...screenOpt}
					options={{
						tabBarIcon: ({ focused, ...restProps }) => (
							<Ionicons
								name="map"
								// size={30}
								style={{ marginTop: 15 }}
								// color={focused ? 'tomato' : 'black'}
								{...restProps}
							/>
						),
						tabBarActiveTintColor: 'tomato',
						headerShown: false,
					}}
				/>
				<RootStack.Screen
					component={OptionsScreen} //this is the TransportationView Component, for now it's the same as the Home view
					name="Eco"
					{...screenOpt}
					options={{
						tabBarIcon: ({ focused, ...restProps }) => (
							<Ionicons
								name="leaf"
								// size={30}
								style={{ marginTop: 15 }}
								// color={focused ? 'tomato' : 'black'}
								{...restProps}
							/>
						),
						tabBarActiveTintColor: 'tomato',
						headerShown: false,
					}}
				/>
				<RootStack.Screen
					component={Profile}
					name="Profile"
					{...screenOpt}
					options={{
						tabBarIcon: ({ focused, ...restProps }) => (
							<Ionicons
								name="person"
								// size={30}
								style={{ marginTop: 15 }}
								// color={focused ? 'tomato' : 'black'}
								{...restProps}
							/>
						),
						tabBarActiveTintColor: 'tomato',
						headerShown: false,
					}}
				/>
			</RootStack.Navigator>
		</>
	);
}

export function Screens(): React.ReactElement {
	const { api } = useContext(ApiContext);
	const { error } = useContext(ErrorContext);

	return (
		<SafeAreaProvider>
			<StatusBar hidden={true} translucent={true} animated={true} />
			<View style={theme.fullScreen}>
				<NavigationContainer>
					{renderScreen(api, error)}
				</NavigationContainer>
			</View>
		</SafeAreaProvider>
	);
}
