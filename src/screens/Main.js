import React, { useState, useEffect } from 'react';
import { View, Pressable, Modal, ActivityIndicator, KeyboardAvoidingView, Text, Image, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Svg, { Circle } from 'react-native-svg';
import { Book, Flash, FlipCamera } from '../assets/images';
import { styles, colors } from '../styles';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../ducks';
import { classifyBreed } from '../services/breedServices';
import { updateCollectedBreeds } from '../services/userServices';

const { height, width } = Dimensions.get('screen');

export const Main = ({ navigation, initialProps }) => {
	const [modalVisible, setModalVisible ] = useState(false);
	const [capturedImage, setCapturedImage] = useState('');
	const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
	const [isReady, setIsReady] = useState(false);
	const [buttonSize, setButtonSize] = useState(35);
	const [breedFound, setBreedFound] = useState(true);
	const [breedName, setBreedName] = useState('');
	const { activeUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const capturedImageScale = 0.45;

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
		verticalIconContainer,
		pfpIcon
	} = mainStyles;

	const [
		{ cameraRef, type, ratio, autoFocus, autoFocusPoint },
		{ toggleFacing, takePicture }
	] = useCamera(initialProps);

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const showCapturedPicture = () => {
		return (
			<Image source = {{ uri: capturedImage }}
				style = {{ height: height * capturedImageScale, width: width * capturedImageScale }}
			/>
		);
	};

	const classificationModal = () => {
		return (
			<View style = { modalStyles.contentContainer }>
				<View style = { modalStyles.photoTextContainer }>
					{ breedFound ? <Text style = { modalStyles.headerText }> { breedName } Spotted!</Text>
						: <Text style = { modalStyles.headerText }> Couldn't Recognize the Breed...</Text> }
				</View>
				<View style = { modalStyles.dividerLine } />
				<View style = { modalStyles.infoContainer } >
					{ showCapturedPicture() }
				</View>
				<View style = { modalStyles.modalButtons }>
					{ breedFound ? <Button
						title = 'Add to Collection'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => {
							updateCollectedBreeds(breedName)
								.then(() => Alert.alert(`${breedName} added to collection!`))
								.catch(() => Alert.alert('Error', `Unable to add ${breedName} to collection. Try again`));
							setModalVisible(false);
							setBreedName('');
							setIsReady(false);
						} }
					/> : false }
					<Button
						title = 'Retake Photo'
						containerStyle = { [styles.buttonContainer, modalStyles.buttonHeight] }
						buttonStyle = { styles.fullWidthHeight }
						onPress = { () => {
							setModalVisible(false);
							setBreedName('');
							setIsReady(false);
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
						<View style = { [modalStyles.modalView, { height: (isReady ? 80 : 30) + '%' }] }>
							{ isReady ? classificationModal()
								: <ActivityIndicator color = { colors.primaryDark } size = { 60 } /> }
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
				playSoundOnCapture = { true }
				flashMode = { flash }
			>
				<View style = { iconContainer }>
					<Pressable style = { verticalIconContainer } onPress = { () => toggleFacing() }>
						<FlipCamera style = { icon } />
					</Pressable>
					<Pressable style = { verticalIconContainer } onPress = { () => {
						switch (flash) {
							case RNCamera.Constants.FlashMode.on:
								setFlash(RNCamera.Constants.FlashMode.off);
								break;
							case RNCamera.Constants.FlashMode.off:
								setFlash(RNCamera.Constants.FlashMode.on);
								break;
							default:
								setFlash(RNCamera.Constants.FlashMode.on);
								break;
						}
					} }>
						<Flash style = { icon } isOff = { (flash === RNCamera.Constants.FlashMode.off) ? '100' : '0' } />
					</Pressable>
				</View>
				<View style = { buttons }>
					<Pressable style = { smallButtonContainer } onPress = { () => navigation.navigate('Collection') }>
						{ iconBackground() }
						<Book style = { icon } />
					</Pressable>

					<Pressable style = { largeButtonContainer }
						onPress = { async () => {
							try {
								const options = { base64: true };
								const data = await takePicture(options);

								setCapturedImage(data.uri);
								setModalVisible(true);
								classifyBreed({ uri: data.uri, type: 'image/jpeg', name: 'breedImage' })
									.then(breed => {
										if (!breed) {
											setBreedFound(false);
											setIsReady(true);
										}
										else {
											setBreedFound(true);
											setBreedName(breed);
											setIsReady(true);
										}
									})
									.catch(() => {
										setBreedName('');
									});
							}
							catch (error) { console.warn(error) }
						} }
						onPressIn = { () => setButtonSize(40) }
						onPressOut = { () => setButtonSize(35) }
					>
						<Svg style = { centerItems } width = '100%' height = '100%'>
							<Circle cx = '50%' cy = '50%' r = { buttonSize + '%' } stroke = 'rgb(255, 255, 255)' strokeWidth = '4%' />
						</Svg>
					</Pressable>
					<Pressable style = { smallButtonContainer } onPress = { () => navigation.navigate('Account') }>
						{ iconBackground() }
						<Image source = { activeUser.picture ? { uri: activeUser.picture } : require('../assets/default_profile_icon.png') } style = { pfpIcon } />
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
		zIndex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	photoTextContainer: {
		width: '100%',
		height: '17%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerText: {
		fontSize: 24,
		padding: '4%',
		textAlign: 'center'
	},
	dividerLine: {
		width: '80%',
		height: '.5%',
		marginTop: '-10%',
		borderBottomColor: colors.dark,
		borderBottomWidth: 1
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
	pfpIcon: {
		height: '90%',
		aspectRatio: 1,
		borderRadius: 100
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