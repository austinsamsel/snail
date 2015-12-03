Layout = React.createClass({
  render() {
    return (
      <div>
        <h1>app</h1>

        <AccountsUIWrapper />

        <hr />
        <a href="/"> home </a>
        <a href={FlowRouter.path('users')}>Users</a>

        <hr />
        {this.props.content}
        <hr />
        footer stuff
      </div>
    );
  }
});
