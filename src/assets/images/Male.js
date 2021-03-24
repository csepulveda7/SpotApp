import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const Male = (props) => {
	const strokeThick = '12%';
	const color = '#3b85ff';

	return (
		<Svg
			id = 'Layer_1'
			x = '0px'
			y = '0px'
			viewBox = '0 0 423.4 424.7'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 423.4 424.7'
			stroke = { color }
			strokeWidth = { strokeThick }
			{ ...props }
		>
			<Circle className = 'st0' cx = { 164.1 } cy = { 260.6 } r = { 141.6 }
				stroke = { color }
				strokeWidth = { strokeThick } />
			<Path className = 'st0' d = 'M262.7 159.1L397.9 22.5'
				stroke = { color }
				strokeWidth = { strokeThick } />
			<Path className = 'st0' d = 'M262.7 22.5L400.9 22.5 400.9 151.9'
				stroke = { color }
				strokeWidth = { strokeThick } />
		</Svg>
	);
};