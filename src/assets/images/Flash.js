import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const Flash = (props) => {
	return (
		<Svg
			id = 'Layer_1'
			x = '0px'
			y = '0px'
			viewBox = '0 0 1000 1000'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 1000 1000'
			{ ...props }
		>
			<Path
				id = 'Bolt'
				className = 'st0'
				d = 'M468.8 366.9h92.7c.3 0 .5.3.3.6l-62.4 107.1c-.1.3 0 .6.3.6h36.7c.3 0 .5.4.3.6l-99.6 119.5c-.3.3-.8.1-.7-.3l31-119.1c.1-.2-.1-.5-.4-.5h-30.5c-.3 0-.4-.2-.4-.5l32.2-107.7c.2-.2.3-.3.5-.3z'
			/>
			<Path id = 'flashOff' className = 'st0' d = 'M578.4 548.1L382.3 386' />
		</Svg>
	);
};