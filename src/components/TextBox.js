import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

const { height, width } = Dimensions.get("screen");

const TextBox = ({ defaultValue, labelText, icon, secureInput }) => {
	const [input, setInput] = useState('');
  
	const { container, textField } = styles;

	return (
		<View style = { container }>
			<Input 
				style = { input }
				label = { labelText }
				placeholder = { defaultValue }
				secureTextEntry = { secureInput }
				leftIcon = { icon }
			/>
		</View>
	);
};

const styles = {
	container: {
		backgroundColor: '#E5E5E5',
		width: '75%',
		margin: '4%'
	},
	input: { 
		height: 40, 
		borderColor: 'gray', 
		borderWidth: 0 
	}
};

export default TextBox;