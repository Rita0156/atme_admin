
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
} from "react-admin";

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <ImageField
        source="quizImage"
        title="Avatar"
        style={{ width: "100%", height: "100%", margin: "auto" }}
      />
      <TextField source="name" />
      <TextField source="winningCoins" />
      <EditButton basePath="/" />
    </Datagrid>
  </List>
);

export default UserList;

//quizImage
