// Parent component (AddnewRowTable.js)
import { useState } from "react";
import { Box, Button } from "@mui/material";
import Iconify from "../../iconify";
import AddQuiz from "../../quizes/addQuiz/AddQuiz";

export default function AddnewRowTable() {
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
        Add Quiz
      </Button>

      {showModal && (
        <AddQuiz
          show={showModal}
          handleClose={handleCloseModal}
          title={"Add"}
          editData={null}
        />
      )}
    </Box>
  );
}
