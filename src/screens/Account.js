import React, { useState, useEffect } from 'react';
import { View, Text, Modal, KeyboardAvoidingView, Alert, Dimensions } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import NavBar from '../components/NavBar';
import ImagePicker from 'react-native-image-crop-picker';
import { styles, colors } from '../styles';
import { logoutUser, uploadImage } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { userStatus, loadUser } from '../ducks';
import { stat } from 'react-native-fs';
import { color } from 'react-native-reanimated';
import { AccessibilityInfo } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { height, width } = Dimensions.get('screen');

export const Account = ({ navigation }) => {
	const {
		container,
		topContainer,
		statsLogoutArea,
		centerItems,
		statsInfo,
		topStats,
		bottomStats,
		breedsSeen,
		perosnalInfoContainer,
		personalInfoText,
		statsContainer,
		outerBarStyle,
		innerBarStyle,
		bottomButtonStyle
	} = accountStyles;

	const {
		fullWidthHeight
	} = styles;

	const [modalVisible, setModalVisible] = useState(false);
	const [barPercent, setBarPercent] = useState(100);
	const { activeUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	const logoutSubmit = () => {
		logoutUser();
		setTimeout(() => dispatch(userStatus()), 500);
		Alert.alert('Logging off...', 'Have a nice day!');
	};

	const updateBarPercent = (numBreeds) => {
		// maxPercent comes from remainder of width from the progress bar
		const maxPercent = 96;
		const totalBreeds = 100;
		let newPercent = numBreeds * (maxPercent / totalBreeds);

		if (newPercent != barPercent) setBarPercent(newPercent);
	};

	const renderSetProfilePictureModal = () => {
		return (
			<Modal animationType = 'slide' transparent = { true } visible = { modalVisible } >
				<KeyboardAvoidingView behavior = 'height' enabled >
					<View style = { modalStyles.bottomView }>
						<View style = { modalStyles.modalView }>
							<View style = { modalStyles.topButtons }>
								<Button
									title = 'Choose from Gallery'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalVisible(!modalVisible);
										ImagePicker.openPicker({
											width: 300,
											height: 400,
											cropping: true,
											freeStyleCropEnabled: true,
											cropperCircleOverlay: true
										}).then((image) =>
											uploadImage({
												uri: image.path,
												type: 'image/jpeg',
												name: 'profileImage'
											})
										)
											.then(() => dispatch(loadUser()))
											.catch((error) => Alert.alert('Error', error));
									} }
								/>
								<Button
									title = 'Take Picture'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => {
										setModalVisible(!modalVisible);
										ImagePicker.openCamera({
											width: 300,
											height: 400,
											cropping: true,
											freeStyleCropEnabled: true,
											cropperCircleOverlay: true
										}).then((image) =>
											uploadImage({
												uri: image.path,
												type: 'image/jpeg',
												name: 'profileImage'
											})
										)
											.then(() => dispatch(loadUser()))
											.catch((error) => Alert.alert('Error', error));
									} }
								/>
							</View>
							<Button
								title = 'Cancel'
								containerStyle = { modalStyles.buttonContainer }
								buttonStyle = { modalStyles.buttonStyle }
								onPress = { () => setModalVisible(!modalVisible) }
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	};

	return (
		<View style = { [fullWidthHeight, container] }>
			{ renderSetProfilePictureModal() }
			<NavBar navigation = { navigation } screenName = 'Account' />

			<View style = { [centerItems, topContainer] }>
				<Avatar
					size = { 200 }
					rounded = { true }
					source = { activeUser.picture ? { uri: activeUser.picture } : require('../assets/default_profile_icon.png') }
				>
					<Avatar.Accessory
						size = { 50 }
						underlayColor = { colors.offWhite }
						onPress = { () => setModalVisible(true) }
					/>
				</Avatar>
				<View style = { perosnalInfoContainer }>
					<Text style = { personalInfoText }>{ activeUser.name }</Text>
					<Text style = { personalInfoText }>{ activeUser.email }</Text>
				</View>
			</View>

			<View style = { [centerItems, statsLogoutArea] }>
				<View style = { statsContainer }>
					<View style = { topStats }>
						<Text style = { statsInfo }>Score:</Text>
						<Text style = { statsInfo }>{ activeUser.score }</Text>
					</View>
					<View style = { topStats }>
						<Text style = { statsInfo }>Total Dogs Seen:</Text>
						<Text style = { statsInfo }>
							{ (activeUser.CollectedBreeds.total == undefined) ? 0 : activeUser.CollectedBreeds.total }
						</Text>
					</View>
					<View style = { breedsSeen }>
						<View style = { bottomStats }>
							<Text style = { statsInfo }>Total Breeds Seen:</Text>
							<Text style = { statsInfo }>
								{ Object.keys(activeUser.CollectedBreeds).length - 1 } / 100
							</Text>
						</View>
						<View style = { outerBarStyle }>
							{ updateBarPercent(Object.keys(activeUser.CollectedBreeds).length - 1) }
							<View style = { [innerBarStyle, { width: `${ barPercent }%` }] } />
						</View>
					</View>
				</View>

				<Button
					title = 'Log out'
					containerStyle = { modalStyles.buttonContainer }
					buttonStyle = { fullWidthHeight }
					onPress = { logoutSubmit }
				/>
			</View>
		</View>

	);
};

const accountStyles = {
	container: {
		backgroundColor: colors.primaryDark,
		flexDirection: 'column',
		justifyContent: 'space-between',
		flex: 1,
		zIndex: 1
	},
	topContainer: {
		width: '100%',
		height: '45%'
	},
	statsLogoutArea: {
		height: '42%',
		width: '100%',
		backgroundColor: colors.offWhite,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	statsContainer: {
		width: '84%',
		height: '45%'
	},
	topStats: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bottomStats: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '5%'
	},
	breedsSeen: {
		width: '100%',
		height: '100%'
	},
	statsInfo: {
		fontSize: 18
	},
	bottomButtonStyle: {
		height: '20%',
		marginTop: '2%'
	},
	perosnalInfoContainer: {
		width: '100%',
		height: '30%',
		justifyContent: 'space-around',
		marginTop: '3%'
	},
	personalInfoText: {
		fontSize: 22,
		alignSelf: 'center',
		color: 'rgb(64, 64, 64)'
	},
	outerBarStyle: {
		width: '100%',
		height: '25%',
		justifyContent: 'center',
		borderRadius: 11,
		marginTop: '2%',
		backgroundColor: colors.dark
	},
	innerBarStyle: {
		height: '55%',
		borderRadius: 6,
		marginLeft: '2%',
		backgroundColor: colors.primaryLight
	}
};

const modalStyles = {
	bottomView: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	modalView: {
		width: '100%',
		height: '45%',
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'column',
		backgroundColor: colors.offWhite,
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32
	},
	promptText: {
		paddingBottom: '3%',
		marginTop: '8%',
		marginHorizontal: '16%',
		textAlign: 'center',
		fontSize: 22,
		borderBottomWidth: 1,
		borderBottomColor: colors.dark
	},
	topButtons: {
		width: '100%',
		height: '50%',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: '2%'
	},
	buttonContainer: {
		width: width * 0.65,
		height: height * 0.085,
		justifyContent: 'center'
	},
	buttonStyle: {
		backgroundColor: colors.primaryDark,
		height: '100%',
		borderRadius: 0
	}
};