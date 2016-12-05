import { Mongo } from 'meteor/mongo';

// creates a MongoDB collection called 'tasks' on server side
// 'Tasks' is the cached connection to the server collection 
export const Tasks = new Mongo.Collection('tasks'); 