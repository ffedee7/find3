import React from "react";
import { Input, Label, Icon } from "semantic-ui-react";

export var FileInput = ({
  className,
  idType,
  icon,
  id,
  onFileChange,
  accept,
  text,
  value,
  placeholder
}) => (
  <div className={className}>
    <Input value={value} placeholder={placeholder} />
    <Label width="4" as="label" htmlFor={id} size="big">
      <Icon name={icon} />
      {text}
    </Label>
    <input
      name={idType}
      accept={accept}
      onChange={onFileChange(idType)}
      hidden
      id={id}
      type="file"
      multiple
    />
  </div>
);
