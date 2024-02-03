import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';

import smokeVideo from '../../../../assets/video/smoke_bg_fafafc.mp4';
import { AVPlaybackSource } from 'expo-av/build/AV';

interface SmokeVideoProps {
	cigarettes: number;
}

const styles = StyleSheet.create({
	container: {
		bottom: 0,
		height: Dimensions.get('screen').height,
		position: 'absolute',
		right: 0,
		width: Dimensions.get('screen').width,
	},
	overlay: {
		flex: 1,
	},
	video: {
		bottom: 0,
		height: Dimensions.get('screen').height,
		position: 'absolute',
		right: 0,
		width: Dimensions.get('screen').width,
		zIndex: -1,
	},
});

function getVideoStyle(cigarettes: number): ViewStyle {
	if (cigarettes <= 1) return { backgroundColor: '#FFFFFFCC' };
	if (cigarettes < 5) return { backgroundColor: '#FFFFFFAA' };
	if (cigarettes < 15) return { backgroundColor: '#FFFFFF22' };
	return { backgroundColor: '#FFFFFF00' };
}

export function SmokeVideo({
	cigarettes,
}: SmokeVideoProps): React.ReactElement {
	return (
		<View style={styles.container}>
			<View style={[styles.overlay, getVideoStyle(cigarettes)]} />
			<Video
				isLooping
				resizeMode={'cover' as ResizeMode}
				shouldPlay
				source={smokeVideo as AVPlaybackSource}
				style={styles.video}
			/>
		</View>
	);
}
