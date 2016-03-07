describe("Layout Component", function () {
  var renderComponentWithProps, elem;

  beforeEach(function () {
    renderComponentWithProps = function (component, props, renderType) {
      if (renderType === "shallow") {
        elem = createComponent(component, props);
      } else if (renderType == "normal") {
        elem = renderComponent(component, props);
      }
    }
  });

  it("should not show navigation links to anonymous user", function () {
    // render the component
    renderComponentWithProps(Layout, {}, "normal");
    // find the navigation links
    var navigationLinks = TestUtils.scryRenderedDOMComponentsWithClass(elem, "navigation");
    // get the length
    var actual = navigationLinks.length;
    // expect the number of them to be 0
    var expected = 0;
    expect(actual).toBe(expected);
  });

  it("should be able to login", function (done) {
    // login the user
    Meteor.loginWithPassword("tester", "password", function (err) {
      // expect no errors
      expect(err).toBeUndefined();
      done();
    });
  });

  it("should show navigation to logged in user", function () {
    // render the component
    renderComponentWithProps(Layout, {}, "normal");
    // search for navigation links
    var navigationLinks = TestUtils.scryRenderedDOMComponentsWithClass(elem, "navigation");
    // get the number of navigation items
    var actual = navigationLinks.length;
    // we expect there should be one
    var expected = 1;
    expect(actual).toBe(expected);
  });

  it("should be able to logout", function (done) {
    // log out
    Meteor.logout(function (err) {
      expect(err).toBeUndefined();
      done();
    });
  });

  it("should be throw error if username is wrong", function (done) {
    // try the wrong username
    Meteor.loginWithPassword("WrongUser", "passpass", function (err) {
      // expect errors
      expect(err).toBeDefined();
      done();
    })
  });

  it("should throw error if credentials are wrong", function (done) {
    // try to login with the wrong password
    Meteor.loginWithPassword("tester", "WrongPass", function (err) {
      // expect errors
      expect(err).toBeDefined();
      done();
    })
  })
});
