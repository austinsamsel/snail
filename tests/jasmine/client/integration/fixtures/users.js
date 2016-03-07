// We add a new user
Meteor.startup(function() {
  if (Meteor.users.find().count() == 0) {
    var users = [
      {username:"tester" , password: "password"},
      {username:"tester2", password: "password"}
    ];
    _.each(users, function (user) {
      var id = Accounts.createUser({
        username: user.username,
        password: user.password
      });
    });
  };
});
