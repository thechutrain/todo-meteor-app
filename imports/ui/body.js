import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js'; // Tasks is the Mongo.Collection!

import './body.html';

Template.body.helpers({
  tasks(){
    return Tasks.find({}, { sort: {createdAt: -1} });
  }
});

Template.body.events({
  'submit .new-task'(event){
  //^ looks like a CSS selector but a string!
    // prevent the default refresh
    event.preventDefault();

    // get values from the form
    // console.log(event) // pretty big event!
    const target = event.target;
    const text = target.text.value;

    // insert the task into a collection
    Tasks.insert({
      text,
      createdAt: new Date(),
    });

    //clear form
    target.text.value = " ";
  },

});