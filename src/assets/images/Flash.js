import * as React from 'react';
import { baseProps } from 'react-native-gesture-handler/dist/src/handlers/gestureHandlers';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const Flash = (props) => {
	return (
		<Svg
			id = 'Layer_1'
			x = '0px'
			y = '0px'
			viewBox = '0 0 204.4 241.5'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 204.4 241.5'
			{ ...props }
		>
			<Path
				id = 'Bolt'
				className = 'st0'
				d = 'M90.6 6.5h92.7c.3 0 .5.3.3.6l-62.4 107.1c-.1.3 0 .6.3.6h36.7c.3 0 .5.4.3.6L58.9 234.9c-.3.3-.8.1-.7-.3l31-119.1c.1-.2-.1-.5-.4-.5H58.3c-.3 0-.4-.2-.4-.5L90.1 6.8c.2-.2.3-.3.5-.3z'
				stroke = 'white'
				strokeWidth = '4%'
			/>
			<Path id = 'flashOff' className = 'st0' d = 'M200.2 187.7L4.1 25.6' strokeWidth = '4%' stroke = 'white' strokeOpacity = { props.isOff } />
		</Svg>
	);
};