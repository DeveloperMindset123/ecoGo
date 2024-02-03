import React from 'react';
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	View,
	ImageSourcePropType,
	ViewProps,
} from 'react-native';
import cigarette from '@shootismoke/ui/assets/images/cigarette.png';
import { scale } from 'react-native-size-matters';

import * as theme from '../../util/theme';
import { t } from '../../localization';

export interface ConversionBoxProps extends ViewProps {
	cigarettes?: 1 | 2 | 3;
	showFootnote?: boolean;
}

/**
 * Height of the cigarette image, also the line height of the "22" text.
 */
const LINE_HEIGHT = 44;

const styles = StyleSheet.create({
	box: {
		borderColor: '#EAEAEA',
		borderRadius: 8,
		borderWidth: 1,
		backgroundColor: 'white',
		marginTop: 20,
		marginBottom: 10,
		padding: 10,
	},
	boxDescription: {
		...theme.text,
		fontSize: 9,
		lineHeight: 16,
		marginTop: 15,
	},
	cigarette: {
		bottom: 12,
		height: LINE_HEIGHT,
		left: 6,
		position: 'absolute',
		width: LINE_HEIGHT,
	},
	equal: {
		...theme.text,
		color: theme.colors.gray600,
		fontSize: LINE_HEIGHT,
		lineHeight: LINE_HEIGHT,
		marginHorizontal: 18,
	},
	equivalence: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	label: {
		...theme.title,
		fontSize: 12,
		fontWeight: '900',
		letterSpacing: scale(0.5),
	},
	micro: {
		fontFamily: 'arial',
		...Platform.select({
			ios: {
				fontFamily: 'Georgia',
			},
			android: {
				fontFamily: 'normal',
			},
		}),
	},
	statisticsLeft: {
		alignItems: 'flex-end',
		paddingRight: 10,
		width: 90,
	},
	statisticsRight: {
		alignItems: 'center', // For mobile
		marginTop: 10,
		textAlign: 'center', // For web
		width: 90,
	},
	value: {
		...theme.text,
		color: theme.colors.gray600,
		fontSize: 40,
		fontWeight: '800' as const,
		lineHeight: LINE_HEIGHT,
	},
});

export function ConversionBox(props: ConversionBoxProps): React.ReactElement {
	const { cigarettes = 1, showFootnote, style, ...rest } = props;

	return (
		<View style={[styles.box, style]} {...rest}>
			<View style={styles.equivalence}>
				<View style={styles.statisticsLeft}>
					<Image
						source={cigarette as ImageSourcePropType}
						style={styles.cigarette}
					/>
					<Text style={styles.value} />
					<Text style={styles.label}>{t('about_box_per_day')}</Text>
				</View>
				<Text style={styles.equal}>=</Text>
				<View style={styles.statisticsRight}>
					<Text style={styles.value}>{22 * cigarettes}</Text>
					<Text style={styles.label}>
						<Text style={styles.micro}>&micro;</Text>
						g/m&sup3; PM2.5*
					</Text>
				</View>
			</View>
			{showFootnote && (
				<Text style={styles.boxDescription}>
					{t('about_box_footnote')}
				</Text>
			)}
		</View>
	);
}
