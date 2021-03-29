import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { colors } from '../styles';
import { NavBar, DogCard } from '../components';
import { findBreed } from '../services/breedServices';
import { DogeFace } from '../assets/images';

const { width, height } = Dimensions.get('screen');

export const DogShelterList = ({ navigation, route }) => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [dogs, setDogs] = useState([]);

	const { container, cardsContainer, logo, textContainer, text, center } = styles;

	useEffect(() => {
		findBreed(route.params.breed, route.params.location)
			.then(result => {
				setDogs(result);
				setDataLoaded(true);
			})
			.catch(e => console.error(e));
	}, []);

	const noDogsFound = () => {
		return (
			<View style = { textContainer }>
				<DogeFace style = { logo } />
				<Text style = { text }>
					Couldn't find any { route.params.breed }s in your area :(
				</Text>
			</View>
		);
	};

	if (!dataLoaded) {
		return (
			<View style = { [ container, center ] }>
				<ActivityIndicator
					color = { colors.primaryDark }
					size = { 80 }
				/>
			</View>
		);
	}
	else {
		return (
			<SafeAreaView style = { container }>
				<NavBar navigation = { navigation } screenName = 'Dogs Near Me' />
				<ScrollView contentContainerStyle = { cardsContainer }>

					{ (!dogs.error)
						? dogs.map(props => <DogCard { ...props } />)
						: noDogsFound() }
				</ScrollView>
			</SafeAreaView>
		);
	}
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: colors.offWhite
	},
	cardsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		padding: '2%',
		flexWrap: 'wrap'
	},
	logo: {
		width: '100%',
		height: height / 3.2
	},
	textContainer: {
		width: width * 0.8,
		height: height / 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 22,
		textAlign: 'center',
		color: 'black',

		// svg error maybe? contains blankspace below Doge
		marginTop: '-15%'
	},
	center: {
		alignItems: 'center',
		justifyContent: 'center'
	}
};