import Ionicons from '@expo/vector-icons/build/Ionicons';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Button, ButtonProps } from '../Button';
import * as theme from '../../util/theme';

interface CircleButtonProps extends ButtonProps {
	icon?: string;
	inverted?: boolean;
	text?: string;
}

const styles = StyleSheet.create({
	circle: {
		height: scale(36),
		paddingVertical: 0,
		width: scale(36),
	},
	invertedCircle: {
		backgroundColor: theme.colors.orange,
		borderWidth: 0,
	},
	label: {
		...theme.title,
		color: theme.colors.orange,
		fontSize: scale(9),
		letterSpacing: 0,
	},
});

/**
 * Decide whether we show an icon or a text
 */
function renderIconOrText(
	icon?: string,
	inverted?: boolean,
	text?: string
): React.ReactElement | undefined {
	return icon ? (
		<Ionicons
			color={inverted ? 'white' : theme.colors.orange}
			name={icon as 'body'} // FIXME Typings are really not optimal here, `icon` is obviously a string, but using 'body' to make TS happy.
			size={scale(22)}
		/>
	) : text ? (
		<Text style={styles.label}>{text}</Text>
	) : undefined;
}

export function CircleButton(props: CircleButtonProps): React.ReactElement {
	const { icon, inverted, style, text, ...rest } = props;

	return (
		<Button
			style={[
				styles.circle,
				inverted ? styles.invertedCircle : undefined,
				style,
			]}
			{...rest}
		>
			{renderIconOrText(icon, inverted, text)}
		</Button>
	);
}
