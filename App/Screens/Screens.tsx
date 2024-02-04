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
import { TransportionView } from './Eco/Eco'; //import the trnasportation view
import 'react-native-gesture-handler'; //may be needed according to the tutorial
import { OptionsScreen } from '../components/OptionsView/OptionsView';  //add this to the ListOptions function
import  Community  from './Eco/Community/Community';  //add this to the ListOptions function
import Shopping  from './Eco/Shopping/Shopping';  //add this to the ListOptions function
import  Transportation  from './Eco/Transportation/Transportation';  //add this to the ListOptions function
import Restaurants from './Eco/Restaurants/Restaurants';
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

const ListOptions = () => {
	//this screen will keep track of the flow of the options screen when clicked on the transporation ba
	return (  //use this to declare the list of screens and their navigation
		<PooStack.Navigator initialRouteName="OptionsView">
			<PooStack.Screen
				component={OptionsScreen}
				name="OptionsScreen"
				{...screenOpt}
			/>
			<PooStack.Screen
				component={Community}
				name="CommunityHelpers" //ensure that the names here matches the names on the data array
				{...screenOpt}
			/>
			<PooStack.Screen
				component={Shopping}
				name="ShoppingScreen"  //this is the name of the screen associated with the data array in the OptionsView.tsx
				{...screenOpt}
				/>
			<PooStack.Screen 
				component={Transportation}
				name="TransportationScreen"  //this is the name of the screen associated with the data array in OptionsView.tsx
				{...screenOpt}
			/>
			<PooStack.Screen
				component={Restaurants}
				name="EatsScreen"  //this is the name of the screen associated with the data array in OptionsView.tsx
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

	return (  //this section deals with the navbar component
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
					component={ListOptions} //this is the TransportationView Component, for now it's the same as the Home view
					name="Eco"  //this is the TransportationView and RestaurantView landing page
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
					component={Details}
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
