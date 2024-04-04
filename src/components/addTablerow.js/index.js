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
import { DatePicker, TimePicker } from "@mui/lab";

export default function AddnewRowTable() {
  const [showModal, setShowModal] = useState(false);
  const [numQuestions, setNumQuestions] = useState(0);
  const [getQuestion, setGetQuestion] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    quizImage: "",
    prizeId: "",
    slug: "",
    entryCoins: "",
    winningCoins: "",
    startTime: "",
    endTime: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Quiz Image URL"
              type="text"
              name="quizImage"
              value={formData.quizImage}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Prize ID"
              type="text"
              name="prizeId"
              value={formData.prizeId}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Slug"
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Entry Coins"
              type="number"
              name="entryCoins"
              value={formData.entryCoins}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Winning Coins"
              type="number"
              name="winningCoins"
              value={formData.winningCoins}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Number of Questions"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
              fullWidth
              InputProps={{ inputProps: { min: 1 } }}
            />

            {/* <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={(newValue) =>
                setFormData({ ...formData, startDate: newValue })
              }
              renderInput={(params) => <TextField {...params} />}
              fullWidth
            />

            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={(newValue) =>
                setFormData({ ...formData, endDate: newValue })
              }
              renderInput={(params) => <TextField {...params} />}
              fullWidth
            /> */}


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
    </Box>
  );
}
