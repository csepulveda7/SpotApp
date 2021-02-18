import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';


const TextBox = ({ onChange, defaultValue, labelText, secureInput, value }) => {
	const { container, textField } = styles;

	return (
		<View style = { container }>
			<Input
				style = { textField }
				onChangeText = { onChange }
				inputStyle = {{ borderBottomWidth: 2, borderBottomColor: '#BC6F27' }}
				label = { labelText }
				labelStyle = {{ color: '#BC6F27' }}
				placeholder = { defaultValue }
				secureTextEntry = { secureInput }
				fontSize = { 14 }
				value = { value }
			/>
		</View>
	);
};

const styles = {
	container: {
		width: '75%'
	},
	textField: {
		height: 40
	}
};

export default TextBox;