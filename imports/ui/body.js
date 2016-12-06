import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js'; // Tasks is the Mongo.Collection!

import './body.html';


// when the template is made this code runs!
Template.body.onCreated(function bodyOnCreated(){
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});


Template.body.helpers({
  tasks(){
    const instance = Template.instance(); //?? What does Template.instance() get? this??
    if (instance.state.get('hideCompleted')){
      return Tasks.find({completed: {$ne: true}}, {sort: {createdAt: -1} });
    }

    // otherwise return all
    return Tasks.find({}, { sort: {createdAt: -1} });
  },
  incompleteCount(){
    return Tasks.find({completed: false}).count();
  },
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
    // Tasks.insert({
    //   text,
    //   createdAt: new Date(),
    //   completed: false,
    //   owner: Meteor.userId(),
    //   username: Meteor.user().username,
    // });
    Meteor.call('tasks.insert', text);
    //clear form
    target.text.value = " ";
  },

  'change .hide-completed-tasks'(event, instance){
    instance.state.set('hideCompleted', event.target.checked);
  },

});