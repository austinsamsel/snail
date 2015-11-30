FindUsers = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var searchUsers = this.state.searchUsers;
    return{
      //users: Meteor.users.find(searchUsers).fetch()
      //users: Meteor.users.find().fetch()
      users: Meteor.users.find({username: searchUsers}).fetch(),
      relationships: Relationships.find().fetch()
    };
  },

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

  render(){
    var searchUsers = this.state.searchUsers;
    return (
      <div>
        <form className="find-users" onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={searchUsers}
            onChange={this.handleChange}
            ref="findUser"
            placeholder="Search by username…"
          />
        </form>
        <ul>
          {this.renderUsers()}
        </ul>
        <ul>
          {this.renderRelationships()}
        </ul>
      </div>
    );
  }
});
