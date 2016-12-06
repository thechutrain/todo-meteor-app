import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// creates a MongoDB collection called 'tasks' on server side
// 'Tasks' is the cached connection to the server collection 
export const Tasks = new Mongo.Collection('tasks'); 

//publish the data if you are the server
if (Meteor.isServer){
  // only runs on the server
  Meteor.publish('tasks', function tasksPublications(){
    return Tasks.find({
      $or: [
      { private: {$ne: true} },
      { owner: this.userId },
      ],
    });
  });
}


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
      private: false,
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },

  'tasks.remove'(taskId){
    check(taskId, String); // checks if string
    // check that user is the owner
    const task = Tasks.findOne(taskId);
    if (this.userId !== task.owner){
      throw new Meteor.Error('You are not authorized to delete this task');
    }

    Tasks.remove(taskId); // removes the task associted with that taskId
  }, 

  'tasks.setCompleted'(taskId, setCompleted){
    check(taskId, String);
    check(setCompleted, Boolean);
    // Only allow the user to check off the task
    const task = Tasks.findOne(taskId);
    if (task.owner !== this.userId){
      throw new Meteor.Error('You are not authorized to check off this task');
    }
    // update task's completed status
    Tasks.update(taskId, {$set: {completed: setCompleted} } );
  },

  'tasks.setPrivate'(taskId, setToPrivate){
    check(taskId, String);
    check(setToPrivate, Boolean);

    const task = Tasks.findOne(taskId);

    // make sure only owner can change privacy setting
    if (task.owner !== this.userId){
      throw new Meteor.Error('not-authorized to change private setting');
    }

    Tasks.update(taskId, {$set: {private: setToPrivate} });
  },


});









