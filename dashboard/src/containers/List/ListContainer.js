import { connect } from "react-redux";
import { MainList } from "./List";

var mapStateToProps = state => ({
  list: state.pieces
});

var mapActionsToProps = {};

export var ListContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(MainList);
ListContainer.displayName = "connect(EnhancedCustomInput)";
