import { OpenAQResult, stationName } from '@shootismoke/dataproviders';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { t } from '../../localization';
import { Location } from '../../stores/util/fetchGpsPosition';
import * as theme from '../../util/theme';

const UNKNOWN_STATION = t('current_location_unknown_station');

interface CurrentLocationProps extends TextProps {
	measurement: OpenAQResult;
	currentLocation: Location;
}

const styles = StyleSheet.create({
	title: {
		...theme.title,
	},
});

export function CurrentLocation(
	props: CurrentLocationProps
): React.ReactElement {
	const { currentLocation, measurement, style, ...rest } = props;

	return (
		<Text style={[styles.title, style]} {...rest}>
			{(
				currentLocation.name ||
				stationName(measurement) ||
				UNKNOWN_STATION
			).toUpperCase()}
		</Text>
	);
}
