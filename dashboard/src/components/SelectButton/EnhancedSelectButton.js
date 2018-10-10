import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { SelectButton } from "./SelectButton";

var enhance = compose(
  withHandlers({
    onClick: ({ selectPage }) => key => e => {
      selectPage(key);
    }
  })
);

export var EnhancedSelectButton = enhance(SelectButton);
EnhancedSelectButton.displayName = "enhance(SelectButton)";
