/*
 *  Services:
 *  - receives the request data it needs from the manager in order to perform its tasks
 *  - figures out the individual details algorithms/business logic/database calls/etc involved in completing the request
 *  - is generally only concerned with the tasks it has to complete
 *  - not responsible for making decisions about the "bigger" picture orchestrating the different service calls
 *  - does the actual work necessary to complete the tasks/request
 *  - returns the completed work a response to the controller
 */

import firebase from 'firebase';