import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { ListHeader } from "./ListHeader";

var enhance = compose(
  withHandlers({
    onClick: ({ sendToEdit }) => (id, name) => () => {
      sendToEdit(id, name);
    }
  })
);

export var EnhancedListHeader = enhance(ListHeader);
EnhancedListHeader.displayName = "enhance(ListHeader)";
