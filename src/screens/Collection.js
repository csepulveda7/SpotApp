import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Image, Dimensions, ActivityIndicator, Alert, PanResponder } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { styles, colors } from '../styles';
import { NavBar } from '../components';
import { getBreeds, getBreedInfo, getBreedName, getBreedPhoto } from '../services/breedServices';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../ducks';
import { CapturedIcon, bredFor, breedGroup, height, lifeSpan, temperament, weight } from '../assets/images/';
import GetLocation from 'react-native-get-location';

const { width } = Dimensions.get('screen');

export const Collection = ({ navigation }) => {
	const {
		container,
		bottomContainer,
		topContainer,
		divider,
		contentStyle,
		breedItem,
		breedItemContainer,
		breedItemText,
		capturedBox,
		captureIconStyle,
		breedName,
		center,
		numberText
	} = collectionStyles;

	let [breedsLoaded, setBreedsLoaded] = useState(false);
	let [showTopModal, setShowTopModal] = useState(false);
	let [info, setInfo] = useState({});
	let [breedImage, setBreedImage] = useState('');
	const [entries, setEntries] = useState([]);
	const { activeUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const information = [
		{ prefix: 'Bred For: ', 	key: info.bredFor,			icon: bredFor },
		{ prefix: 'Breed Group: ', 	key: info.breedGroup,		icon: breedGroup },
		{ prefix: 'Height: ', 		key: info.height + ' in', 	icon: height },
		{ prefix: 'Life Span: ', 	key: info.lifeSpan,			icon: lifeSpan },
		{ prefix: 'Temperament: ', 	key: info.temperament,		icon: temperament },
		{ prefix: 'Weight: ', 		key: info.weight + ' lbs',	icon: weight }
	];

	const unknownDogs = [
		{ url: 'https://i.ibb.co/M16vd5X/unknown1.png' },
		{ url: 'https://i.ibb.co/hY2PGMj/unknown2.png' },
		{ url: 'https://i.ibb.co/FBbXWw4/unknown3.png' },
		{ url: 'https://i.ibb.co/NscdN4n/unknown4.png' },
		{ url: 'https://i.ibb.co/K5HqGPC/unknown5.png' }
	];

	const randomUnknown = () => unknownDogs[Math.floor(unknownDogs.length * Math.random())];

	useEffect(async () => {
		dispatch(loadUser());
		setEntries(await getBreeds());

		// load first dog if user has scanned it
		if (userHasBreed('Affenpinscher')) {
			setBreedImage(await loadPhoto(1));
			setInfo(await loadInfo(1));
		}
		else {
			setInfo(await loadName(1));
			setBreedImage(randomUnknown());
		}

		setBreedsLoaded(true);
	}, []);

	const loadInfo = async (id) => await getBreedInfo(id);
	const loadName = async (name) => await getBreedName(name);
	const loadPhoto = async (id) => await getBreedPhoto(id);

	const userHasBreed = breed => (activeUser.CollectedBreeds[breed] !== undefined);

	const renderTopModal = () => {
		return (
			<Modal
				visible = { showTopModal }
				transparent = { true }
				animationType = { 'slide' }
			>
				<Pressable
					style = { modalStyles.background }
					onPress = { () => setShowTopModal(false) }
				/>
				<View style = { modalStyles.bottom }>
					<View style = { modalStyles.container }>
						<Text style = { modalStyles.heading } > { info.breed } </Text>
						<ScrollView style = { modalStyles.scrollView }>
							{ information.map(information =>
								<View style = { modalStyles.infoContainer }>
									<Image style = { modalStyles.infoIcon } source = { information.icon } />
									<View style = { modalStyles.infoTextContainer }>
										<Text style = { modalStyles.textPrefix } >{ information.prefix }</Text>
										<Text style = { modalStyles.textInfo } >{ information.key }</Text>
									</View>
								</View>
							) }
						</ScrollView>
						<View style = { modalStyles.buttonsContainer }>
							<Button
								title = 'Back to Collection'
								containerStyle = { modalStyles.buttonContainer }
								buttonStyle = { styles.fullWidthHeight }
								onPress = { () => {
									setShowTopModal(false);
								} }
							/>
							<Button
								title = 'Find Nearby Dogs'
								containerStyle = { modalStyles.buttonContainer }
								buttonStyle = { styles.fullWidthHeight }
								onPress = { () => {
									setShowTopModal(false);
									GetLocation.getCurrentPosition({
										enableHighAccuracy: true,
										timeout: 15000
									})
										.then(location => {
											const coordinates = `${location.latitude},${location.longitude}`;

											navigation.navigate('DogShelterList', { breed: info.breed, location: coordinates });
										})
										.catch(error => {
											const { code, message } = error;

											Alert.alert(`Error ${code}`, message);
											console.warn(code, message);
										});
								} }
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	const swipedLeft = ({ dx }) => (dx < -50 ? true : false);
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderEnd: (e, gestureState) => {
			if (swipedLeft(gestureState)) {
			// navigate
				console.log('pan responder end', gestureState);
				navigation.goBack();
			}

			return true;
		}
	});

	// this is going to be where loading animation goes
	if (!breedsLoaded) {
		return (
			<View style = { container } { ...panResponder.panHandlers }>
				<ActivityIndicator
					color = { colors.primaryDark }
					size = { 60 }
				/>
			</View>
		);
	}
	else {
		return (
			<View style = { container } { ...panResponder.panHandlers }>
				<NavBar navigation = { navigation } screenName = 'Dogopedia' />
				<Pressable
					style = { topContainer }
					{ ...panResponder.panHandlers }
					onPress = { () => {
						// If the field bredFor exists, the user has the dog scanned
						if (info.breedGroup !== undefined)
							setShowTopModal(true);
					} }
				>
					{ renderTopModal() }
					<Image
						style = { modalStyles.breedImage }
						source = {{ uri: breedImage.url }}
					/>
				</Pressable>
				<View style = { divider }>
					<Text style = { breedName }>{ info.breed }</Text>
				</View>
				<ScrollView style = { bottomContainer }>
					{
						entries.map((dog, i) => (
							<Pressable { ...panResponder.panHandlers } key = { i }>
								<ListItem
									style = { breedItem }
									containerStyle = { breedItemContainer }
									onPress = { async () => {
										try {
											if (userHasBreed(dog.breed)) {
												setBreedImage(await loadPhoto(dog.id));
												setInfo(await loadInfo(dog.id));
											}
											else {
												setInfo(await loadName(dog.id));
												setBreedImage(randomUnknown());
											}
										}
										catch (e) {
											console.log(e);
										}
									} }
								>
									<View style = { capturedBox }>
										{ userHasBreed(dog.breed)
											?
											<View style = { center }>
												<CapturedIcon style = { captureIconStyle } />
												<Text style = { numberText }>
													{ (activeUser.CollectedBreeds[dog.breed] > 9) ? '9+' : activeUser.CollectedBreeds[dog.breed] }
												</Text>
											</View>
											: <></>
										}
									</View>
									<ListItem.Content style = { contentStyle }>
										<ListItem.Title style = { breedItemText }>{ dog.breed }</ListItem.Title>
									</ListItem.Content>
								</ListItem>
							</Pressable>
						))
					}
				</ScrollView>
			</View>
		);
	}
};

const modalStyles = {
	background: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		height: '100%',
		width: '100%'
	},
	container: {
		height: '90%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		overflow: 'hidden',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: colors.offWhite
	},
	bottom: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		flex: 1
	},
	scrollView: {
		width: '100%',
		flex: 1
	},
	breedImage: {
		width: '100%',
		height: '100%'
	},
	infoContainer: {
		width: '90%',
		flexGrow: 1,
		marginVertical: '1%',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 10,
		backgroundColor: colors.primaryDark
	},
	infoTextContainer: {
		flex: 1,
		paddingVertical: '3%'
	},
	infoIcon: {
		width: width / 10,
		aspectRatio: 1,
		marginVertical: '3%',
		marginHorizontal: '3%'
	},
	heading: {
		width: '100%',
		fontSize: 32,
		fontWeight: '100',
		letterSpacing: 2,
		fontVariant: ['small-caps'],
		textAlign: 'center',
		marginBottom: '5%',
		paddingTop: '15%',
		backgroundColor: colors.dark,
		color: colors.primaryLight,
		borderBottomWidth: 6,
		borderBottomColor: colors.secondaryLight
	},
	textPrefix: {
		fontSize: 20,
		textAlign: 'left',
		fontWeight: 'bold',
		color: 'black',
		fontVariant: ['small-caps']
	},
	textInfo: {
		fontSize: 18,
		textAlign: 'left',
		color: 'black'
	},
	buttonContainer: {
		width: '50%',
		height: '100%',
		marginHorizontal: '2%',
		zIndex: 10,

		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 50
		},
		shadowOpacity: 1,
		shadowRadius: 5,

		elevation: 10
	},
	buttonsContainer: {
		width: '90%',
		height: '8%',
		marginBottom: '10%',
		marginTop: '5%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
};

