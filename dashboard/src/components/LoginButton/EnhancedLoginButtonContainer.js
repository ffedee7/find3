import { connect } from "react-redux";
import { EnhancedLoginButton } from "./EnhancedLoginButton";
import { LOGIN_REQUEST } from "../../state/actions";
var mapStateToProps = state => ({
  loading: state.loading
});

var mapActionsToProps = {
  login: () => ({
    type: LOGIN_REQUEST
  })
};

export var EnhancedLoginButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedLoginButton);
EnhancedLoginButtonContainer.displayName = "connect(EnhancedLoginButton)";
