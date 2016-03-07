describe("Layout component", function() {
  var defProps, renderWithProps, component, el, $el;
  beforeEach(function() {
    renderWithProps = function(props) {
      component = renderComponent(Layout, props);
      el = React.findDOMNode(component);
      $el = $(el);
    };
  });

  it("should be mounted in DOM", function() {
    renderWithProps({});
    expect($el.length).toEqual(1);
  });

  it("should show some text to logged out user", function() {
    expect($el.text()).toContain('Be a friend');
  });

  it("should have the compose modal hidden by default", function() {
    renderWithProps({});
    expect(component.state.isModalOpen).toBe(false);
  });

  it("should let user open a modal", function() {
    renderWithProps({});
    component.openModal();
    expect(component.state.isModalOpen).toBe(true);
  });

  it("should let user close the compose modal", function() {
    renderWithProps({});
    component.closeModal();
    expect(component.state.isModalOpen).toBe(false);
  });

  it("should let modal be closed through a child component", function() {
    renderWithProps({});
    component.handleChildClick();
    expect(component.state.isModalOpen).toBe(false);
  });
});
