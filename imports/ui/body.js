import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
  tasks: [
    { text: 'This is task1'},
    { text: 'This is task2'},
    { text: 'This is task3'},
  ],
});