import React from "react";
import { Button } from "semantic-ui-react";

export var SaveButton = ({ loading, onClick, children, id }) => (
  <Button
    positive
    loading={loading}
    onClick={onClick(id)}
    children={children}
  />
);
