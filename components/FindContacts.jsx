FindContacts = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var searchUsers = this.state.searchUsers;
    Meteor.subscribe("userData");
    Meteor.subscribe("relationships");
    return{
      users: Meteor.users.find({username: searchUsers}).fetch(),
      relationships: Relationships.find().fetch()
    };
  },

  render(){
    var searchUsers = this.state.searchUsers;
    return (
      <div className="find-users-page">
        <label>search by username</label>
        <form className="find-users" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={searchUsers}
            onChange={this.handleChange}
            ref="findUser"
            placeholder=""
          />
        </form>
        <ul className="find-users-results">
          {this.renderUsers()}
        </ul>

        <h2 className="saved-users-title">Saved Contacts</h2>
        <ul className="saved-users">
          {this.renderRelationships()}
        </ul>
      </div>
    );
  },

  // state changes
  getInitialState(){
    return{
      searchUsers: ''
    }
  },
  handleChange(event){
    this.setState({
      searchUsers: event.target.value
    });
  },

  // render conditionals
  renderUsers() {
    return this.data.users.map((user) => {
      return <User key={user._id} user={user} />;
    });
  },
  renderRelationships() {
    return this.data.relationships.map((relationship) => {
      return <Relationship key={relationship._id} relationship={relationship} />;
    });
  },
});
