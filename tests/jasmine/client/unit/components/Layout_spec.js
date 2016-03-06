/*global About, renderComponent */

// note, see ../spec_helper.js for renderWithProps

describe("Layout Component", function() {
  var defProps, renderWithProps, component, el, $el;

  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(Layout, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it("should be mounted in DOM", function() {
    renderWithProps();
    expect($el.length).toEqual(1);
  });

  it("should have proper heading", function() {
    expect($el.text()).toContain('Be a friend');
  });

  it("modal should have default hidden state", function() {
    renderWithProps({});
    expect(component.state.isModalOpen).toBe(false);
  });

  it("modal should close", function() {
    renderWithProps({});
    component.closeModal();
    expect(component.state.isModalOpen).toBe(false);
  });

  it("can open modal", function() {
    renderWithProps({});
    component.openModal();
    expect(component.state.isModalOpen).toBe(true);
  });

  it("should handle child click", function() {
    renderWithProps({});
    component.handleChildClick();
    expect(component.state.isModalOpen).toBe(false);
  });
});

describe('SignIn', function () {
  beforeEach(function() {
    Accounts.createUser({
      username: 'tester',
      password : 'password'
    });
  });
  afterEach(function() {
    Accounts.logout(function() {
      done();
    });
  });
  it('should be able to login normal user', function (done) {
    Meteor.loginWithPassword('tester', 'password', function (err) {
        expect(err).toBeUndefined();
        done();
    });
  });
});

describe('Authed', function () {
  var defProps, renderWithProps, component, el, $el;
  // var fakeUser;
  // beforeEach(function () {
  //   fakeUser = {
  //     _id: '123',
  //     username: 'tester',
  //     password: 'password'
  //   };
  //   spyOn(Meteor, 'user').and.returnValue(fakeUser);
  // });
  beforeEach(function() {
    Accounts.createUser({
      username: 'tester',
      password : 'password'
    });
    //Meteor.loginWithPassword('tester', 'password');
    renderWithProps = function(props) {
      component = renderComponent(Layout, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });
  afterEach(function(done) {
    Accounts.logout(function() {
      done();
    });
  });
  it("should show main app stuff", function() {
    //spyOn(UI._globalHelpers, "currentUser").and.returnValue(true);
    Meteor.loginWithPassword('tester', 'password');
    spyOn(Meteor, 'userId').and.returnValue('not null');
    var meteorData = component.getMeteorData();
    expect(meteorData.currentUser).toBe(1);
    //expect($el.text()).toContain('Be a friend!!!');
  });
  // it("yo it should have proper heading", function() {
  //   expect($el.text()).toContain('Be a friend');
  // });
});
