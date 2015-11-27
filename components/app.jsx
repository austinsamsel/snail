// App component - represents the whole app
App = React.createClass({
  //this mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // loads items from the letters collection and puts them on this.data.letters
  getMeteorData(){
    return{
      letters: Letters.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    };
  },

  renderLetters() {
    return this.data.letters.map((letter) => {
      return <Letter key={letter._id} letter={letter} />;
    });
  },

  handleSubmit(event){
    event.preventDefault();

    //Find the textarea via the React ref
    var toUser = ReactDOM.findDOMNode(this.refs.toUser).value.trim();
    var letterBody = ReactDOM.findDOMNode(this.refs.letterBody).value.trim();

    Meteor.call("addLetter", toUser, letterBody);

    // Clear form
    ReactDOM.findDOMNode(this.refs.toUser).value = "";
    ReactDOM.findDOMNode(this.refs.letterBody).value = "";
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>app</h1>

          <AccountsUIWrapper />

          { this.data.currentUser ?
            <form className="new-letter" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="toUser"
                placeholder="send to…"
                />
              <textarea
                ref="letterBody"
                placeholder="Type your letter"></textarea>
              <input type="submit" />
            </form> : ''
          }

        </header>

        <ul>
          {this.renderLetters()}
        </ul>
      </div>
    );
  }
});
