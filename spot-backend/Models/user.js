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

const { db } = require('../index');

const userDocRef = db.collection('users');


//In this scenario user is the primary key used to retrieve the user information.
//This function returns an object which contains a reference to a single user.
export const getUserModel = (user) =>{
    
    const userRef = userDocRef.doc(user);
    const model = await userRef.get();
    if(model.exists) return userRef;
    
}


//Overwrites the user with user_name with its new data: userData
export const setUserModel = (userData) =>{
    await userDocRef.doc(userData.username).set({
        username: userData.username, email: userData.email, score: userData.score,
        collectedBreeds: userData.collectedBreeds
    });
}