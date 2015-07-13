if (Meteor.isClient) {
  // This code only runs on the client
  var Django = DDP.connect('http://'+window.location.hostname+':8000/');
  
  Meteor.connection = Django;
  Accounts.connection = Django;

  // Patch methods
  var methods = ["subscribe", "call", "apply", "methods", "status", "reconnect", "disconnect", "onReconnect"];
  methods.forEach(function(method) {
    Meteor[method] = function() {
      return Django[method].apply(Django, arguments);
    };
  });
  

  Tasks = new Mongo.Collection("django_todos.task", {"connection": Django});
  Django.subscribe('Tasks');
  Meteor.users = new Meteor.Collection("users", {"connection": Django});
  Django.subscribe('meteor.loginServiceConfiguration');


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
    hideCompleted: function () {
      return Session.get("hideCompleted");
    },
    incompleteCount: function () {
      return Tasks.find({checked: {$ne: true}}).count();
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task form is submitted
      var text = event.target.text.value;

      Meteor.call("/django_todos.task/addTask", text, Meteor.userId());

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },
    "change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
  });

  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      if (this.owner == Meteor.userId()) {
        Django.call("/django_todos.task/setChecked", this._id, ! this.checked);
      } else {
        alert("Not authorized");
        event.target.checked = this.checked;
      }
    },
    "click .delete": function () {
      if (this.owner == Meteor.userId()) {
        Django.call("/django_todos.task/deleteTask", this._id);
      } else {
        alert("Not authorized");
      }
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addTask: function (text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  deleteTask: function (taskId) {
    Tasks.remove(taskId);
  },
  setChecked: function (taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked} });
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