const collectionStyles = {
	container: {
		backgroundColor: colors.offWhite,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative'
	},
	topContainer: {
		zIndex: 4,
		height: '45%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		// tuck picture under navBar
		marginTop: '-6%'
	},
	bottomContainer: {
		height: '60%',
		width: '100%'
	},
	bottomContentContainer: {
		alignItems: 'center'
	},
	contentStyle: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	divider: {
		backgroundColor: colors.primaryLight,
		height: '4%',
		width: '100%',
		alignItems: 'center',
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,

		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 50
		},
		shadowOpacity: 1,
		shadowRadius: 10,

		elevation: 10
	},
	breedName: {
		fontSize: 20,
		letterSpacing: 1
	},
	breedItem: {
		width: '85%',
		height: 48,
		alignSelf: 'center',
		marginVertical: '1%',
		backgroundColor: colors.primaryLight,
		borderBottomRightRadius: 30,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,

		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 1,
		shadowRadius: 5,

		elevation: 6
	},
	breedItemContainer: {
		width: '100%',
		height: 48,
		backgroundColor: colors.primaryDark,
		padding: '0%',
		borderBottomRightRadius: 30,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,

		shadowColor: 'black',
		shadowOffset: {
			width: 15,
			height: 8
		},
		shadowOpacity: 1,
		shadowRadius: 2,

		elevation: 3
	},
	breedItemText: {
		fontSize: 18
	},
	capturedBox: {
		width: '15%',
		height: '100%',
		backgroundColor: colors.primaryLight,
		borderBottomLeftRadius: 5,
		borderTopLeftRadius: 5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	captureIconStyle: {
		height: '87%',
		aspectRatio: 1
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	numberText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.dark,
		position: 'absolute'
	}
};