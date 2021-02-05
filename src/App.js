import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [],
			isLoading: true
		};
	}

	componentDidMount() {
		fetch('/users')
			.then((response) => response.json())
			.then((users) => {
				this.setState({ users });
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({ isLoading: false });
			});
	}

	render() {
		const { data, isLoading } = this.state;

		return (
			<View style = {{ flex: 1, padding: 24 }}>
				{ isLoading ? <ActivityIndicator /> : (
					<FlatList
						data = { data }
						keyExtractor = { ({ id }) => id }
						renderItem = { ({ user }) => (
							<Text>{ user.username }</Text>
						) }
					/>
				) }
			</View>
		);
	}
}