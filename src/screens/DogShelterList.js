import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, Pressable, Modal, Image } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { colors } from '../styles';
import { NavBar, DogCard } from '../components';
import { findBreed } from '../services/breedServices';

export const DogShelterList = ({ navigation, route }) => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [dogs, setDogs] = useState([]);
	const { container, cardsContainer } = styles;

	useEffect(() => {
		findBreed(route.params.breed, '32826')
			.then(result => {
				setDogs(result);
				setDataLoaded(true);
			})
			.catch(e => console.error(e));
	}, []);

	if (!dataLoaded) {
		return <></>;
	}
	else {
		return (
			<SafeAreaView style = { container }>
				<NavBar navigation = { navigation } screenName = 'Dogs Near Me' />
				<ScrollView contentContainerStyle = { cardsContainer }>
					{ dogs.map(props => <DogCard { ...props } />) }
				</ScrollView>
			</SafeAreaView>
		);
	}
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: colors.primaryLight
	},
	cardsContainer: {
		backgroundColor: colors.primaryLight,
		flexDirection: 'row',
		justifyContent: 'center',
		padding: '2%',
		flexWrap: 'wrap'
	},
	text: {
		fontSize: 45
	}
};