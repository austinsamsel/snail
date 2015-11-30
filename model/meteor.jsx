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
    // letters where toUser == currentUserId
    var username = Meteor.users.findOne({_id: this.userId}).username;
    return Letters.find({$or : [{toUser: username}, {owner: this.userId}]});
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

  deleteReceivedLetter(letterId){
    Letters.update(letterId, {$set: {hideReceived: true}});
  },
  deleteSentLetter(letterId){
    Letters.update(letterId, {$set: {hideSent: true}});
  },

  saveContact(saveContactId){
    //var currentUserId = Meteor.userId();
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var currentUserId = Meteor.userId();
    Relationships.insert({
      owner: currentUserId,
      saveContact: saveContactId,
      followed: true,
      createdAt: new Date()
    });
  },
  removeContact(currentUserId, saveContactId){
    Relationships.update(userId, { $set: {} });
  },


});
