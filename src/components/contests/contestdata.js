
import axios from "axios";
import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  EditButton,
  DeleteButton,
  Button 
} from "react-admin";

const UserList = (props) => {
   const handleButtonClick = () => {

    }

    const handleDelete = (id) => {
       
        axios.delete(`https://atme-quiz.onrender.com/api/contests/${id}`)
          .then(response => {
             console.log('Record deleted successfully',response);
          })
          .catch(error => {
             console.error('Error deleting record:', error);
          });
      };

      const handleRowClick = (id, basePath, record) => {
        // Replace '/details' with the route to the new page
        window.location.href = `/details/${id}`;
      };

return (
    <div>
    <List {...props} rowClick={(id, basePath, record) => handleRowClick(id, props.basePath, record)}>
    <Button label="Add Category" onClick={handleButtonClick} />
   <Datagrid>
     <ImageField
       source="quizImage"
       title="Avatar"
       style={{ width: "100%", height: "100%", margin: "auto" }}
       label='Image'
     />
     <TextField source="name" label='Category' />
     <TextField source="winningCoins" label='Name' />
     {/* <EditButton basePath="/" label="Edit"/>
     <DeleteButton basePath="/" label="Delete" onClick={(event, id) => handleDelete(id)} /> */}
   </Datagrid>
 </List>
</div>
)
};

export default UserList;

//quizImage
