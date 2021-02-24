import React from 'react';
import { View, Pressable } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Book, Flash, FlipCamera } from '../assets/images';
import { Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

export const Main = ({ navigation }) => {
	const {
		container,
		buttons,
		smallButtonContainer,
		largeButtonContainer,
		icon,
		fixedSquare,
		centerItems,
		cameraContainer,
		iconContainer,
		verticalIconContainer
	} = styles;

	const iconBackground = () => {
		return (
			<Svg
				style = { fixedSquare }
				width = '100%'
				height = '100%'
			>
				<Circle
					cx = '50%'
					cy = '50%'
					r = '50%'
					fill = 'rgba(0, 0, 0, 0.5)'
				/>
			</Svg>
		);
	};

	return (
		<View style = { container }>
			<RNCamera
				style = { cameraContainer }
			>
				<View style = { iconContainer }>
					<Pressable style = { verticalIconContainer }>
						<FlipCamera style = { icon } />
					</Pressable>
					<Pressable style = { verticalIconContainer }>
						<Flash style = { icon } />
					</Pressable>
				</View>
				<View style = { buttons }>
					<Pressable style = { smallButtonContainer } onPress = { () => navigation.navigate('Collection') }>
						{ iconBackground() }
						<Book style = { icon } />
					</Pressable>
					<Pressable
						style = { largeButtonContainer }
						onPress = { () => Alert.alert('photo taken!') }
					>
						<Svg
							style = { centerItems }
							width = '100%'
							height = '100%'
						>
							<Circle
								cx = '50%'
								cy = '50%'
								r = '40%'
								stroke = 'rgb(255, 255, 255)'
								strokeWidth = '4%'
							/>
						</Svg>
					</Pressable>
					<Pressable style = { smallButtonContainer } onPress = { () => navigation.navigate('Account') }>
						{ iconBackground() }
					</Pressable>
				</View>
			</RNCamera>
		</View>
	);
};

export const styles = {
	container: {
		backgroundColor: 'grey',
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
		flex: 1
	},
	buttons: {
		height: '18%',
		width: '100%',
		alignItems: 'flex-end',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: '8%'
	},
	largeButtonContainer: {
		height: '100%',
		aspectRatio: 1
	},
	smallButtonContainer: {
		height: '30%',
		width: '15%',
		alignItems: 'center',
		justifyContent: 'center',
		aspectRatio: 1
	},
	icon: {
		width: '65%',
		aspectRatio: 1
	},
	centerItems: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	cameraContainer: {
		height: '100%', width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
		flex: 1
	},
	iconContainer: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 40,
		width: '13%',
		height: '20%',
		marginLeft: '80%',
		marginBottom: '100%',
		alignItems: 'center'
	},
	fixedSquare: {
		aspectRatio: 1,
		position: 'absolute'
	},
	verticalIconContainer: {
		width: '100%',
		padding: '3%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	}
};