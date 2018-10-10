import { connect } from "react-redux";
import { EnhancedSaveButton } from "./EnhancedSaveButton";
import { CREATE_DATA_REQUEST, EDIT_DATA_REQUEST } from "../../state/actions";
var mapStateToProps = state => ({
  loading: state.loading
});

var mapActionsToProps = {
  upload: key => {
    return key === "create"
      ? { type: CREATE_DATA_REQUEST }
      : { type: EDIT_DATA_REQUEST };
  }
};

export var EnhancedSaveButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedSaveButton);
EnhancedSaveButtonContainer.displayName = "connect(EnhancedSaveButton)";
