import { connect } from "react-redux";
import { EnhancedFileInput } from "./EnhancedFileInput";
import { SET_FILE } from "../../state/actions";
var mapStateToProps = (state, ownProps) => ({
  value: state[ownProps.idType]
});

var mapActionsToProps = {
  onLoad: files => ({
    type: SET_FILE,
    payload: { files }
  })
};

export var EnhancedFileInputContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedFileInput);
EnhancedFileInputContainer.displayName = "connect(EnhancedFileInput)";
