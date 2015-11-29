Letters = new Mongo.Collection("letters");
Relationships = new Mongo.Collection("relationships");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })

  Meteor.subscribe("letters");
  Meteor.subscribe("userData");

}

if (Meteor.isServer) {
  Meteor.publish("letters", function() {
    return Letters.find();
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find({},{fields: {'username': 1}});
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
