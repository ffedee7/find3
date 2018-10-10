import { connect } from "react-redux";
import { EnhancedDeleteButton } from "./EnhancedDeleteButton";
var mapStateToProps = state => ({
  loading: state.loading
});

var mapActionsToProps = {
  del: () => ({
    type: `DEL_ITEM`
  })
};

export var EnhancedDeleteButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedDeleteButton);
EnhancedDeleteButtonContainer.displayName = "connect(EnhancedDeleteButton)";
