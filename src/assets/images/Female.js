import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const Female = (props) => {
	const strokeThick = '12%';
	const color = '#e863eb';

	return (
		<Svg
			id = 'Layer_1'
			x = '0px'
			y = '0px'
			viewBox = '0 0 367.9 598.8'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 367.9 598.8'
			{ ...props }
		>
			<Circle className = 'st0' cx = { 184 } cy = { 184 } r = { 161.5 }
				stroke = { color }
				strokeWidth = { strokeThick } />
			<Path className = 'st0' d = 'M184 345.4L184 598.8'
				stroke = { color }
				strokeWidth = { strokeThick } />
			<Path className = 'st0' d = 'M47.4 478.6L319.9 478.6'
				stroke = { color }
				strokeWidth = { strokeThick } />
		</Svg>
	);
};