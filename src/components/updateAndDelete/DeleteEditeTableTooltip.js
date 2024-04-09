import { useState } from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
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

      // console.log(productDetailsdata, " dfffffffffffffffffffffffffffff ");
    }
    setShowEditForm(true);
  };
  const handleEditClose = () => {
    setShowEditForm(false);
  };
  const handleDeleteUser = async (id) => {
    if (fromCategory) {
      try {
        const { data } = await axios.delete(
          `https://atme-quiz.onrender.com/api/contests/${id}`
        );
      } catch (err) {
        console.log(err, " delete data");
      }
    } else {
      for (let i = 0; i < productDetails?.length; i++) {
        if (productDetails[i]?.category === id) {
          setProductDetailsdata(productDetails[i]);
          // console.log(productDetailsdata?.quizzes?.length, " dfffffffffffffffffffffffffffff ")

          if (productDetailsdata?.quizzes?.length === 0) {
            toast("Category deleted ");
          } else {
            toast("Category cannot be deleted ");
          }
        }
      }
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
      {/* } */}
    </Box>
  );
}
