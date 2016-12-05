import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js'; // Tasks is the Mongo.Collection!

import './body.html';

Template.body.helpers({
  tasks(){
    return Tasks.find({});
  }
});