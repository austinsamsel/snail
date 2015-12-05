Letter = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    letter: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return { isModalOpen: false };
  },
  openModal: function() {
    this.setState({ isModalOpen: true });
  },
  closeModal: function() {
    this.setState({ isModalOpen: false });
  },

  render(){
    return (
      <span>
        <Modal isOpen={this.state.isModalOpen}
               transitionName="modal-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
          <div className="letter-modal">
            {this.letterToUser()}
            {this.letterFromUser()}
          </div>
          <button onClick={this.closeModal}>Close modal</button>
        </Modal>

        <span onClick={this.openModal}>
          {this.letterToUser()}
          {this.letterFromUser()}
        </span>

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
  letterCreatedAt(){ // not in use // created: {this.letterCreatedAt()}
    var a = this.props.letter.createdAt;
    return moment(a).format('MMMM Do YYYY, h:mm a');
  },
  letterDeliverAt(){ // not in use // deliver: {this.letterDeliverAt()}
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
