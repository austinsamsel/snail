User = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    user: React.PropTypes.object.isRequired,
  },
  render(){
    return (
      <li>
        {this.props.user.username}
        {this.followButton()}
        {this.unfollowButton()}
      </li>
    )
  },
  //method calls
  saveThisContact() {
    Meteor.call("saveContact", this.props.user._id);
  },
  removeThisContact(){
    var currentUserId = Meteor.userId();
    var followedUserId = this.props.user._id;
    Meteor.call("removeContact", currentUserId, followedUserId);
  },
  // render conditionals
  followButton(){
    if ( ! this.isCurrentUser() && ! this.isFollowed() ) {
      return <button className="save" onClick={this.saveThisContact}>save contact</button>;
    }
  },
  unfollowButton(){
    if ( ! this.isCurrentUser() && this.isFollowed() ) {
      return <button className="remove" onClick={this.removeThisContact}>remove contact</button>;
    }
  },
  // helper functions
  isCurrentUser(){
    if (this.props.user._id == Meteor.userId())
      return true;
  },
  isFollowed(){
    if (Relationships.findOne({$and: [{owner: Meteor.userId()}, {saveContact: this.props.user._id}] }) != null)
      return true;
  },

})
