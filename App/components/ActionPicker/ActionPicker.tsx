import {
	ActionSheetOptions,
	useActionSheet,
} from '@expo/react-native-action-sheet';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface ActionPickerProps {
	actionSheetOptions: ActionSheetOptions;
	callback: (i: number | undefined) => void;
	children: (open: () => void) => React.ReactElement;
}

export function ActionPicker(props: ActionPickerProps): React.ReactElement {
	const { actionSheetOptions, callback, children, ...rest } = props;
	const { showActionSheetWithOptions } = useActionSheet();

	function handleActionSheet(): void {
		showActionSheetWithOptions(actionSheetOptions, callback);
	}

	return (
		<TouchableOpacity onPress={handleActionSheet} {...rest}>
			{children(handleActionSheet)}
		</TouchableOpacity>
	);
}
