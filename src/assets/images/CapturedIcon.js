import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

export const CapturedIcon = (props) => {
	let width = 45;
	let limit = 15;

	return (
		<Svg
			id = 'svg'
			x = '0px'
			y = '0px'
			viewBox = '0 0 371 359'
			xmlSpace = 'preserve'
			enableBackground = 'new 0 0 371 359'
			{ ...props }
		>
			<Path
				id = 'BL'
				className = 'st0'
				d = 'M39 320L114 320 114 334 25 334 25 320 25 245 39 245z'
				fill = '#404040'
				stroke = '#404040'
				strokeWidth = { width }
				strokeMiterlimit = { limit }
			/>
			<Path
				id = 'BR'
				className = 'st0'
				d = 'M332 320L257 320 257 334 346 334 346 320 346 245 332 245z'
				fill = '#404040'
				stroke = '#404040'
				strokeWidth = { width }
				strokeMiterlimit = { limit }
			/>
			<Path
				id = 'TR'
				className = 'st0'
				d = 'M332 39L257 39 257 25 346 25 346 39 346 114 332 114z'
				fill = '#404040'
				stroke = '#404040'
				strokeWidth = { width }
				strokeMiterlimit = { limit }
			/>
			<Path
				id = 'TL_1_'
				className = 'st0'
				d = 'M39 39L114 39 114 25 25 25 25 39 25 114 39 114z'
				fill = '#404040'
				stroke = '#404040'
				strokeWidth = { width }
				strokeMiterlimit = { limit }
			/>
		</Svg>
	);
}