import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { LoginButton } from "./LoginButton";

var enhance = compose(
  withHandlers({
    onClick: ({ login }) => e => {
      login();
    }
  })
);

export var EnhancedLoginButton = enhance(LoginButton);
EnhancedLoginButton.displayName = "enhance(LoginButton)";
