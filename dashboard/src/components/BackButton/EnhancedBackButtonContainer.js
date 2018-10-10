import { connect } from "react-redux";
import { EnhancedBackButton } from "./EnhancedBackButton";
var mapStateToProps = state => ({});

var mapActionsToProps = {
  back: () => ({
    type: `GO_BACK`
  })
};

export var EnhancedBackButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedBackButton);
EnhancedBackButtonContainer.displayName = "connect(EnhancedBackButton)";
