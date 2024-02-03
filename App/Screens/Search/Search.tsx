import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import React, { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FrequencyContext, geoapify, GeoapifyRes } from '@shootismoke/ui';

import { BackButton, ListSeparator } from '../../components';
import { CurrentLocationContext, GpsLocationContext } from '../../stores';
import { Location } from '../../stores/util/fetchGpsPosition';
import * as theme from '../../util/theme';
import { RootStackParams } from '../routeParams';
import { GpsItem } from './GpsItem';
import { SearchHeader } from './SearchHeader';
import { GeoapifyItem } from './GeoapifyItem';

// Timeout to detect when user stops typing
let typingTimeout: NodeJS.Timeout | null = null;

interface SearchProps {
	navigation: StackNavigationProp<RootStackParams, 'Search'>;
}

const styles = StyleSheet.create({
	backButton: {
		...theme.withPadding,
		marginVertical: theme.spacing.normal,
	},
	container: {
		flexGrow: 1,
	},
	list: {
		flex: 1,
	},
	noResults: {
		...theme.text,
		...theme.withPadding,
		marginTop: theme.spacing.normal,
	},
});

function renderSeparator(): React.ReactElement {
	return <ListSeparator />;
}

export function Search(props: SearchProps): React.ReactElement {
	const {
		navigation: { goBack },
	} = props;

	const { isGps, setCurrentLocation } = useContext(CurrentLocationContext);
	const { setFrequency } = useContext(FrequencyContext);
	const { gps } = useContext(GpsLocationContext);

	const [GeoapifyError, setGeoapifyError] = useState<Error | undefined>(
		undefined
	);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [hits, setHits] = useState<GeoapifyRes[]>([]);

	function handleChangeSearch(s: string): void {
		setSearch(s);
		setGeoapifyError(undefined);
		setHits([]);

		if (!s) {
			return;
		}

		setLoading(true);

		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}
		typingTimeout = setTimeout(() => {
			geoapify(
				s,
				Constants.expoConfig?.extra?.geoapifyApiKey as string,
				gps
			)
				.then((hits) => {
					// Only show single occurrence of a location.
					const occurrences: Record<string, true> = {};
					return hits.filter((hit) => {
						if (occurrences[`${hit.lat}:${hit.lon}`]) {
							return false;
						} else {
							occurrences[`${hit.lat}:${hit.lon}`] = true;
							return true;
						}
					});
				})
				.then((hits) => {
					setGeoapifyError(undefined);
					setLoading(false);
					setFrequency('daily');
					setHits(hits);
				})
				.catch((err) => {
					console.error(err);
				});
		}, 500);
	}

	function handleItemClick(item: Location): void {
		setCurrentLocation(item);
	}

	function renderItem({ item }: { item: GeoapifyRes }): React.ReactElement {
		return <GeoapifyItem item={item} onClick={handleItemClick} />;
	}

	function renderEmptyList(
		GeoapifyError: Error | undefined,
		hits: GeoapifyRes[],
		loading: boolean,
		search: string,
		isGps: boolean
	): React.ReactElement | null {
		if (isGps && !search) {
			return null;
		}
		if (!search) return <GpsItem />;
		if (loading) {
			return <Text style={styles.noResults}>Waiting for results...</Text>;
		}
		if (GeoapifyError) {
			return (
				<Text style={styles.noResults}>
					Error fetching locations. Please try again later.
				</Text>
			);
		}
		if (hits && hits.length === 0) {
			return <Text style={styles.noResults}>No results.</Text>;
		}
		return <Text style={styles.noResults}>Waiting for results.</Text>;
	}

	return (
		<View style={styles.container}>
			<BackButton onPress={goBack} style={styles.backButton} />
			<SearchHeader onChangeSearch={handleChangeSearch} search={search} />
			<FlatList
				data={hits}
				ItemSeparatorComponent={renderSeparator}
				keyboardShouldPersistTaps="always"
				keyExtractor={({ lat, lon }): string => `${lat}:${lon}`}
				ListEmptyComponent={renderEmptyList(
					GeoapifyError,
					hits,
					loading,
					search,
					isGps
				)}
				renderItem={renderItem}
				style={styles.list}
			/>
		</View>
	);
}
