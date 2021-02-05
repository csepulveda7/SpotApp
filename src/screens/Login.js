/* eslint-disable no-mixed-spaces-and-tabs */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import config from '../config';

class Login extends Component {
  state = { users: [] }

  componentDidMount() {
  	fetch(`${config.API_ADDR}/users`)
  		.then(res => res.json())
  		.then(users => this.setState({ users }));
  }

  render() {
  	const { container, userText } = styles;

  	return (
  		<View style = { container }>
  			<Text style = { userText }>Users</Text>
  			{ this.state.users.map(user =>
  				<Text key = { user.id }>{ user.username }</Text>
  			) }
  		</View>
  	);
  }
}

const styles = {
	container: {
		backgroundColor: 'pink',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	userText: {
		fontSize: 30
	}
};

export default Login;