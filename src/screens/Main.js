import React, { useState } from 'react';
import { View, Pressable, Modal, KeyboardAvoidingView, Text, Image, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Svg, { Circle } from 'react-native-svg';
import { Book, Flash, FlipCamera } from '../assets/images';
import { styles, colors } from '../styles';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import * as jpeg from 'jpeg-js';

import { classifyBreed } from '../services/breedServices';

const { height, width } = Dimensions.get('screen');

export const Main = ({ navigation, initialProps }) => {
	const [modalVisible, setModalVisible ] = useState(false);
	const [capturedImage, setCapturedImage] = useState('');
	const [breedFound, setBreedFound] = useState(true);
	const [breedName, setBreedName] = useState('Golden Retriever');

	const capturedImageScale = 0.5;

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
			<Image source = {{ uri: capturedImage }}
				style = {{ height: height * capturedImageScale, width: width * capturedImageScale }}
			/>
		);
	};
	/*
	const imageToBuffer = async (base64) => {
		const jpegData = Buffer.from(base64, 'base64');
		const rawImageData = jpeg.decode(jpegData);

		classifyBreed(rawImageData.data);
	};
	*/
	const classificationModal = () => {
		return (
			<View style = { modalStyles.contentContainer }>
				{ breedFound ? <Text style = { modalStyles.headerText }> { breedName } Spotted!</Text>
					: <Text style = { modalStyles.headerText }> Couldn't Recognize the Breed...</Text> }
				<View style = { modalStyles.infoContainer }>
					{ showCapturedPicture() }
				</View>
				<View style = { modalStyles.modalButtons }>
					{ breedFound ? <Button
						title = 'Add to Collection'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => {
							setModalVisible(false);
							setBreedName('');
						} }
					/> : false }
					<Button
						title = 'Retake Photo'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => {
							setModalVisible(false);
							setBreedName('');
						} }
					/>
				</View>
			</View>
		);
	};
	const iconBackground = () => {
		return (
			<Svg style = { fixedSquare } width = '100%' height = '100%'>
				<Circle cx = '50%' cy = '50%' r = '50%' fill = 'rgba(0, 0, 0, 0.5)' />
			</Svg>
		);
	};

	return (
		<View style = { container }>
			<Modal animationType = 'slide' transparent = { true } visible = { modalVisible } >
				<KeyboardAvoidingView behavior = 'height' enabled>
					<View style = { modalStyles.centeredBottom }>
						<Image source = {{ uri: capturedImage }} style = { modalStyles.imageStyle } />
						<View style = { modalStyles.modalView }>
							{ classificationModal() }
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
					<Pressable style = { verticalIconContainer } onPress = { () => toggleFacing() }>
						<FlipCamera style = { icon } />
					</Pressable>
					<Pressable style = { verticalIconContainer } onPress = { () => {
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
					} }>
						<Flash style = { icon } isOff = { (flash === 'off') ? '100' : '0' } />
					</Pressable>
				</View>
				<View style = { buttons }>
					<Pressable style = { smallButtonContainer } onPress = { () => navigation.navigate('Collection') }>
						{ iconBackground() }
						<Book style = { icon } />
					</Pressable>

					<Pressable style = { largeButtonContainer } onPress = { async () => {
						try {
							const options = { base64: true };
							const data = await takePicture(options);

							setCapturedImage(data.uri);
							classifyBreed({
								uri: data.uri,
								type: 'image/jpeg',
								name: 'breedImage'
							})
								.then(breed => {
									setBreedFound(true);
									setBreedName(breed);
									setModalVisible(true);
								})
								.catch(() => {
									setBreedName('');
									setModalVisible(true);
								});
						}
						catch (error) { console.warn(error) }
					} }>
						<Svg style = { centerItems } width = '100%' height = '100%'>
							<Circle cx = '50%' cy = '50%' r = '40%' stroke = 'rgb(255, 255, 255)' strokeWidth = '4%' />
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