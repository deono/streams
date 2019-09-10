// 327639100702-3hfmh5rs2o41jejsb524s8s7p9kuo2b7.apps.googleusercontent.com
import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "327639100702-3hfmh5rs2o41jejsb524s8s7p9kuo2b7.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // set authentication as state
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          // event listener
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // HELPER METHODS
  onAuthChange = () => {
    // update state on authentication change (sign in/out)
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClick = () => {
    //sign the user in
    this.auth.signIn();
  };

  onSignOutClick = () => {
    // sign the user out
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign in with Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
