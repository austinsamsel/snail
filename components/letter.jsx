Letter = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    letter: React.PropTypes.object.isRequired
  },

  deleteReceivedLetter() {
    Meteor.call("deleteReceivedLetter", this.props.letter._id);
  },
  deleteSentLetter(){
    Meteor.call("deleteSentLetter", this.props.letter._id);
  },

  render(){
    var fromAddress = Meteor.users.findOne({_id: this.props.letter.owner}).username;
    var currentUserId = Meteor.userId();
    var username = Meteor.users.findOne({_id: currentUserId}).username;
    var toUser = this.props.letter.toUser == username && this.props.letter.hideReceived == null;
    var fromUser = this.props.letter.owner == currentUserId && this.props.letter.hideSent == null;

    return (
      <span>
        { toUser ? (
            <li>
              <button className="delete" onClick={this.deleteReceivedLetter}>
                &times;
              </button>
              <strong>from- {fromAddress}</strong>
              &nbsp; { this.props.letter.letterBody}
            </li>
          ) : '' }
        { fromUser ? (
            <li>
              <button className="delete" onClick={this.deleteSentLetter}>
                &times;
              </button>
              <strong>to- {this.props.letter.toUser} </strong>
              &nbsp; { this.props.letter.letterBody}
            </li>
          ) : '' }
      </span>
    )
  }

})
