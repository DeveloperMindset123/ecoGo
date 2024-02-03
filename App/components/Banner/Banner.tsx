import React from 'react';
import {
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	TouchableHighlight,
	View,
	ViewStyle,
} from 'react-native';

import * as theme from '../../util/theme';

interface BannerProps {
	asTouchable?: boolean;
	children?: React.ReactNode;
	elevated?: boolean | 'very';
	onClick?: (event: GestureResponderEvent) => void;
	shadowPosition?: theme.ShadowPosition;
	style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.orange,
		zIndex: 1,
	},
	content: {
		...theme.withPadding,
		alignItems: 'center',
		flexDirection: 'row',
		height: 48,
	},
});

export function Banner({
	asTouchable,
	children,
	elevated,
	onClick,
	shadowPosition = 'bottom',
	style,
}: BannerProps): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Wrapper: any = asTouchable ? TouchableHighlight : View;

	return (
		<Wrapper
			onPress={asTouchable ? onClick : undefined}
			style={[
				styles.container,
				elevated === true
					? theme.elevationShadowStyle(2, shadowPosition)
					: null,
				elevated === 'very'
					? theme.elevationShadowStyle(10, shadowPosition)
					: null,
			]}
			underlayColor={asTouchable ? theme.colors.orange : undefined} // https://github.com/facebook/react-native/issues/11834
		>
			<View
				pointerEvents={asTouchable ? 'none' : 'auto'}
				style={[styles.content, style]}
			>
				{children}
			</View>
		</Wrapper>
	);
}
