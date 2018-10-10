import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { DeleteButton } from "./DeleteButton";

var enhance = compose(
  withHandlers({
    onClick: ({ del }) => e => {
      del();
    }
  })
);

export var EnhancedDeleteButton = enhance(DeleteButton);
EnhancedDeleteButton.displayName = "enhance(DeleteButton)";
