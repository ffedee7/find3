import { connect } from "react-redux";
import { EnhancedCustomToggle } from "./EnhancedCustomToggle";
var mapStateToProps = () => ({});

var mapActionsToProps = {
  onChange: value => ({
    type: "SET_TOGGLE",
    payload: { value }
  })
};

export var EnhancedCustomToggleContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomToggle);
EnhancedCustomToggleContainer.displayName = "connect(EnhancedCustomToggle)";
