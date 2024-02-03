import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import * as theme from '../../util/theme';

interface BackgroundProps {
	children?: JSX.Element;
	style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: theme.iconBackgroundColor,
		flexGrow: 1,
		justifyContent: 'center',
	},
});

export function Background(props: BackgroundProps): React.ReactElement {
	return (
		<View style={[styles.container, props.style]}>{props.children}</View>
	);
}
