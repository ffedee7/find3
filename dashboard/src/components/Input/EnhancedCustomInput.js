import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomInput } from "./CustomInput";

var enhance = compose(
  withHandlers({
    onTextChange: ({ onChange, onChangeEdit, edit, piece }) => key => e => {
      if (edit) {
        onChangeEdit(key, e.target.value, piece);
      } else {
        onChange(key, e.target.value);
      }
    }
  })
);

export var EnhancedCustomInput = enhance(CustomInput);
EnhancedCustomInput.displayName = "enhance(CustomInput)";
