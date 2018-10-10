import { connect } from "react-redux";
import { EnhancedCustomTextArea } from "./EnhancedCustomTextArea";
import { SET_INPUT } from "../../state/actions";
var mapStateToProps = () => ({});

var mapActionsToProps = {
  onChange: (key, value) => ({
    type: SET_INPUT,
    payload: { key, value }
  })
};

export var EnhancedCustomTextAreaContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomTextArea);
EnhancedCustomTextAreaContainer.displayName = "connect(EnhancedCustomTextArea)";
