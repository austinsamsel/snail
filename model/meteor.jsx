Letters = new Mongo.Collection("letters");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })

  Meteor.subscribe("letters");

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render(<App />, document.getElementById("app"));
  });
}

if (Meteor.isServer) {
  Meteor.publish("letters", function() {
    return Letters.find();
  });
}

Meteor.methods({
  addLetter(toUser, letterBody) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Letters.insert({
      toUser: toUser,
      letterBody: letterBody,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  removeLetter(letterId){
    Letters.remove(letterId);
  }
});
