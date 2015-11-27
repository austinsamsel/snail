Letter = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    letter: React.PropTypes.object.isRequired
  },

  deleteThisLetter() {
    Meteor.call("removeLetter", this.props.letter._id);
  },

  render(){
    return (
      <li>
        <span className="text">
          <strong>{this.props.letter.toUser}</strong>:
            &nbsp; {this.props.letter.letterBody}
          <button className="delete" onClick={this.deleteThisLetter}>
            &times;
          </button>
        </span>
      </li>
    )
  }

})
