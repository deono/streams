// 327639100702-3hfmh5rs2o41jejsb524s8s7p9kuo2b7.apps.googleusercontent.com
import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
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
          // update auth state in Redux store
          this.onAuthChange(this.auth.isSignedIn.get());
          // event listener - change of auth status
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // HELPER METHODS
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.this.auth.currentuser.get().getId());
    } else {
      this.props.signOut();
    }
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
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
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

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
