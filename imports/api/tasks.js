import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// creates a MongoDB collection called 'tasks' on server side
// 'Tasks' is the cached connection to the server collection 
export const Tasks = new Mongo.Collection('tasks'); 


// write methods to give client-side permission to update DB
Meteor.methods({
  'tasks.insert'(taskText){
    check(taskText, String); // checks if string

    // check that the user is signed in
    if (!this.userId){
      throw new Meteor.Error('not-authorized');
    }
    // insert task into Tasks db
    Tasks.insert({
      taskText,
      createdAt: new Date(),
      completed: false,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'tasks.remove'(taskId){
    check(taskId, String); // checks if string
    Tasks.remove(taskId); // removes the task associted with that taskId
  }, 

  'tasks.setCompleted'(taskId, setCompleted){
    check(taskId, String);
    check(setCompleted, Boolean);
    // update task's completed status
    Tasks.update(taskId, {$set: {completed: setCompleted} } );
  },


});









