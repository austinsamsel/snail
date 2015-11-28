FindUsers = React.createClass({
  render(){
    return (
      <div className="find-users" onSubmit={this.handleSubmit}>
        suppp
        <input
          type="text"
          ref="findUser"
          placeholder="Search by username…"
        />
      </div>
    );
  }
});
