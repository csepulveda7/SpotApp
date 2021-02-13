import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get('screen');

const TextBox = ({ defaultValue, labelText, secureInput }) => {
	const [input, setInput] = useState('');

	const { container, textField } = styles;

	const handleInput = (e) => setInput(e.target.value);

	return (
		<View style = { container }>
			<Input
				style = { textField }
				input = { handleInput }
				inputStyle = {{ borderBottomWidth: 2, borderBottomColor: '#BC6F27' }}
				label = { labelText }
				labelStyle = {{ color: '#BC6F27' }}
				placeholder = { defaultValue }
				secureTextEntry = { secureInput }
				fontSize = { 14 }
				labelStyle = {{ fontSize: 14, color: '#BC6F27' }}
				containerStyle = {{ height: '20%' }}
			/>
		</View>
	);
};

const styles = {
	container: {
		width: '75%',
		margin: '2%'
	},
	textField: {
		height: 40
	}
};

export default TextBox;