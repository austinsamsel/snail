Relationship = React.createClass({
  propTypes: {
    // gets the letter to display through a React prop.
    // we can use propTypes to indicate it is required.
    relationship: React.PropTypes.object.isRequired
  },

  render(){
    return (
      <li>
        {this.props.relationship._id}
      </li>
    )
  }

})
