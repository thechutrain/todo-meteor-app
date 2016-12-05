import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';

import './tasks.html';
// import './displayTask.html';

Template.task.events({
  'click .toggle-completed'(){
    Tasks.update(this._id, {
      $set: { completed: !this.completed },
    });
  },

  'click .delete-task'(){
    Tasks.remove(this._id);
  },
});
