
import { useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import Iconify from "../iconify";

import AddCategoryForm from "../addCategoryForm";


export default function AddCategoryRow() {
  const [showModal, setShowModal] = useState(false);
 
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "24px",
      }}
    >
      <Button
        onClick={handleOpenModal}
        variant="contained"
        className="m-2 border border-light float-right"
        sx={{
          backgroundColor: "#343A40",
          borderRadius: "0px",
          border: "none",
        }}
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Add Category
      </Button>
     {showModal && <AddCategoryForm show={showModal} handleClose={handleCloseModal} title={"Add"} editData={null}/>}
    </Box>
  );
}