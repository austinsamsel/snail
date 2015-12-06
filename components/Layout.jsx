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
          <div className="app-container">
            <AccountsUIWrapper />
            <div className="logo">
              <img src="images/snail_logo.png" />
            </div>

            <div className="navigation">
              <a href='' onClick={this.openModal}>Compose</a> &nbsp;&nbsp; &nbsp;
              <a href={FlowRouter.path('home')}
                className={FlowHelpers.currentRoute( 'home' )}>Letters</a> &nbsp;&nbsp; &nbsp;
              <a href={FlowRouter.path('contacts')}       className={FlowHelpers.currentRoute( 'contacts' )}>Contacts</a>
            </div>

            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
              <Compose />
              <button onClick={this.closeModal}>Close modal</button>
            </Modal>

            {this.props.content}

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
