import type { GeoapifyRes } from '@shootismoke/ui';
import React from 'react';

import { ListItem } from '../../../components';
import { Location } from '../../../stores/util/fetchGpsPosition';

interface ItemProps {
	item: GeoapifyRes;
	onClick: (item: Location) => void;
}

export function GeoapifyItem(props: ItemProps): React.ReactElement {
	const { item, onClick } = props;

	const { city, country, formatted, lat, lon } = item;

	const handleClick = (): void => {
		onClick({
			latitude: lat,
			longitude: lon,
			name: [city, country].filter((_) => _).join(', ') || formatted,
		});
	};

	return (
		<ListItem
			description={formatted}
			icon="pin"
			onPress={handleClick}
			title={[city, country].filter((_) => _).join(', ') || formatted}
		/>
	);
}
