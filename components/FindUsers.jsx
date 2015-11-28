FindUsers = React.createClass({
  renderUsers() {
    return this.data.users.map((user) => {
      return <User key={user._id} user={user} />;
    });
  },

  render(){
    return (
      <div className="find-users" onSubmit={this.handleSubmit}>
        suppp
        <input
          type="text"
          ref="findUser"
          placeholder="Search by username…"
        />
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
});
