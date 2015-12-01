Letters = new Mongo.Collection("letters");
Relationships = new Mongo.Collection("relationships");

if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  })
  Meteor.subscribe("letters");
  Meteor.subscribe("userData");
  Meteor.subscribe("relationships");
}

if (Meteor.isServer) {
  Meteor.publish("letters", function() {
    var username = Meteor.users.findOne({_id: this.userId}).username;
    return Letters.find({
      $or :
      [
        { $and:
          [ { toUser: username },
            { 'deliverAt._d': {$lt: moment()._d} }
          ]
        },
        { owner: this.userId }
      ]
    });
  });
  Meteor.publish("userData", function () {
    return Meteor.users.find({},{fields: {'username': 1}});
  });
  Meteor.publish("relationships", function(){
    return Relationships.find();
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
      deliverAt: moment().add(3, 'hours'),
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
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var currentUserId = Meteor.userId();
    Relationships.insert({
      owner: currentUserId,
      saveContact: saveContactId,
      createdAt: new Date()
    });
  },
  removeContact(currentUserId, followedUserId){
    Relationships.remove({$and : [{owner : currentUserId}, {saveContact : followedUserId}] });
  },
});
