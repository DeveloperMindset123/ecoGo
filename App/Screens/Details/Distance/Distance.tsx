import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Banner } from '../../../components';
import { t } from '../../../localization';
import { useDistanceUnit } from '../../../stores/distanceUnit';
import * as theme from '../../../util/theme';

interface DistanceProps {
	distance: number;
}

const styles = StyleSheet.create({
	banner: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	distance: {
		...theme.title,
		color: 'white',
	},
});

export function Distance(props: DistanceProps): React.ReactElement {
	const { localizedDistanceUnit } = useDistanceUnit();
	const distanceUnit = localizedDistanceUnit('short');

	return (
		<Banner elevated shadowPosition="top" style={styles.banner}>
			<Text style={styles.distance}>
				{t('details_distance_label', {
					distanceToStation: props.distance,
					distanceUnit,
				}).toUpperCase()}
			</Text>
		</Banner>
	);
}
