import React from "react";
import { Button } from "semantic-ui-react";

export var DeleteButton = ({ loading, onClick, children }) => (
  <Button negative loading={loading} onClick={onClick} children={children} />
);
