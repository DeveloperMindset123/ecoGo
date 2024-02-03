import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewProps,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { Frequency, isStationTooFar } from '@shootismoke/ui';

import { t } from '../../../localization';
import { ApiContext, CurrentLocationContext } from '../../../stores';
import * as theme from '../../../util/theme';
import { RootStackParams } from '../../routeParams';

interface AdditionalInfoProps extends ViewProps {
	/**
	 * Whether the currently shown cigarettes are caculated exactly
	 */
	exactCount: boolean;
	frequency: Frequency;
	navigation: StackNavigationProp<RootStackParams, 'Home'>;
}

const styles = StyleSheet.create({
	linkToAbout: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	tag: {
		backgroundColor: '#C4C4C4',
		borderRadius: scale(10),
		marginRight: theme.spacing.mini,
		paddingHorizontal: scale(6),
		paddingVertical: scale(3),
	},
	tagLabel: {
		color: 'white',
		fontSize: scale(10),
		letterSpacing: scale(1),
		marginLeft: scale(2),
		textAlign: 'center',
	},
});

export function AdditionalInfo(
	props: AdditionalInfoProps
): React.ReactElement | null {
	const { api } = useContext(ApiContext);
	const { currentLocation } = useContext(CurrentLocationContext);
	const { exactCount, frequency, navigation, style, ...rest } = props;

	if (!currentLocation) {
		throw new Error(
			'Home/AdditionalInfo/AdditionalInfo.tsx only gets calculate the `distanceToStation` when `currentLocation` is defined.'
		);
	} else if (!api) {
		throw new Error(
			'Home/AdditionalInfo/AdditionalInfo.tsx only gets calculate the `distanceToStation` when `api` is defined.'
		);
	}

	const isTooFar = isStationTooFar(currentLocation, api.pm25);

	// Render a "station too far" warning
	if (isTooFar) {
		return (
			<View style={[theme.withPadding, style]} {...rest}>
				<Text style={theme.text}>
					{t('home_station_too_far_message')}
				</Text>
			</View>
		);
	}

	// Render a "beta" tag
	if (frequency !== 'daily' && !exactCount) {
		return (
			<View style={[theme.withPadding, style]} {...rest}>
				<TouchableOpacity
					onPress={(): void => {
						// eslint-disable-next-line
					}}
					style={styles.linkToAbout}
				>
					<View style={styles.tag}>
						<Text style={styles.tagLabel}>BETA</Text>
					</View>
					<Text style={theme.text}>
						{t('home_beta_not_accurate')}
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return null;
}
