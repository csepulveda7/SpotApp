import { colors } from './colors';

export const styles = {
	container: {
		backgroundColor: colors.offWhite,
		flex: 1,
		top: 0,
		height: '100%',
		width: '100%',
		alignItems: 'center'
	},
	textBoxes: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexDirection: 'column',
		zIndex: 1,
		marginTop: '18%'
	},
	buttonContainer: {
		width: '65%',
		height: '7%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: '6%',
		position: 'relative'
	},
	errorText: {
		fontSize: 14,
		alignSelf: 'center',
		color: 'red',
		fontWeight: 'bold'
	},
	subtextButton: {
		marginTop: '6%',
		alignItems: 'center',
		color: colors.dark
	},
	fullWidthHeight: {
		width: '100%',
		height: '100%'
	},
	forgotPassword: {
		color: colors.secondaryDark,
		width: '100%',
		textAlign: 'center',
		marginRight: '30%',
		marginBottom: '15%'
	},
	forgotPasswordButton: {
		width: '30%'
	},
	rightMargin: {
		marginRight: '30%',
		justifyContent: 'flex-end',
		flexDirection: 'row',
		width: '100%'
	}
};