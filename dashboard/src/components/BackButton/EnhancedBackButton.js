import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { BackButton } from "./BackButton";

var enhance = compose(
  withHandlers({
    onClick: ({ back }) => e => {
      back();
    }
  })
);

export var EnhancedBackButton = enhance(BackButton);
EnhancedBackButton.displayName = "enhance(BackButton)";
