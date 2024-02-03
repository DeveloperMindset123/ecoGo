import backIcon from '@shootismoke/ui/assets/images/back.png';
import React from 'react';
import {
	GestureResponderEvent,
	Image,
	ImageRequireSource,
	StyleProp,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';

import { t } from '../../localization';
import * as theme from '../../util/theme';

interface BackButtonProps {
	onPress: (event: GestureResponderEvent) => void;
	style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
	backButton: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	backText: {
		...theme.text,
		marginLeft: 9,
	},
});

export function BackButton(props: BackButtonProps): React.ReactElement {
	const { style } = props;

	return (
		<View style={style}>
			<TouchableOpacity
				hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
				onPress={props.onPress}
				style={styles.backButton}
			>
				<Image source={backIcon as ImageRequireSource} />
				<Text style={styles.backText}>{t('nav_btn_back')}</Text>
			</TouchableOpacity>
		</View>
	);
}
