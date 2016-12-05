import { Meteor } from 'meteor/meteor';

// create the MongoDB collections - 'tasks'
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});
