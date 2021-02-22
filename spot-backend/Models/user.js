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