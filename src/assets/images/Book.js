import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const Book = (props) => {
	const width = '5%';

	return (
		<Svg
			id = 'Layer_1'
			x = '0px'
			y = '0px'
			viewBox = '0 0 35.4 40.8'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 35.4 40.8'
			{ ...props }
		>
			<Path
				className = 'st0'
				d = 'M31.7 39.8H3.4c-1.3 0-2.4-1.1-2.4-2.4v-2.7c0-1.3 1.1-2.4 2.4-2.4h31V37c0 1.6-1.2 2.8-2.7 2.8z'
				stroke = 'white'
				strokeWidth = { width }
			/>
			<Path
				className = 'st0'
				d = 'M1 34.3V1.8c0-.5.3-.8.8-.8h31.8c.4 0 .8.3.8.8v32.5'
				stroke = 'white'
				strokeWidth = { width }
			/>
			<Path
				className = 'st0'
				d = 'M5.3 1L5.3 32.4'
				stroke = 'white'
				strokeWidth = { width }
			/>
			<Path
				className = 'st0'
				d = 'M11.5 11.5L19.1 11.5'
				stroke = 'white'
				strokeWidth = { width }
			/>
			<Path
				className = 'st0'
				d = 'M11.5 16.7L26.5 16.7'
				stroke = 'white'
				strokeWidth = { width }
			/>
		</Svg>
	);
};