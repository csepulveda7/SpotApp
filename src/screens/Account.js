import React, { useState, useEffect } from 'react';
import { View, Text, Modal, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import NavBar from '../components/NavBar';
import ImagePicker from 'react-native-image-crop-picker';
import { styles, colors } from '../styles';
import { logoutUser, uploadImage } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { userStatus, loadUser } from '../ducks';
import { stat } from 'react-native-fs';

export const Account = ({ navigation }) => {
	const {
		container,
		topContainer,
		statsLogoutArea,
		centerItems,
		midStatsInfo,
		statsInfo,
		breedsSeen,
		perosnalInfoContainer,
		personalInfoText,
		statsContainer,
		outerBarStyle,
		innerBarStyle,
		bottomButtonStyle
	} = accountStyles;

	const {
		buttonContainer,
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
					<View style = { modalStyles.centeredView }>
						<View style = { modalStyles.ModalView }>
							<Text style = { modalStyles.promptText }>
								Set Profile Picture
							</Text>
							<View style = { modalStyles.buttonView }>
								{ /*
									TODO:
									- Remove 'No Picture' button
									- Remove label for modal
									- Fix Button styling to reflect figma
									- Fix modal style to reflect figma
								*/ }
								<Button
									title = 'No Picture'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => setModalVisible(!modalVisible) }
								/>
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
									title = 'Use Camera'
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
							<View style = { modalStyles.buttonView }>
								<Button
									title = 'Cancel'
									containerStyle = { modalStyles.buttonContainer }
									buttonStyle = { modalStyles.buttonStyle }
									onPress = { () => setModalVisible(!modalVisible) }
								/>
							</View>
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
						// TODO:
						// - Change to color pallete colors
						// - Change size to fit in position
						size = { 20 }
						underlayColor = '#8C9095'
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
					{ /*
						TODO:
						- Fix horizontal space between labeling and value (see collections list formatting)
					*/ }
					<Text style = { statsInfo }>Score: { activeUser.score }</Text>
					<Text style = { statsInfo }>Total Dogs Seen: { activeUser.CollectedBreeds }</Text>
					<View style = { breedsSeen }>
						<Text style = { [ statsInfo, midStatsInfo] }>
							Total Breeds Seen: { activeUser.CollectedBreeds } / 100
						</Text>
						<View style = { outerBarStyle }>
							{ updateBarPercent(75) }
							<View style = { [innerBarStyle, { width: `${ barPercent }%` }] } />
						</View>
					</View>
				</View>

				<Button
					title = 'Log out'
					containerStyle = { [buttonContainer, bottomButtonStyle] }
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
		height: '35%'
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
	breedsSeen: {
		width: '100%',
		height: '100%'
	},
	statsInfo: {
		fontSize: 18
	},
	midStatsInfo: {
		marginTop: '5%'
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
	centeredView: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.4)'
	},
	ModalView: {
		width: '90%',
		height: 250,
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: colors.offWhite,
		borderRadius: 10
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
	buttonView: {
		width: '100%',
		height: '25%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	buttonContainer: {
		width: '30%',
		height: '65%',
		justifyContent: 'center'
	},
	buttonStyle: {
		backgroundColor: colors.primaryDark
	}
};