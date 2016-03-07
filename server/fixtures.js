// Fixture data
if (Letters.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var apptesterId = Meteor.users.insert({
    username: "apptester"
  });
  var apptester = Meteor.users.findOne(apptesterId);
  var explorerId = Meteor.users.insert({
    username: "explorer"
  });
  var explorer = Meteor.users.findOne(explorerId);

  var snailId = Letters.insert({
    letterBody: "message number three",
    readCount: 0,
    toUser: "apptester",
    username: "explorer",
    createdAt: new Date(now - 7 * 3600 * 1000)
  });

  Letters.insert({
    letterBody: "message number two",
    readCount: 0,
    toUser: "explorer",
    username: "apptester",
    createdAt: new Date(now - 10 * 3600 * 1000)
  });

  Letters.insert({
    letterBody: "message number one",
    readCount: 1,
    toUser: "explorer",
    username: "apptester",
    createdAt: new Date(now - 12 * 3600 * 1000)
  });
}
