import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { styles } from '../styles';
import { colors } from '../styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Pressable } from 'react-native';
import { logoutUser } from '../services/userServices';
import { useDispatch } from 'react-redux';
import { userStatus } from '../ducks';
import { Alert } from 'react-native';
import NavBar from '../components/NavBar';

export const Account = ({ navigation }) => {
	const { container, infoBar, centerItems, infoText, logoutContainer } = accountStyles;

	const {
		fullWidthHeight
	} = styles;

	const dispatch = useDispatch();
	const logoutSubmit = () => {
		logoutUser();
		setTimeout(() => dispatch(userStatus()), 500);
		Alert.alert('Logging off...', 'Have a nice day!');
	};

	return (
		<View style = { [fullWidthHeight, container] }>
			<NavBar navigation = { navigation } screenName = 'Account' />

			<Svg
				width = '100%'
				height = '35%'
			>
				<Circle
					cx = '50%'
					cy = '50%'
					r = '32%'
					stroke = 'rgb(255, 255, 255)'
					strokeWidth = '1%'
				/>
			</Svg>
			<View style = { [centerItems, infoBar] }>
				<Text style = { infoText }>Username: </Text>
				<Text style = { infoText }>Email: </Text>
				<Text style = { infoText }>Total Dogs Seen: </Text>
				<Text style = { infoText }>Total Breeds Seen: </Text>
				<Pressable style = { logoutContainer } onPress = { logoutSubmit }>
					<FontAwesomeIcon
						icon = { faSignOutAlt }
						size = '100%'
						color = { colors.dark }
					/>
				</Pressable>
			</View>
		</View>
	);
};

const accountStyles = {
	container: {
		backgroundColor: '#E2B865',
		flexDirection: 'column',
		flex: 1,
		zIndex: 1
	},
	infoBar: {
		backgroundColor: '#E5E5E5',
		height: '55%',
		width: '100%',
		zIndex: 5,
		justifyContent: 'space-around',
		alignItems: 'center',
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12
	},
	centerItems: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	infoText: {
		fontSize: 16,
		alignSelf: 'flex-start',
		marginLeft: '10%'
	},
	logoutContainer: {
		height: '12%',
		width: '12%',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
		marginRight: '10%',
		marginBottom: '5%'
	}
};