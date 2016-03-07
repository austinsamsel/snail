Layout = React.createClass({
  //this mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // loads items from the letters collection and puts them on this.data.letters
  getMeteorData(){
    return{
      currentUser: Meteor.user(),
      letters: Letters.find().fetch()
    };
  },

  // modals
  getInitialState: function() {
    return { isModalOpen: false };
  },
  openModal: function() {
    this.setState({ isModalOpen: true });
  },
  closeModal: function() {
    this.setState({ isModalOpen: false });
  },
  handleChildClick: function(){
    this.setState({ isModalOpen: false });
  },

  numUnreadLetters(){
    return Letters.find({ $and : [{toUser: Meteor.user().username}, {readCount: {$lt: 1}}] }).count();
  },

  unreadCount(){
    return (this.numUnreadLetters() > 0) ? ' ('+ this.numUnreadLetters()+')' : '';
  },

  render() {
    return (
      <div>
        { this.data.currentUser ?
          <div className="app-container">
            <AccountsUIWrapper />
            <div className="logo">
              <a href="/"><img src="images/snail_logo.png" /></a>
            </div>

            <ul className="navigation">
              <li>
                <a href='' onClick={this.openModal}>Compose</a>
              </li>
              <li className={FlowHelpers.currentRoute( 'home' )}>
                <a href={FlowRouter.path('home')} className='unreadLettersCount'>Letters{this.unreadCount()}</a>
              </li>
              <li className={FlowHelpers.currentRoute( 'contacts' )}>
                <a href={FlowRouter.path('contacts')}>Contacts</a>
              </li>
            </ul>

            <Modal isOpen={this.state.isModalOpen}
                   transitionName="modal-anim" transitionEnterTimeout={500} transitionLeaveTimeout={300} >
              <span className="modal-close remove-btn" onClick={this.closeModal}>&times;</span>
              <Compose onClick={this.handleChildClick} />
            </Modal>

            {this.props.content}

          </div>

          :

          <div className="app-container">

            <div className="logo">
              <img src="images/snail_logo.png" />
            </div>

            <div className="welcome-body">
              <p>Be a friend.</p>
              <p>Write a letter.</p>
              <AccountsUIWrapper />
            </div>
          </div>
        }
      </div>
    );
  }
});
