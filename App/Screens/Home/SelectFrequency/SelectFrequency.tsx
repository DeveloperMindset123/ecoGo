import React, { useContext, useRef, useState } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { Frequency, FrequencyContext } from '@shootismoke/ui';

import { BoxButton } from '../../../components';
import { t } from '../../../localization';
import * as theme from '../../../util/theme';

const styles = StyleSheet.create({
	boxButton: {
		marginRight: theme.spacing.mini,
	},
	container: {
		flexDirection: 'row',
	},
	content: {
		paddingHorizontal: theme.spacing.normal,
	},
});

export function SelectFrequency(props: ScrollViewProps): React.ReactElement {
	const scroll = useRef<ScrollView>(null);
	const { frequency, setFrequency } = useContext(FrequencyContext);
	const [dailyWidth, setDailyWidth] = useState(0); // Width of the daily button

	const { style, ...rest } = props;

	function handleChangeFrequency(f: Frequency): void {
		setTimeout(() => {
			setFrequency(f);
		}, 400);
	}

	return (
		<ScrollView
			contentContainerStyle={styles.content}
			horizontal
			ref={scroll}
			showsHorizontalScrollIndicator={false}
			style={[styles.container, style]}
			{...rest}
		>
			<BoxButton
				active={frequency === 'daily'}
				onLayout={(event): void =>
					setDailyWidth(event.nativeEvent.layout.width)
				}
				onPress={(): void => {
					if (frequency === 'daily') {
						return;
					}

					if (scroll && scroll.current) {
						scroll.current.scrollTo({ x: 0 });
					}
					handleChangeFrequency('daily');
				}}
				style={styles.boxButton}
			>
				{t('home_frequency_daily')}
			</BoxButton>
			<BoxButton
				active={frequency === 'weekly'}
				onPress={(): void => {
					if (frequency === 'weekly') {
						return;
					}

					if (scroll && scroll.current) {
						scroll.current.scrollTo({
							x: dailyWidth + theme.spacing.mini,
						});
					}
					handleChangeFrequency('weekly');
				}}
				style={styles.boxButton}
			>
				{t('home_frequency_weekly')}
			</BoxButton>

			<BoxButton
				active={frequency === 'monthly'}
				onPress={(): void => {
					if (frequency === 'monthly') {
						return;
					}

					if (scroll && scroll.current) {
						scroll.current.scrollToEnd();
					}
					handleChangeFrequency('monthly');
				}}
				style={styles.boxButton}
			>
				{t('home_frequency_monthly')}
			</BoxButton>
		</ScrollView>
	);
}
