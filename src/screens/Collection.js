import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, Platform } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { styles, colors } from '../styles';
import NavBar from '../components/NavBar';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const list = [
	{ title: 'Bebo', subtitle: '0', id: 0 },
	{ title: 'Bebo', subtitle: '1', id: 1 },
	{ title: 'Bebo', subtitle: '2', id: 2 },
	{ title: 'Bebo', subtitle: '3', id: 3 },
	{ title: 'Bebo', subtitle: '4', id: 4 },
	{ title: 'Bebo', subtitle: '5', id: 5 },
	{ title: 'Bebo', subtitle: '6', id: 6 },
	{ title: 'Bebo', subtitle: '7', id: 7 },
	{ title: 'Bebo', subtitle: '8', id: 8 },
	{ title: 'Bebo', subtitle: '9', id: 9 },
	{ title: 'Bebo', subtitle: '10', id: 10 },
	{ title: 'Bebo', subtitle: '11', id: 11 },
	{ title: 'Bebo', subtitle: '12', id: 12 },
	{ title: 'Bebo', subtitle: '13', id: 13 },
	{ title: 'Bebo', subtitle: '14', id: 14 },
	{ title: 'Bebo', subtitle: '15', id: 15 },
	{ title: 'Bebo', subtitle: '16', id: 16 },
	{ title: 'Bebo', subtitle: '17', id: 17 },
	{ title: 'Bebo', subtitle: '18', id: 18 },
	{ title: 'Bebo', subtitle: '19', id: 19 },
	{ title: 'Bebo', subtitle: '20', id: 20 },
	{ title: 'Bebo', subtitle: '21', id: 21 },
	{ title: 'Bebo', subtitle: '22', id: 22 },
	{ title: 'Bebo', subtitle: '23', id: 23 },
	{ title: 'Bebo', subtitle: '24', id: 24 },
	{ title: 'Bebo', subtitle: '25', id: 25 },
	{ title: 'Bebo', subtitle: '26', id: 26 },
	{ title: 'Bebo', subtitle: '27', id: 27 },
	{ title: 'Bebo', subtitle: '28', id: 28 },
	{ title: 'Bebo', subtitle: '29', id: 29 },
	{ title: 'Bebo', subtitle: '30', id: 30 }
];

export const Collection = ({ navigation }) => {
	const { container, bottomContainer, topContainer, contentStyle } = accountStyles;

	const {
		buttonContainer,
		fullWidthHeight
	} = styles;

	const [entries, setEntries] = useState([]);
	const carouselRef = useRef(null);

	useEffect(() => {
		setEntries(list);
		carouselRef.current.snapToItem(30);
	}, []);

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
				<Text style = { carouselStyles.title } numberOfLines = { 2 }>
					{ item.title }
					_
					{ item.subtitle }
				</Text>
			</View>
		);
	};

	return (
		<View style = { container }>
			<NavBar navigation = { navigation } screenName = 'Collections' />
			<View style = { topContainer }>
				<Carousel
					ref = { carouselRef }
					sliderWidth = { screenWidth }
					sliderHeight = { 400 }
					itemWidth = { screenWidth - 100 }
					data = { entries }
					renderItem = { renderItem }
					hasParallaxImages = { true }
					enableSnap = { true }
					initialNumToRender = { 31 }
					scrollEnabled = { false }
					firstItem = { 0 }
				/>
			</View>

			<ScrollView style = { bottomContainer }>
				{
					list.map((item, i) => (
						<ListItem
							key = { i } bottomDivider
							onPress = { () => carouselRef.current.snapToItem(item.id) }
						>
							<ListItem.Content style = { contentStyle }>
								<ListItem.Title>{ item.title }</ListItem.Title>
								<ListItem.Subtitle>{ item.subtitle }</ListItem.Subtitle>
							</ListItem.Content>
						</ListItem>
					))
				}
			</ScrollView>

		</View>
	);
};

const accountStyles = {
	container: {
		backgroundColor: colors.white,
		height: '100%',
		width: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative'
	},
	topContainer: {
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
		backgroundColor: '#40E0D0',
		width: '100%',
		height: '75%',
		alignItems: 'center'
	},
	imageContainer: {
		flex: 1,
		marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
		backgroundColor: 'white',
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