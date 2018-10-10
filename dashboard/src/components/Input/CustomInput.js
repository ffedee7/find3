import React from "react";
import T from "prop-types";
import { Input } from "semantic-ui-react";

export var CustomInput = ({
  className,
  id,
  onTextChange,
  value,
  label,
  placeholder
}) => (
  <Input
    className={className}
    onChange={onTextChange(id)}
    value={value}
    label={label}
    placeholder={placeholder}
  />
);

CustomInput.propTypes = {
  value: T.string,
  label: T.string,
  placeholder: T.string
};
