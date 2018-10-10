import { connect } from "react-redux";
import { EnhancedListHeader } from "./EnhancedListHeader";

var mapStateToProps = () => ({});

var mapActionsToProps = {
  sendToEdit: (id, name) => ({
    type: `SEND_EDIT`,
    payload: { id, name }
  })
};

export var EnhancedListHeaderContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedListHeader);
EnhancedListHeaderContainer.displayName = "connect(EnhancedListHeader)";
