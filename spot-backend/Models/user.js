/*
 * Model:
 *  - This is where you should keep your data model.
 *  - For example if you write a spreadsheet application, you would keep the data structure of your spreadsheet.
 *  - You would also have the code to save and load your spreadsheet in your model.
 *  - Think of it as in-memory representation of your currently use data
 *  - Data which is not currently in use is in DB and when you access that data, first it will come to Model,  then propagate to other parts of the application.
 *  - When you done with your data manipulation(which you do in Model) you either save it to Database for some later use.
 *  - Also, Model is the first class which gets the data filled from DB when you retrieve the data from DB.
 */

// const { db } = require('../index');

class User {
	constructor (user) {
		const { email, name, picture, score, collectedBreeds } = user;

		this.email = email;
		this.name = name;
		this.picture = picture;
		this.score = score;
		this.collectedBreeds = collectedBreeds;
	}
	toString() {
		return this.email + ', ' + this.name + ', ' + this.picture
            + ', ' + this.score + ', ' + this.collectedBreeds;
	}
}

// Firestore data converter
const userConverter = {
	toFirestore: function(user) {
		const { email, name, picture, score, collectedBreeds } = user;

		return { email, name, picture, score, collectedBreeds };
	},
	fromFirestore: function(snapshot) {
		const data = snapshot;

		return new User(data);
	}
};

module.exports.User = User;
module.exports.userConverter = userConverter;