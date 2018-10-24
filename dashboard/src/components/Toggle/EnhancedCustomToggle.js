import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomToggle } from "./CustomToggle";

var enhance = compose(
  withHandlers({
    onChange: ({
      onChange,
      onChangeEdit,
      value,
      checked,
      edit,
      piece
    }) => key => e => {
      if (edit) {
        onChangeEdit(key, !checked, piece);
      } else {
        onChange(!value);
      }
    }
  })
);

export var EnhancedCustomToggle = enhance(CustomToggle);
EnhancedCustomToggle.displayName = "enhance(CustomToggle)";
