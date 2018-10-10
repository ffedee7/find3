import { connect } from "react-redux";
import { EnhancedSelectButton } from "./EnhancedSelectButton";
var mapStateToProps = state => ({
  loading: state.loading
});

var mapActionsToProps = {
  selectPage: page => ({
    type: `CHOOSE_PAGE`,
    payload: page
  })
};

export var EnhancedSelectButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedSelectButton);
EnhancedSelectButtonContainer.displayName = "connect(EnhancedSelectButton)";
