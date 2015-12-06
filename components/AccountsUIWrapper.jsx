AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // use meteor blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
});
