import axios from "axios";
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  DeleteButton,
  Button,
} from "react-admin";

const Category = (props) => {
  const handleRowClick = (id, basePath, record) => {

    window.location.href = `/details/${id}`;
  };

  return (
    <div>
      <List
        {...props}
        rowClick={(id, basePath, record) =>
          handleRowClick(id, props.basePath, record)
        }
      >
        <Button label="Add Category" />
        <Datagrid>
          <ImageField
            source="quizImage"
            title="Avatar"
            style={{ width: "100%", height: "100%", margin: "auto" }}
            label="Image"
          />
          <TextField source="name" label="Category" />
          <TextField source="winningCoins" label="Name" />

        </Datagrid>
      </List>
    </div>
  );
};
export default Category;
