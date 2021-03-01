import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const FlipCamera = (props) => {
	return (
		<Svg
			id = 'Layer_1'
			x = '0px'
			y = '0px'
			viewBox = '0 0 375.6 241.6'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 375.6 241.6'
			{ ...props }
		>
			<Path
				className = 'st0'
				d = 'M230.4 25.5h55.2c3.9 0 7.1 3.2 7.1 7.1v108.7c0 3.9-3.2 7.1-7.1 7.1H107.4c-3.9 0-7.1-3.2-7.1-7.1V32.6c0-3.9 3.2-7.1 7.1-7.1H162c3 0 5.7-1.9 6.7-4.8l3.1-9.4c1-2.9 3.7-4.8 6.7-4.8h36c3.2 0 6 2.2 6.8 5.3l2.2 8.5c.9 3.1 3.7 5.2 6.9 5.2z'
				stroke = 'white'
				strokeWidth = '4%'
			/>
			<Ellipse
				transform = 'rotate(-85.269 196.46 86.9)'
				className = 'st0'
				cx = { 196.5 }
				cy = { 86.9 }
				rx = { 40 }
				ry = { 40 }
				stroke = 'white'
				strokeWidth = '4%'
			/>
			<Path
				className = 'st0'
				d = 'M156.5 236.2l37.4-25.4c1.2-.8.6-2.6-.8-2.6-61 1.9-286.3-27.7-135.5-71.2M243.5 205.6c52.4.3 192.2-29 88.1-66.4'
				stroke = 'white'
				strokeWidth = '4%'
			/>
		</Svg>
	);
};