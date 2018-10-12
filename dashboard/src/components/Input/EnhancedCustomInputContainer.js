import { connect } from "react-redux";
import { EnhancedCustomInput } from "./EnhancedCustomInput";
import { SET_INPUT } from "../../state/actions";
var mapStateToProps = () => ({});

var mapActionsToProps = {
  onChange: (key, value) => ({
    type: SET_INPUT,
    payload: { key, value }
  }),
  onChangeEdit: (key, value, id) => ({
    type: `SET_INPUT_EDIT`,
    payload: { key, value, id }
  })
};

export var EnhancedCustomInputContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomInput);
EnhancedCustomInputContainer.displayName = "connect(EnhancedCustomInput)";
