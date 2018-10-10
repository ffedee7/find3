import { connect } from "react-redux";
import { EnhancedCustomInput } from "./EnhancedCustomInput";
import { SET_INPUT } from "../../state/actions";
var mapStateToProps = () => ({});

var mapActionsToProps = {
  onChange: (key, value) => ({
    type: SET_INPUT,
    payload: { key, value }
  })
};

export var EnhancedCustomInputContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomInput);
EnhancedCustomInputContainer.displayName = "connect(EnhancedCustomInput)";
