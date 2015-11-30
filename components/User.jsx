User = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    user: React.PropTypes.object.isRequired,
  },

  saveThisContact() {
    Meteor.call("saveContact", this.props.user._id);
  },
  removeThisContact(){
    var currentUserId = Meteor.userId();
    var followedUserId = this.props.user._id;
    Meteor.call("removeContact", currentUserId, followedUserId);
  },

  render(){
    var currentUserId = Meteor.userId();
    var followedUserId = this.props.user._id;
    var notCurrentUser = this.props.user._id != currentUserId;
    var notFollowedByCurrentUser = Relationships.findOne({$and : [{owner : currentUserId}, {saveContact : followedUserId}] }) == null;
    var followUserButton = notCurrentUser && notFollowedByCurrentUser;

    var followedByCurrentUser = Relationships.findOne({$and : [{owner : currentUserId}, {saveContact : followedUserId}] }) != null;

    var unfollowUserButton = notCurrentUser && followedByCurrentUser;

    return (
      <li>
        {this.props.user.username}
        { followUserButton ? (
          <button className="save" onClick={this.saveThisContact}>save contact</button>
          ) : ''}

        { unfollowUserButton ? (
          <button className="remove" onClick={this.removeThisContact}>remove contact</button>
        ): ''}
      </li>
    )
  }

})
