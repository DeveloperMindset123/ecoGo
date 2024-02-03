import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { t } from '../localization';
import { noop, DistanceUnit } from '@shootismoke/ui';

type DistanceUnitFormat = 'short' | 'long';

const STORAGE_KEY = 'DISTANCE_UNIT';

interface ContextType {
	distanceUnit: DistanceUnit;
	setDistanceUnit: (distanceUnit: DistanceUnit) => void;
	localizedDistanceUnit: (format: DistanceUnitFormat) => string;
}

const Context = createContext<ContextType>({
	distanceUnit: 'km',
	localizedDistanceUnit: () => '',
	setDistanceUnit: noop,
});

export function DistanceUnitProvider({
	children,
}: {
	children: React.ReactNode;
}): React.ReactElement {
	const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');

	function localizedDistanceUnit(format: 'short' | 'long'): string {
		return distanceUnit === 'km'
			? t(`distance_unit_${format}_km`)
			: t(`distance_unit_${format}_mi`);
	}

	useEffect(() => {
		async function getDistanceUnit(): Promise<void> {
			const unit = await AsyncStorage.getItem(STORAGE_KEY);

			if (unit === 'km' || unit === 'mile') {
				setDistanceUnit(unit);
			}
		}

		getDistanceUnit().catch((err) => {
			console.error(err);
		});
	}, []);

	useEffect(() => {
		AsyncStorage.setItem(STORAGE_KEY, distanceUnit).catch((err) => {
			console.error(err);
		});
	}, [distanceUnit]);

	return (
		<Context.Provider
			value={{ distanceUnit, setDistanceUnit, localizedDistanceUnit }}
		>
			{children}
		</Context.Provider>
	);
}

export const useDistanceUnit = (): ContextType => useContext(Context);
