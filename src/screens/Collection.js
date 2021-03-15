import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions, Platform, Pressable, Modal, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { styles, colors } from '../styles';
import NavBar from '../components/NavBar';
// import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { getBreeds, getBreedInfo, getBreedPhoto } from '../services/breedServices';
import { set } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

export const Collection = ({ navigation }) => {
	const { container, bottomContainer, topContainer, contentStyle, divider } = collectionStyles;

	let [breedsLoaded, setBreedsLoaded] = useState(false);
	let [showTopModal, setShowTopModal] = useState(false);
	let [info, setInfo] = useState({});
	let [breedImage, setBreedImage] = useState('');

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	const [entries, setEntries] = useState([]);

	useEffect(async () => {
		setEntries(await getBreeds());
		setInfo(await loadInfo(1));
		setBreedImage(await loadPhoto(1));

		setBreedsLoaded(true);
	}, []);

	const loadInfo = async (id) => await getBreedInfo(id);
	const loadPhoto = async (id) => await getBreedPhoto(id);

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
				<View style = { divider } />
				<Pressable style = { topContainer } onPress = { () => setShowTopModal(true) } >
					{ renderTopModal() }
					<Image
						style = { modalStyles.breedImage }
						source = {{ uri: breedImage.url }}
					/>
				</Pressable>
				<View style = { divider } />

				<ScrollView style = { bottomContainer }>
					{
						entries.map((dog, i) => (
							<ListItem
								key = { i } bottomDivider
								onPress = { async () => {
									try {
										setBreedImage(await loadPhoto(dog.id));
										setInfo(await loadInfo(dog.id));
									}
									catch (e) {
										console.log(e);
									}
								} }
							>
								<ListItem.Content style = { contentStyle }>
									<ListItem.Title>{ dog.breed }</ListItem.Title>
									<ListItem.Subtitle>{ dog.id }</ListItem.Subtitle>
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
	}
};

const collectionStyles = {
	container: {
		backgroundColor: colors.white,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative'
	},
	topContainer: {
		zIndex: 100,
		height: '40%',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	bottomContainer: {
		height: '65%',
		width: '100%'
	},
	contentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	divider: {
		backgroundColor: colors.dark,
		height: 2,
		width: '100%'
	}
};

const carouselStyles = {
	container: {
		flex: 1
	},
	item: {
		backgroundColor: 'red',
		width: '100%',
		height: '75%',
		alignItems: 'center'
	},
	imageContainer: {
		flex: 1,
		marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
		backgroundColor: 'red',
		borderRadius: 8
	},
	image: {
		height: '100%',
		width: '100%',
		resizeMode: 'cover'
	},
	title: {
		fontSize: 28
	}
};