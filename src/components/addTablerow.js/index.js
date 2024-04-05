// Parent component (AddnewRowTable.js)
import { useState } from "react";
import {
  Box,
  Button,
} from "@mui/material";
import Iconify from "../iconify";
import AddEditCategoryForm from "../editAddForm";
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
      {/* <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" id="modal-title" gutterBottom>
            How many questions do you want to add?
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Number of Questions"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />
            <Button
              onClick={handleAddQuestions}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal> */}
     {showModal && <AddEditCategoryForm show={showModal} handleClose={handleCloseModal} title={"Add"} editData={null}/>}
    </Box>
  );
}