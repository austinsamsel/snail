Letter = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    letter: React.PropTypes.object.isRequired
  },

  render(){
    return (
      <span>
        <Modal isOpen={this.state.isModalOpen}
               transitionName="modal-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
          <span className="modal-close" onClick={this.closeModal}>&times;</span>
          <div className="letter-modal">
            {this.letterToUser()}
            {this.letterFromUser()}
          </div>
        </Modal>

        <div className="modal-letter">
          {this.letterToUser()}
          {this.letterFromUser()}
        </div>
      </span>
    )
  },

  getInitialState: function() {
    return { isModalOpen: false };
  },
  openModal: function() {
    this.setState({ isModalOpen: true });
    if (this.toCurrentUser()){
      Meteor.call("readCount", this.props.letter._id);
    }
  },
  closeModal: function() {
    this.setState({ isModalOpen: false });
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

      const letterIsUnread = (this.props.letter.readCount == 0) ? "unread" : "";

      return <li className={letterIsUnread}>
        <div className="letter-from ">
          <span className="address-context">from</span>
          <span className="contact" onClick={this.openModal}>{this.senderAddress()}</span>
        </div>
        <div className="letter-body" onClick={this.openModal}>{this.props.letter.letterBody}</div>
        <div className="remove-letter">
          <span className="remove-btn" onClick={this.deleteReceivedLetter}>
            <i className="trash outline icon"></i>
          </span>
        </div>
      </li>;
    }
  },
  letterFromUser(){
    if ( this.fromCurrentUser() ) {
      return <li>
        <div className="letter-to">
          <span className="address-context">to</span>
          <span className="contact" onClick={this.openModal}>{this.props.letter.toUser}</span>
        </div>
        <div className="letter-body" onClick={this.openModal}>{ this.props.letter.letterBody}</div>
        <div className="remove-letter">
          <span className="remove-btn" onClick={this.deleteSentLetter}>
            <i className="trash outline icon"></i>
          </span>
        </div>
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
