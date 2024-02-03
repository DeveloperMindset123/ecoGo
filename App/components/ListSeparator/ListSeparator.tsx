import React from 'react';
import { StyleSheet, View } from 'react-native';

import * as theme from '../../util/theme';

const styles = StyleSheet.create({
	separator: {
		backgroundColor: '#D2D2D2',
		height: 1,
		marginHorizontal: theme.spacing.normal,
	},
});

export function ListSeparator(): React.ReactElement {
	return <View style={styles.separator} />;
}
