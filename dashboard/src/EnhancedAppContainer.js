import { connect } from "react-redux";
import { EnhancedApp } from "./EnhancedApp.js";

var mapStateToProps = state => ({});

var mapActionsToProps = {
  init: () => ({
    type: "APP_INIT"
  })
};

export var EnhancedAppContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedApp);
EnhancedAppContainer.displayName = "connect(EnhancedApp)";
