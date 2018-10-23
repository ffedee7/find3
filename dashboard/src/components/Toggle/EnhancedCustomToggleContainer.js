import { connect } from "react-redux";
import { EnhancedCustomToggle } from "./EnhancedCustomToggle";
var mapStateToProps = state => ({
  value: state.toggle
});

var mapActionsToProps = {
  onChange: value => ({
    type: "SET_TOGGLE",
    payload: { value }
  }),
  onChangeEdit: (key, value, id) => ({
    type: `SET_TOGGLE_EDIT`,
    payload: { key, value, id }
  })
};

export var EnhancedCustomToggleContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomToggle);
EnhancedCustomToggleContainer.displayName = "connect(EnhancedCustomToggle)";
