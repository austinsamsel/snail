FlowRouter.route('/', {
  name: "home",
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

// helpers
let currentRoute = ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

FlowHelpers = {
  currentRoute: currentRoute
};
