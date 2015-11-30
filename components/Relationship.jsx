Relationship = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    relationship: React.PropTypes.object.isRequired
  },

  render(){
    var saveContact = this.props.relationship.saveContact;
    var username = Meteor.users.findOne({_id: saveContact}).username;
    return (
      <li>
        {username}
      </li>
    )
  }

})
