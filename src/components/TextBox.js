import React from 'react';
import { View } from 'react-native';
import { Input } from 'react-native-elements';
import { colors } from '../styles';

export const TextBox = ({ onChange, defaultValue, labelText, secureInput, value }) => {
	const { container, textField, bottomBorderLine } = styles;

	return (
		<View style = { container }>
			<Input
				style = { textField }
				onChangeText = { onChange }
				inputStyle = { bottomBorderLine }
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
	},
	bottomBorderLine: {
		borderBottomWidth: 2,
		borderBottomColor: colors.secondaryDark
	}
};