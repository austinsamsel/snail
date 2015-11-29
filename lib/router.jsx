FlowRouter.route('/', {
  action: function() {
    ReactLayout.render(Layout, {
      content: <App />
    });
  }
});

FlowRouter.route('/users', {
  action: function() {
    ReactLayout.render(Layout, {
      content: <FindUsers />
    });
  }
});

FlowRouter.route('/post/:slug', {
  action: function(params) {
    ReactLayout.render(Layout, {
      content: <Post slug={params.slug} />
    });
  }
});
