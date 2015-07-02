if (Meteor.isClient) {
  // This code only runs on the client
  Django = DDP.connect('http://'+window.location.hostname+':8000/');
  Tasks = new Mongo.Collection("django_todos.task", {"connection": Django});
  Django.subscribe('Tasks');
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {created_at: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function (event) {
      // This function is called when the new task is submitted
      var text = event.target.text.value;

      Tasks.insert({
        text: text
      }, function(error, _id) {
        console.log('_id: ' + _id);
      });

      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  Template.task.events({
    "click .toggle-checked": function() {
      // set the checked property to the opposite of its current value
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
      console.log('updated');
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
