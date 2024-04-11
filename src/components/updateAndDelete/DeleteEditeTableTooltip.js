import { useState } from "react";
import { Box, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button  } from "@mui/material";
// import {useDispatch} from 'react-redux'
import Iconify from "../iconify";
import AddEditCategoryForm from "../category/editForm/EditCategoryForm";
import axios from "axios";
import AddQuiz from "../quizes/addQuiz/AddQuiz";
import toast from "react-hot-toast";

export default function DeleteEditeTableTooltip({
  productDetails,
  tableMeta,
  fromCategory,
  compoData,
}) {
  const [showModalEdit, setShowEditForm] = useState(false);
  const [productDetailsdata, setProductDetailsdata] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);

  // console.log(productDetails, " jjjjjjjjjjjjjjj");
  const handleEditClick = (id) => {
    if (fromCategory) {
      for (let i = 0; i < productDetails?.length; i++) {
        if (productDetails[i]?.id === id) {
          setProductDetailsdata(productDetails[i]);
        }
      }
    } else {
      for (let i = 0; i < productDetails?.length; i++) {
        if (productDetails[i]?.category === id) {
          setProductDetailsdata(productDetails[i]);
        }
      }

    }
    setShowEditForm(true);
  };
  
  const handleEditClose = () => {
    setShowEditForm(false);
  };

  const handleDeleteUser = async (id) => {
    if (fromCategory) {
      setOpenConfirmation(true); // Show confirmation dialog before deletion
    } else {
      // Your existing code for deleting category
      // ...
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const { data } = await axios.delete(
        `https://atme-quiz.onrender.com/api/contests/${tableMeta.rowData[0]}`
      );
      toast.success("Entity deleted");
    } catch (err) {
      console.log(err, "delete data");
    }
    setOpenConfirmation(false); // Close confirmation dialog after deletion
  };

  // const handleDeleteUser = async (id) => {

  //   if (fromCategory) {
      
  //     try {
  //       const { data } = await axios.delete(
  //         `https://atme-quiz.onrender.com/api/contests/${id}`
  //       );
  //     } catch (err) {
  //       console.log(err, " delete data");
  //     }
  //   } else {
  //     const categoryToDelete = productDetails.find((item) => item.category === id);
  //     if (categoryToDelete && categoryToDelete.quizzes.length === 0) {
  //       toast.success("Category deleted");
  //     } else {
  //       toast.error("Category cannot be deleted");
  //     }
        
      
  //   }
  // };
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
            {
              fromCategory
                ? handleEditClick(tableMeta?.rowData[0])
                : handleEditClick(tableMeta?.rowData[1]);
            }
          }}
          sx={{ marginRight: "12px" }}
        >
          <Iconify icon={"eva:edit-fill"} />
        </IconButton>
        <div>
          {showModalEdit && !fromCategory ? (
            <AddEditCategoryForm
              show={showModalEdit}
              handleClose={handleEditClose}
              title="Edit"
              editData={productDetailsdata}
            />
          ) : (
            <AddQuiz
              show={showModalEdit}
              handleClose={handleEditClose}
              title="Edit"
              editData={productDetailsdata}
            />
          )}
        </div>
      </Tooltip>
      {/* {fromCategory &&      */}
      <Tooltip title="Delete">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            {
              fromCategory
                ? handleDeleteUser(tableMeta.rowData[0])
                : handleDeleteUser(tableMeta.rowData[1]);
            }

            // handleDeleteUser(tableMeta.rowData[1]);
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={"eva:trash-2-outline"} />
        </IconButton>
      </Tooltip>

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the entity?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* } */}
    </Box>
  );
}
