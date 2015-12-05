FlowRouter.route('/', {
  subscriptions: function() {
    //this.register('letters', Letters.find({}, {sort: {createdAt: -1}}));
  },
  action() {
    ReactLayout.render(Layout, {
      content: <LettersList />
    });
  }
});

FlowRouter.route('/users', {
  name: "contacts",
  action() {
    ReactLayout.render(Layout, {
      content: <FindContacts />
    });
  }
});

FlowRouter.route('/test', {
  name: "test",
  action() {
    ReactLayout.render(TodoList, {
      content: <FindContacts />
    });
  }
});
