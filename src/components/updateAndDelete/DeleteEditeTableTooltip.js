import { useState } from "react";

import { Box, Tooltip, IconButton } from "@mui/material";
// import {useDispatch} from 'react-redux'
import Iconify from "../iconify";
import AddEditCategoryForm from "../category/editForm/EditCategoryForm";
import axios from "axios";

export default function DeleteEditeTableTooltip({
  productDetails,
  tableMeta,
  compoData,
}) {
  //  const dispatch = useDispatch()
  const [showModalEdit, setShowEditForm] = useState(false);
  const [productDetailsdata, setProductDetailsdata] = useState({});

  // console.log("  from the update and ddelete form ", productDetails);

  // console.log(tableMeta?.rowData[1], " 0000000000000000000000000000 ");

  // console.log("  from the dlkckdcnffffffffff ", productDetails[0]?.category);

  const handleEditClick = (id) => {
    // console.log(id, "ed  it id btn clicked");
    for (let i = 0; i < productDetails?.length; i++) {
      if (productDetails[i]?.category === id) {
        setProductDetailsdata(productDetails[i]);
      }
    }
    setShowEditForm(true);
  };

  // console.log(
  //   "  from the update and kkkkkkkkkkkkkkkkkkkkkkkkk ddelete form  part 2 ",
  //   productDetailsdata
  // );

  const handleEditClose = () => {
    setShowEditForm(false);
  };

  const handleDeleteUser = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://atme-quiz.onrender.com/api/contests/${id}`
      );
      // console.log(data, "%%%%%%%%%%%% delete data");
    } catch (err) {
      console.log(err, "%%%%%%%%%%%% delete data");
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
            handleEditClick(tableMeta?.rowData[1]);
          }}
          sx={{ marginRight: "12px" }}
        >
          <Iconify icon={"eva:edit-fill"} />
        </IconButton>

        <div>
          {showModalEdit && (
            <AddEditCategoryForm
              show={showModalEdit}
              handleClose={handleEditClose}
              title="Edit"
              editData={productDetailsdata}
            />
          )}
        </div>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(tableMeta.rowData[1]);
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={"eva:trash-2-outline"} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
