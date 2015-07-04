if (Meteor.isClient) {
  // This code only runs on the client
  Django = DDP.connect('http://'+window.location.hostname+':8000/');
  Tasks = new Mongo.Collection("django_todos.task", {"connection": Django});
  Django.subscribe('Tasks');


  Template.body.helpers({
    tasks: function () {
      if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        return Tasks.find({checked: {$ne: true}}, {sort: {created_at: -1}});
      } else {
        // Otherwise, return all of the tasks
        return Tasks.find({}, {sort: {created_at: -1}});
      }
    },
    hideCompleted: function() {
      return Session.get("hideCompleted");
    },
    incompleteCount: function() {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task is submitted
      var text = event.target.text.value;

      Tasks.insert({
        text: text
      }); // created_at set on the server

      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      // set the checked property to the opposite of its current value
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function() {
      Tasks.remove(this._id);
    }
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
