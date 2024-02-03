import gpsIcon from '@shootismoke/ui/assets/images/location-big.png';
import pinIcon from '@shootismoke/ui/assets/images/location.png';
import React from 'react';
import {
	Image,
	ImageRequireSource,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
} from 'react-native';

import * as theme from '../../util/theme';

interface ListItemProps extends TouchableOpacityProps {
	description: string;
	icon: 'pin' | 'gps';
	title: string;
}

const styles = StyleSheet.create({
	container: {
		...theme.withPadding,
		alignItems: 'center',
		flexDirection: 'row',
		paddingVertical: theme.spacing.normal,
	},
	description: {
		...theme.text,
	},
	result: {
		marginLeft: theme.spacing.normal,
	},
	title: {
		...theme.title,
	},
});

export function ListItem(props: ListItemProps): React.ReactElement {
	const { description, icon, title, ...rest } = props;

	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<Image
				source={
					icon === 'gps'
						? (gpsIcon as ImageRequireSource)
						: (pinIcon as ImageRequireSource)
				}
			/>
			<View style={styles.result}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.description}>{description}</Text>
			</View>
		</TouchableOpacity>
	);
}
