import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	StyleProp,
	TextStyle,
} from 'react-native';

import * as theme from '../../util/theme';

export interface ButtonProps extends TouchableOpacityProps {
	as?: typeof View; // Give a possibility to show the Button as View instead of TouchableOpacity
	children?: string | React.ReactElement;
	icon?: string;
	textStyle?: StyleProp<TextStyle>;
	type?: 'primary' | 'secondary' | 'full';
}

const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: theme.spacing.mini,
	},
	buttonText: {
		...theme.typography.type300,
		color: theme.colors.orange,
	},
	buttonTextFull: {
		...theme.typography.type300,
		color: 'white',
	},
	full: {
		backgroundColor: theme.colors.orange,
		borderColor: theme.colors.orange,
		borderRadius: 24,
		borderWidth: 2,
	},
	icon: {
		marginRight: theme.spacing.mini,
	},
	primary: {
		borderColor: theme.colors.orange,
		borderRadius: 24,
		borderWidth: 2,
	},
});

export function Button(props: ButtonProps): React.ReactElement {
	const {
		as: Wrapper = TouchableOpacity,
		children,
		onPress,
		style,
		textStyle,
		type = 'primary',
		...rest
	} = props;

	return (
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore FIXME TS doesn't seem to like this construct
		<Wrapper
			onPress={onPress}
			style={[
				styles.button,
				type === 'primary'
					? styles.primary
					: type === 'full'
					? styles.full
					: undefined,
				style,
			]}
			{...rest}
		>
			{children &&
				(typeof children === 'string' ? (
					<Text
						style={[
							type === 'full'
								? styles.buttonTextFull
								: styles.buttonText,
							textStyle,
						]}
					>
						{children}
					</Text>
				) : (
					children
				))}
		</Wrapper>
	);
}
