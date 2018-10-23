import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomToggle } from "./CustomToggle";

var enhance = compose(
  withHandlers({
    onTextChange: ({ onChange }) => key => e => {
      onChange(e.target.value);
    }
  })
);

export var EnhancedCustomToggle = enhance(CustomToggle);
EnhancedCustomToggle.displayName = "enhance(CustomToggle)";
