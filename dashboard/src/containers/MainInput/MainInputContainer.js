import { connect } from "react-redux";
import { MainInput } from "./MainInput";

var mapStateToProps = state => ({
  item:
    state.piecesEdit &&
    state.piecesEdit.find(elem => {
      return elem.piece_id === state.editId;
    }),
  id: state.editId || "",
  name: state.editName || ""
});

var mapActionsToProps = {};

export var MainInputContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(MainInput);

MainInputContainer.displayName = "connect(EnhancedCustomInput)";
