import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, Platform, Pressable, Modal, KeyboardAvoidingView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { styles, colors } from '../styles';
import NavBar from '../components/NavBar';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { getBreeds } from '../services/breedServices';
import { set } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');

export const Collection = ({ navigation }) => {
	const { container, bottomContainer, topContainer, contentStyle } = collectionStyles;

	let [breedsLoaded, setBreedsLoaded] = useState(false);
	let [showTopModal, setShowTopModal] = useState(false);

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	const [entries, setEntries] = useState([]);
	const carouselRef = useRef(null);

	useEffect(() => {
		loadData();
		setBreedsLoaded(true);
	}, []);

	const loadData = async () => {
		setEntries(await getBreeds());
	};

	const renderTopModal = () => {
		return (
			<Modal
				visible = { showTopModal }
				transparent = { true }
			>
				<Pressable
					style = { modalStyles.background }
					onPress = { () => setShowTopModal(false) }
				>

				</Pressable>
				<KeyboardAvoidingView
					behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
					enabled
				>
					<View style = { modalStyles.container }>

					</View>
				</KeyboardAvoidingView>
			</Modal>
		);
	};

	const renderItem = ({ item, index }, parallaxProps) => {
		return (
			<View style = { carouselStyles.item }>
				{ /* Left for dog captured images */ }
				{ /* <ParallaxImage
					source = {{ uri: item.illustration }}
					containerStyle = { carouselStyles.imageContainer }
					style = { carouselStyles.image }
					parallaxFactor = { 0.4 }
					{ ...parallaxProps }
				/> */ }
				<Text style = { carouselStyles.title }>
					{ item.breed }_{ item.id }
				</Text>
			</View>
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
				<View style = { topContainer }>
					<Pressable style = { fullWidthHeight } onPress = { () => setShowTopModal(true) } >
						{ renderTopModal() }
						<Carousel
							ref = { carouselRef }
							sliderWidth = { screenWidth }
							sliderHeight = { 400 }
							itemWidth = { screenWidth - 100 }
							data = { entries }
							renderItem = { renderItem }
							hasParallaxImages = { true }
							enableSnap = { true }
							initialNumToRender = { entries.length }
							scrollEnabled = { false }
							firstItem = { 0 }
						/>
					</Pressable>
				</View>

				<ScrollView style = { bottomContainer }>
					{
						entries.map((dog, i) => (
							<ListItem
								key = { i } bottomDivider
								onPress = { () => carouselRef.current.snapToItem(dog.id - 1) }
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
		marginTop: '18%',
		height: '50%',
		width: '100%',
		backgroundColor: 'blue'
	},
	background: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		height: '100%',
		width: '100%'
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
		height: '35%',
		width: '100%'
	},
	bottomContainer: {
		height: '65%',
		width: '100%'
	},
	contentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between'
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