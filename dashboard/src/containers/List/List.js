import React from "react";
import { List } from "semantic-ui-react";
import { EnhancedSelectButtonContainer as Button } from "../../components/SelectButton";
import { EnhancedListHeaderContainer as ListHeader } from "../../components/ListHeader";

export var MainList = ({ list = [{}] }) => (
  <div className="MainInput">
    {"Elija una para editar o cree una nueva"}
    <br />
    <hr />
    <List divided relaxed>
      {list.map((item, i) => {
        return (
          <List.Item key={i}>
            <List.Icon name="archive" size="large" verticalAlign="middle" />
            <List.Content>
              <ListHeader item={item} />
              <List.Description as="a">
                {item && item.description && item.description.substr(0, 50)}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      })}
    </List>

    <Button id="create">{"Crear Obra"}</Button>
  </div>
);
