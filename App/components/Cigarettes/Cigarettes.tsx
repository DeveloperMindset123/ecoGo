import React from 'react';
import { StyleProp, StyleSheet, View, ViewProps } from 'react-native';

import { round } from '@shootismoke/ui/lib/util/api';
import { Cigarette } from './Cigarette';

export interface CigarettesProps extends ViewProps {
	/**
	 * The number of cigarettes to show.
	 */
	cigarettes: number;
	/**
	 * Additional styling for inner cigarettes
	 */
	cigaretteStyle?: StyleProp<ViewProps>;
	/**
	 * Length, in pixels, of a full cigarette.
	 *
	 * @default 90
	 */
	fullCigaretteLength?: number;
	/**
	 * The maximum number of cigarettes to show.
	 *
	 * @default 50
	 */
	showMaxCigarettes?: number;
	/**
	 * For small amount of cigarettes, we display them horizontally. After this
	 * number, they are displayed vertically.
	 *
	 * @default 4
	 */
	showVerticalAfter?: number;
	/**
	 * Horizontal spacing, in pixels, between the cigarettes, assuming the
	 * cigarettes are displayed vertically.
	 *
	 * @default 5
	 */
	spacingHorizontal?: number;
	/**
	 * Vertical spacing, in pixels, between the cigarettes, assuming the
	 * cigarettes are displayed vertically.
	 *
	 * @default 20
	 */
	spacingVertical?: number;
}

const styles = StyleSheet.create({
	innerContainer: {
		alignContent: 'flex-end',
		alignItems: 'flex-end',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});

export function Cigarettes(props: CigarettesProps): React.ReactElement {
	const {
		cigarettes: realCigarettes,
		cigaretteStyle,
		fullCigaretteLength = 90,
		showMaxCigarettes = 50,
		showVerticalAfter = 4,
		spacingHorizontal = 5,
		spacingVertical = 20,
		style,
		...rest
	} = props;

	// We don't show more than `showMaxCigarettes` cigarettes, and we round to
	// 0.1.
	const cigarettes = round(
		Math.max(0.1, Math.min(realCigarettes, showMaxCigarettes))
	);

	const count = Math.floor(cigarettes); // The cigarette count, without decimal.
	const decimal = cigarettes - count;

	const orientation =
		cigarettes <= 1
			? 'diagonal'
			: cigarettes <= showVerticalAfter
			? 'horizontal'
			: 'vertical';
	const baseCigaretteStyle =
		orientation === 'diagonal'
			? undefined
			: orientation === 'horizontal'
			? {
					marginBottom: spacingHorizontal,
					marginRight: spacingVertical,
			  }
			: {
					marginBottom: spacingVertical,
					marginRight: spacingHorizontal,
			  };

	return (
		<View style={[styles.innerContainer, style]} {...rest}>
			{cigarettes > 1 &&
				count >= 1 &&
				Array.from(Array(count)).map((_, i) => (
					<Cigarette
						key={i}
						orientation={orientation}
						percentage={1}
						fullCigaretteLength={fullCigaretteLength}
						style={[baseCigaretteStyle, cigaretteStyle]}
					/>
				))}
			{(cigarettes === 1 || decimal > 0) && (
				<Cigarette
					orientation={orientation}
					percentage={decimal || 1}
					fullCigaretteLength={fullCigaretteLength}
					style={[baseCigaretteStyle, cigaretteStyle]}
				/>
			)}
		</View>
	);
}
