import React from "react";
import { Checkbox } from "semantic-ui-react";

export var CustomToggle = ({ text, onChange, id }) => (
  <div>
    <Checkbox toggle label={text} onChange={onChange(id)} />
  </div>
);
