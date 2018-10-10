import React from "react";
import { List } from "semantic-ui-react";
export var ListHeader = ({ item, onClick }) => (
  <div>
    <List.Header as="a" onClick={onClick(item.piece_id, item.location_name)}>
      {item.location_name || ""}
    </List.Header>
  </div>
);
