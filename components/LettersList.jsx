// Home component
LettersList = React.createClass({
  //this mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // loads items from the letters collection and puts them on this.data.letters
  getMeteorData(){
    Meteor.subscribe("letters");
    return{
      letters: Letters.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user(),
    };
  },

  renderLetters() {
    return this.data.letters.map((letter) => {
      return <Letter key={letter._id} letter={letter} />;
    });
  },

  render() {
    return (
      <span>
        { Letters.find().count() > 0 ?
          <div className="letters-list">
            <ul>
              {this.renderLetters()}
            </ul>
          </div>
        :
          <div className="no-letters-msg">
            You have no messages.
          </div>
        }
      </span>
    );
  }
});
