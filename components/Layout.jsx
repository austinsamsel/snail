Layout = React.createClass({
  //this mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
  // loads items from the letters collection and puts them on this.data.letters
  getMeteorData(){
    return{
      currentUser: Meteor.user(),
    };
  },

  render() {
    return (
      <div>
        { this.data.currentUser ?
          <div>
            <h1>app</h1>

            <AccountsUIWrapper />

            <hr />
            <a href="/">Compose</a> &nbsp;&nbsp; &nbsp;
            <a href={FlowRouter.path('contacts')}>Contacts</a>

            <hr />

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
