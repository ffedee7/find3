import React from "react";
import { Button } from "semantic-ui-react";

export var SelectButton = ({ id, loading, onClick, children }) => (
  <Button loading={loading} onClick={onClick(id)} children={children} />
);
