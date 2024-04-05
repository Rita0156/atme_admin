import { useState } from "react";

import { Box, Tooltip, IconButton } from "@mui/material";
// import {useDispatch} from 'react-redux'
import Iconify from "../iconify";
import AddEditCategoryForm from "../editAddForm";
import axios from 'axios'

export default function DeleteEditeTableTooltip({ productDetails, tableMeta, compoData }) {

//  const dispatch = useDispatch()
  const [showModalEdit, setShowEditForm] = useState(false);
  const [productDetailsdata,setProductDetails] =useState({})

  const handleEditClick = (id) => {
    console.log(id,'edit id btn clicked')
    for(let i=0; i<productDetails?.length; i++){
      if(productDetails[i].id==id){
        setProductDetails(productDetails[i])
      }
     }
     setShowEditForm(true);
  }
 
  const handleEditClose = () => {
    setShowEditForm(false);  
  };

  const handleDeleteUser = async(id) => {
    
      try{
        const {data} = await axios.delete(`https://atme-quiz.onrender.com/api/contests/${id}`)
        console.log(data,'%%%%%%%%%%%% delete data')
      }
      catch(err){
        console.log(err,'%%%%%%%%%%%% delete data')
      }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Tooltip title="Edit" sx={{ color: "black", backgroundColor: "white" }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(tableMeta.rowData[0]);
          }}
          sx={{ marginRight: "12px" }}
        >
          <Iconify icon={"eva:edit-fill"} />
        </IconButton>

        <div>
          
         {showModalEdit && <AddEditCategoryForm show={showModalEdit} handleClose={handleEditClose} title='Edit' editData={productDetailsdata}/>}
          {/* here open model */}
        </div>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(tableMeta.rowData[0]);
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={"eva:trash-2-outline"} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}