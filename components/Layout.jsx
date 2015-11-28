Layout = React.createClass({
  render() {
    return (
      <div>
        <h1>app</h1>

        <AccountsUIWrapper />

        <hr />
        {this.props.content}
        <hr />
        footer stuff
      </div>
    );
  }
});
