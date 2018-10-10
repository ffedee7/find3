import React from "react";
import T from "prop-types";
import { TextArea } from "semantic-ui-react";

export var CustomTextArea = ({
  id,
  onTextChange,
  value,
  label,
  placeholder
}) => (
  <TextArea
    onChange={onTextChange(id)}
    value={value}
    label={label}
    placeholder={placeholder}
  />
);

CustomTextArea.propTypes = {
  value: T.string,
  label: T.string,
  placeholder: T.string
};
