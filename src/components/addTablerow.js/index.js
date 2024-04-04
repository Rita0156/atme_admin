// Parent component (AddnewRowTable.js)
import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import Iconify from "../iconify";
import { useNavigate } from "react-router-dom";
import AddDataForm from "../addDataForm"; // Import the AddDataForm component

export default function AddnewRowTable() {
  const [showModal, setShowModal] = useState(false);
  const [numQuestions, setNumQuestions] = useState(0);
  const [getQuestion, setGetQuestion] =  useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddQuestions = () => {
    setGetQuestion(true);
    navigate(`/question/${numQuestions}`);
    setShowModal(false);
  };

  console.log(numQuestions, " -- from the ");

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
      <Modal
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
      </Modal>
     
      {/* {getQuestion  && <AddDataForm numQuestions={numQuestions} />}{" "} */}
      {/* Render AddDataForm based on the number of questions */}
    </Box>
  );
}
