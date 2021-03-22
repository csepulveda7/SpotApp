import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Image } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { colors } from '../styles';
import NavBar from '../components/NavBar';
import { getBreeds, getBreedInfo, getBreedName, getBreedPhoto, findBreed } from '../services/breedServices';
import { CapturedIcon } from '../assets/images/';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../ducks';

// @cris: look at line 101 for where to put if dog is captured
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
		captureIconStyle
	} = collectionStyles;

	let [breedsLoaded, setBreedsLoaded] = useState(false);
	let [showTopModal, setShowTopModal] = useState(false);
	let [info, setInfo] = useState({});
	let [breedImage, setBreedImage] = useState('');
	const { activeUser } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const [entries, setEntries] = useState([]);

	useEffect(async () => {
		dispatch(loadUser());
		setEntries(await getBreeds());

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
				animationType = { 'fade' }
			>
				<Pressable
					style = { modalStyles.background }
					onPress = { () => setShowTopModal(false) }
				/>
				<View style = { modalStyles.container }>
					<Text style = { modalStyles.heading } > { info.breed } </Text>
					<Text style = { modalStyles.paragraph } > Bred For: { info.bredFor } </Text>
					<Text style = { modalStyles.paragraph } > Breed Group: { info.breedGroup } </Text>
					<Text style = { modalStyles.paragraph } > Height: { info.height } in</Text>
					<Text style = { modalStyles.paragraph } > Life Span: { info.lifeSpan } </Text>
					<Text style = { modalStyles.paragraph } > Temperament: { info.temperament } </Text>
					<Text style = { modalStyles.paragraph } > Weight: { info.weight } lbs </Text>
					<Button
						title = 'Find Near Me'
						containerStyle = { modalStyles.buttonContainer }
						buttonStyle = {{ width: '100%', height: '100%' }}
						onPress = { () => findBreed(info.breed, '32826')
							.then(result => console.log(result))
							.catch(e => console.error(e)) }
					/>
				</View>
			</Modal>
		);
	};

	// this is going to be where loading animation goes
	if (!breedsLoaded) {
		return <View />;
	}
	else {
		return (
			<View style = { container }>
				<NavBar navigation = { navigation } screenName = 'Collections' />
				<Pressable
					style = { topContainer }
					onPress = { () => {
						// If the field bredFor exists, the user has the dog scanned
						if (info.bredFor !== undefined)
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
					<Text style = { modalStyles.paragraph }>{ info.breed }</Text>
				</View>
				<ScrollView style = { bottomContainer }>
					{
						entries.map((dog, i) => (
							<ListItem
								key = { i }
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
											setBreedImage({ url: 'https://i.ibb.co/F3r2QZF/unknown-Dog.png' });
										}
									}
									catch (e) {
										console.log(e);
									}
								} }
							>
								<View style = { capturedBox }>
									{ userHasBreed(dog.breed) ? <CapturedIcon style = { captureIconStyle } /> : <></> }
								</View>
								<ListItem.Content style = { contentStyle }>
									<ListItem.Title style = { breedItemText }>{ dog.breed }</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						))
					}
				</ScrollView>
			</View>
		);
	}
};

const modalStyles = {
	container: {
		marginTop: '17%',
		height: '41%',
		width: '100%',
		backgroundColor: colors.primaryLight
	},
	background: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		height: '100%',
		width: '100%'
	},
	breedImage: {
		width: '100%',
		height: '100%'
	},
	heading: {
		fontSize: 24,
		textAlign: 'center'
	},
	paragraph: {
		fontSize: 20,
		textAlign: 'left'
	},
	buttonContainer: {
		width: '65%',
		height: '15%',
		alignSelf: 'center',
		marginTop: 10
	}
};

const collectionStyles = {
	container: {
		backgroundColor: colors.dark,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-start',
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
		backgroundColor: colors.offWhite,
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
			width: 15,
			height: 8
		},
		shadowOpacity: 1,
		shadowRadius: 10,

		elevation: 16
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
		shadowRadius: 10,

		elevation: 16
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
		height: '60%',
		aspectRatio: 1
	}
};