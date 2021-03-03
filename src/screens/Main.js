import React, { useState } from 'react';
import { View, Pressable, Platform, Modal, KeyboardAvoidingView, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Svg, { Circle } from 'react-native-svg';
import { Book, Flash, FlipCamera } from '../assets/images';
import { styles, colors } from '../styles';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';

// I'm very aware this code needs to be cleaned ~Jordan
export const Main = ({ navigation, initialProps }) => {
	const [pictureTakenModalVisible, setPictureTakenModalVisible ] = useState(false);
	const [capturedImage, setCapturedImage] = useState(' ');
	const [capturedImageWidth, setCapturedImageWidth] = useState(0);
	const [capturedImageHeight, setCapturedImageHeight] = useState(0);

	const capturedImageScale = 0.25;

	// this will be used for recognizing if the dog breed is found by the ML model
	// both true and false work
	const dogBreedFound = true;
	const dogBreedName = 'Breed Name';

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
	} = mainStyles;

	const [
		{ cameraRef, type, ratio, autoFocus, autoFocusPoint, flash },
		{ toggleFacing, setFlash, takePicture }
	] = useCamera(initialProps);

	const showCapturedPicture = () => {
		return (
			<Image
				source = {{ uri: capturedImage }}
				style = {{
					height: capturedImageHeight * capturedImageScale,
					width: capturedImageWidth * capturedImageScale
				}}
			/>
		);
	};

	const breedRecognizedContentModal = () => {
		return (
			<View style = { modalStyles.contentContainer }>
				<Text style = { modalStyles.headerText }>Dog Breed Spotted!</Text>
				<View style = { modalStyles.infoContainer }>
					{ showCapturedPicture() }
					<Text style = { modalStyles.photoText } > { dogBreedName } </Text>
				</View>
				<View style = { modalStyles.modalButtons }>
					<Button
						title = 'Add to Collection'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => setPictureTakenModalVisible(false) }
					/>
					<Button
						title = 'Retake Photo'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => setPictureTakenModalVisible(false) }
					/>
				</View>
			</View>
		);
	};

	const breedNotRecognizedContentModal = () => {
		return (
			<View style = { modalStyles.contentContainer }>
				<Text style = { modalStyles.headerText }> Couldn't Recognize the Breed...</Text>
				<View style = { modalStyles.infoContainer }>
					{ showCapturedPicture() }
					<Text style = { modalStyles.photoText }> Why don't you try Spotting this dog again? </Text>
				</View>
				<View style = { modalStyles.modalButtons }>
					<Button
						title = 'Retake Photo'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => setPictureTakenModalVisible(false) }
					/>
				</View>
			</View>
		);
	};

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
			<Modal
				animationType = 'slide'
				transparent = { true }
				visible = { pictureTakenModalVisible }
			>
				<KeyboardAvoidingView
					behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
					enabled
				>
					<View style = { modalStyles.centeredBottom }>
						<Image
							source = {{ uri: capturedImage }}
							style = { modalStyles.imageStyle }
						/>
						<View style = { modalStyles.modalView }>
							{ (dogBreedFound) ? breedRecognizedContentModal() : breedNotRecognizedContentModal() }
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
			<RNCamera
				ref = { cameraRef }
				autoFocusPointOfInterest = { autoFocusPoint.normalized }
				type = { type }
				ratio = { ratio }
				autoFocus = { autoFocus }
				style = { cameraContainer }
			>
				<View style = { iconContainer }>
					<Pressable
						style = { verticalIconContainer }
						onPress = { () => toggleFacing() }
					>
						<FlipCamera style = { icon } />
					</Pressable>
					<Pressable
						style = { verticalIconContainer }
						onPress = { () => {
							switch (flash) {
								case 'on':
									setFlash('off');
									break;
								case 'off':
									setFlash('on');
									break;
								default:
									setFlash('off');
									break;
							}
						} }
					>
						<Flash
							style = { icon }
							isOff = { (flash === 'off') ? '100' : '0' }
						/>
					</Pressable>
				</View>
				<View style = { buttons }>
					<Pressable style = { smallButtonContainer } onPress = { () => navigation.navigate('Collection') }>
						{ iconBackground() }
						<Book style = { icon } />
					</Pressable>

					<Pressable
						style = { largeButtonContainer }
						onPress = { async () => {
							try {
								const data = await takePicture();

								setCapturedImage(data.uri);
								setCapturedImageWidth(data.width);
								setCapturedImageHeight(data.height);
								setPictureTakenModalVisible(true);
							}
							catch (error) {
								console.warn(error);
							}
						} }
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

const modalStyles = {
	contentContainer: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'column'
	},
	centeredBottom: {
		height: '100%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end'
	},
	modalView: {
		backgroundColor: colors.offWhite,
		height: '80%',
		width: '100%',
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		zIndex: 1
	},
	headerText: {
		fontSize: 24,
		padding: '4%',
		borderBottomColor: colors.dark,
		borderBottomWidth: 1
	},
	photoText: {
		marginTop: '6%',
		fontSize: 18
	},
	infoContainer: {
		height: '50%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '5%'
	},
	imageStyle: {
		height: '100%',
		position: 'absolute',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 0
	},
	buttonHeight: {
		height: '55%',
		width: '40%'
	},
	modalButtons: {
		height: '15%',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: '5%'
	}
};

const mainStyles = {
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
		marginBottom: '8%',
		flex: 1
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