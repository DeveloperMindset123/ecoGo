import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	TouchableWithoutFeedbackProps,
	View,
} from 'react-native';

import * as theme from '../../util/theme';

interface BoxButtonProps extends TouchableWithoutFeedbackProps {
	active?: boolean;
	children: string | JSX.Element;
}

const styles = StyleSheet.create({
	activeText: {
		color: theme.colors.gray700,
	},
	boxButton: {
		...theme.elevationShadowStyle(3),
		backgroundColor: 'white',
		borderColor: 'rgba(0, 0, 0, 0.1)',
		borderRadius: 12,
		borderWidth: 1,
		marginBottom: theme.spacing.mini,
		paddingHorizontal: theme.spacing.small,
		paddingVertical: 6, // Padding for the shadow
		shadowOpacity: 0.1,
	},
	boxButtonText: {
		...theme.shitText,
		color: theme.colors.gray200,
		textAlign: 'center',
	},
});

export function BoxButton(props: BoxButtonProps): React.ReactElement {
	const { active, children, onPress, style, ...rest } = props;

	return (
		<TouchableWithoutFeedback onPress={onPress} {...rest}>
			<View style={[styles.boxButton, style]}>
				{typeof children === 'string' ? (
					<Text
						style={[
							styles.boxButtonText,
							active ? styles.activeText : undefined,
						]}
					>
						{children}
					</Text>
				) : (
					children
				)}
			</View>
		</TouchableWithoutFeedback>
	);
}
