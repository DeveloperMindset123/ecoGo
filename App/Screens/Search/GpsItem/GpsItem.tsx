import React, { useContext } from 'react';

import { ListItem } from '../../../components';
import { t } from '../../../localization';
import { CurrentLocationContext, GpsLocationContext } from '../../../stores';

export function GpsItem(): React.ReactElement | null {
	const { setCurrentLocation } = useContext(CurrentLocationContext);
	const { gps } = useContext(GpsLocationContext);

	if (!gps) {
		return null;
	}

	const handleClick = (): void => {
		setCurrentLocation(gps);
	};

	return (
		<ListItem
			description={t('search_current_location')}
			icon="gps"
			onPress={handleClick}
			title={gps.name || 'Your City'}
		/>
	);
}
