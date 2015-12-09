Compose = React.createClass({
  mixins: [ReactMeteorData],
  // loads items from the letters collection and puts them on this.data.letters
  getMeteorData(){
    Meteor.subscribe("userData");
    Meteor.subscribe("relationships");
    return{
      letters: Letters.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user(),
    };
  },

  render(){
    return (
      <div>
        <form className="new-letter" onSubmit={this.handleSubmit} >
          <label>addressed to:</label>
          <Typeahead
            type="text"
            ref="toUser"
            placeholder=""
            options={this.getRelationships()}
            maxVisible={3}
          />
        <Textarea
            ref="letterBody"
            placeholder="Type your letter"></Textarea>
          <input type="submit" onClick={this.props.onClick} />
        </form>
      </div>
    )
  },

  getRelationships(){
    q = Relationships.find().fetch();
    ids = q.map((q) => {
      return q.saveContact
    });
    usernames = ids.map((ids) => {
      return Meteor.users.findOne({ _id: ids }).username;
    })
    return usernames;
  },

  handleSubmit(event){
    event.preventDefault();

    //Find the textarea via the React ref
    var toUser = ReactDOM.findDOMNode(this.refs.toUser.refs.entry).value.trim();
    var letterBody = ReactDOM.findDOMNode(this.refs.letterBody).value.trim();

    Meteor.call("addLetter", toUser, letterBody);

    // Clear form
    ReactDOM.findDOMNode(this.refs.toUser.refs.entry).value = "";
    ReactDOM.findDOMNode(this.refs.letterBody).value = "";
  },

})
