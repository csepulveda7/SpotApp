import React, { useState, useEffect } from 'react';
import { View, Animated, StatusBar, Dimensions } from 'react-native';
import { SpotAppLogo } from '../assets/images';
import { colors } from '../styles';

const { height, width } = Dimensions.get('screen');

export const Splash = ({ route, navigation }) => {
	const { nextScreen } = route.params;
	const [logo] = useState(new Animated.Value(0));
	const animationStyle = { translateY: logo.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) };
	const { container, logoStyle } = styles;

	useEffect(() => {
		Animated.spring(logo, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true
		}).start(() => { setTimeout(() => navigation.navigate(nextScreen), 1500) });
	});

	return (
		<View style = { container }>
			<StatusBar translucent backgroundColor = 'transparent' />
			<View>
				<Animated.View style = { animationStyle }>
					<SpotAppLogo style = { logoStyle } />
				</Animated.View>
			</View>
		</View>
	);
};

const styles = {
	container: {
		flex: 1,
		backgroundColor: colors.primaryLight,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoStyle: {
		height: height * 0.35,
		width: width * 0.55
	}
};