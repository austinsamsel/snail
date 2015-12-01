Letter = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    letter: React.PropTypes.object.isRequired
  },

  render(){
    return (
      <span>
        {this.letterToUser()}
        {this.letterFromUser()}
        created: {this.letterCreatedAt()}
        deliver: {this.letterDeliverAt()}
      </span>
    )
  },

  //method calls
  deleteReceivedLetter() {
    Meteor.call("deleteReceivedLetter", this.props.letter._id);
  },
  deleteSentLetter(){
    Meteor.call("deleteSentLetter", this.props.letter._id);
  },

  // render conditionals
  letterToUser(){
    if ( this.toCurrentUser() ){
      return <li>
        <strong>from- {this.senderAddress()}</strong>
        &nbsp; {this.props.letter.letterBody}
        <button className="delete" onClick={this.deleteReceivedLetter}>
          &times;
        </button>
      </li>;
    }
  },
  letterFromUser(){
    if ( this.fromCurrentUser() ) {
      return <li>
        <strong>to- {this.props.letter.toUser} </strong>
        &nbsp; { this.props.letter.letterBody}
        <button className="delete" onClick={this.deleteSentLetter}>
          &times;
        </button>
      </li>;
    }
  },

  //helper functions
  letterCreatedAt(){
    var a = this.props.letter.createdAt;
    return moment(a).format('MMMM Do YYYY, h:mm a');
  },
  letterDeliverAt(){
    var a = this.props.letter.deliverAt._d;
    return moment(a).format('MMMM Do YYYY, h:mm a');
  },
  senderAddress(){
    return Meteor.users.findOne({_id: this.props.letter.owner}).username;
  },
  toCurrentUser(){
    if ((this.props.letter.toUser == Meteor.user().username) && (this.props.letter.hideReceived == null))
      return true;
  },
  fromCurrentUser(){
    if ( this.props.letter.owner == Meteor.userId() && this.props.letter.hideSent == null )
      return true;
  },
})
