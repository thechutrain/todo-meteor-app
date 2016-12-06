import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './tasks.html';
// import './displayTask.html';

Template.task.helpers({
  isOwner(){
    return this.owner === Meteor.userId();
  }
})

Template.task.events({
  'click .toggle-completed'(){
    // Tasks.update(this._id, {
    //   $set: { completed: !this.completed },
    // });
    Meteor.call('tasks.setCompleted', this._id, !this.completed);
  },

  'click .delete-task'(){
    // Tasks.remove(this._id);
    Meteor.call('tasks.remove', this._id);
  },

  'click .toggle-private'(){
    Meteor.call('tasks.setPrivate', this._id, !this.private)
  },

});
