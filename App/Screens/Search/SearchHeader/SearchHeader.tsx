import searchIcon from '@shootismoke/ui/assets/images/search.png';
import React from 'react';
import { Image, ImageRequireSource, StyleSheet, TextInput } from 'react-native';

import { Banner } from '../../../components';
import { t } from '../../../localization';
import * as theme from '../../../util/theme';

interface SearchHeaderProps {
	onChangeSearch?: (text: string) => void;
	search: string;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.orange,
	},
	content: {
		...theme.withPadding,
		alignItems: 'center',
		flexDirection: 'row',
		height: 48,
	},
	input: {
		...theme.text,
		color: 'white',
		flexGrow: 1,
		fontSize: 13,
	},
});

export function SearchHeader(props: SearchHeaderProps): React.ReactElement {
	const { onChangeSearch, search } = props;

	return (
		<Banner elevated shadowPosition="bottom">
			<TextInput
				autoFocus
				onChangeText={onChangeSearch}
				placeholder={t('search_header_input_placeholder')}
				placeholderTextColor="rgba(255, 255, 255, 0.6)"
				style={styles.input}
				underlineColorAndroid="transparent"
				value={search}
			/>
			<Image source={searchIcon as ImageRequireSource} />
		</Banner>
	);
}
