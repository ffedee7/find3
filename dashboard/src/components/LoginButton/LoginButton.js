import React from "react";
import { Button } from "semantic-ui-react";

export var LoginButton = ({ loading, onClick, children }) => (
  <Button loading={loading} onClick={onClick} children={children} />
);
