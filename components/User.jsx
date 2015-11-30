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
    Meteor.call("removeContact", currentUserId, this.props.user._id);
  },

  checkForRecord(followedId){
    if(followedId == 'undefined'){
      return null;
    } else {
      return followedId
    }
  },

  render(){
    var currentUserId = Meteor.userId();
    var followedUserId = this.props.user._id;
    var followUser = (this.props.user._id != currentUserId) && (Relationships.findOne({$and : [{owner : currentUserId}, {saveContact : followedUserId}] }) == null);

    //var followedUser = this.props.user._id;
    //var followedId = Relationships.findOne({$and : [{owner : currentUserId}, {saveContact : followedUser}]}).saveContact;
    //var unfollowUser = this.props.user._id == checkForRecord(followedId);

    return (
      <li>
        {this.props.user.username}
        { followUser ? (
          <button className="save" onClick={this.saveThisContact}>save contact</button>
          ) : ''}


        { (1+1 != 2) ? (
          <button className="remove" onClick={this.removeThisContact}>remove contact</button>
        ): ''}
      </li>
    )
  }

})
