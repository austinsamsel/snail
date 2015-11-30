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

  render(){
    var currentUserId = Meteor.userId();
    var followUser = this.props.user._id != currentUserId;
    return (
      <li>
        {this.props.user.username}
        { followUser ? (
          <button className="save" onClick={this.saveThisContact}>save contact</button>
          ) : (
            <button className="remove" onClick={this.removeThisContact}>remove contact</button>
          )
        }
      </li>
    )
  }

})
