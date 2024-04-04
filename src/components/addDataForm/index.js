import React from "react";
import { Container, TextField, Stack, Typography, Paper, Grid, Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useParams } from "react-router-dom";

const AddDataForm = () => {
  var { numQuestions } = useParams();

  numQuestions = +numQuestions + 1;

  console.log(numQuestions, " --=== ");

  // Function to chunk the array into arrays of size 2
  const chunkArray = (array, size) => {
    return array.reduce((chunks, element, index) => {
      if (index % size === 0) {
        chunks.push([element]);
      } else {
        chunks[chunks.length - 1].push(element);
      }
      return chunks;
    }, []);
  };

  return (
    <Container maxWidth="md" style={{ paddingRight: "24px" }}>
      {[...Array(parseInt(numQuestions))].map((_, index) => (
        <Paper key={index} elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Question {index + 1}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Enter your question"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {chunkArray([...Array(4)], 2).map((chunk, chunkIndex) => (
              <Grid container spacing={2} key={chunkIndex} style={{ paddingRight: "24px" }}>
                {chunk.map((_, ansIndex) => (
                  <Grid item xs={6} key={ansIndex}>
                    <TextField
                      label={`Answer ${chunkIndex * 2 + ansIndex + 1}`}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      InputProps={{
                        endAdornment: (
                          <RadioGroup aria-label={`Correct Answer ${chunkIndex * 2 + ansIndex + 1}`} name={`correctAnswer${index}`}>
                            <FormControlLabel value="option1" control={<Radio />} label="Correct" />
                          </RadioGroup>
                        ),
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ))}
          </Stack>
        </Paper>
      ))}
      <Stack direction="row" spacing={2} justifyContent="flex-end" style={{ marginBottom: "26px" }}>
        <Button variant="contained" color="primary">
          Submit
        </Button>
        <Button variant="contained" color="error">
          Cancel
        </Button>
        <Button variant="contained" color="info">
          Clear
        </Button>
      </Stack>
    </Container>
  );
};

export default AddDataForm;

