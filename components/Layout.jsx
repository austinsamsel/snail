Layout = React.createClass({
  //this mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // loads items from the letters collection and puts them on this.data.letters
  getMeteorData(){
    return{
      currentUser: Meteor.user(),
    };
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

  render() {
    return (
      <div>
        { this.data.currentUser ?
          <div>
            <h1>app</h1>

            <AccountsUIWrapper />

            <hr />
            <a onClick={this.openModal}>Compose</a> &nbsp;&nbsp; &nbsp;
            <a href={FlowRouter.path('contacts')}>Contacts</a>

            <hr />

            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim">
              <h3>My Modal</h3>
              <div className="body">
                <p>This is the modal&apos;s body.</p>
              </div>
              <button onClick={this.closeModal}>Close modal</button>
            </Modal>

            <Compose />

            <hr />
            {this.props.content}
            <hr />
            footer stuff
          </div>

          :

          <div>
            <h1>app</h1>
            <AccountsUIWrapper />

            <hr/>

            You're not logged in.
          </div>
        }
      </div>
    );
  }
});
