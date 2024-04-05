import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/form.css";
const AddEditCategoryForm = ({ show, handleClose, title, editData }) => {
  const [noOfQuestion, setNumOfQuestion] = useState(0);
  const navigate = useNavigate();
  const name = useParams();
  console.log(name, "params data");
  const [formData, setFormData] = useState({
    name: editData?.name || "",
    quizImage: editData?.quizImage || "",
    prizeId: editData?.prizeId || "",
    slug: editData?.slug || "",
    entryCoins: editData?.entryCoins || "",
    winningCoins: editData?.winningCoins || "",
    startTime: editData?.startTime || "",
    endTime: editData?.endTime || "",
    questionSet: editData?.questionSet || { questionSet: [] },
    quizId: editData?.quizId || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside submit button");
    if (title == "Add" && editData == null) {
      //  try{
      //    const {data} = await axios.post(`https://atme-quiz.onrender.com/api/contests`,formData,{
      //       headers : {
      //           "Content-Type": "application/json",
      //       }
      //    })
      //    console.log(data,'%%%%%%%%%%%% add data')
      //  }
      //  catch(err){
      //   console.log('error', title, err)
      //  }

      navigate(`/question/${noOfQuestion}`, { state: formData });
      handleClose();
    } else {
      try {
        const { data } = await axios.put(
          `https://atme-quiz.onrender.com/api/contests/${editData.id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data, "update data");
      } catch (err) {
        console.log("error", title, err);
      }
    }

    console.log(formData, "form data^^^^^^^^^^^^^^^^^^");
    handleClose();
  };

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{title ? title + " Form" : "Edit Form"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Select>
                <option value="">Choose...</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="quizImage">
              <Form.Label>Quiz Image URL</Form.Label>
              <Form.Control
                type="text"
                name="quizImage"
                value={formData.quizImage}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="entryCoins">
              <Form.Label>Entry Coins</Form.Label>
              <Form.Control
                type="number"
                name="entryCoins"
                value={formData.entryCoins}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="winningCoins">
              <Form.Label>Winning Coins</Form.Label>
              <Form.Control
                type="number"
                name="winningCoins"
                value={formData.winningCoins}
                onChange={handleChange}
              />
            </Form.Group>

            {title == "Add" && (
              <Form.Group>
                <Form.Label>How many questions do you want to add?</Form.Label>
                <Form.Control
                  type="number"
                  value={noOfQuestion}
                  onChange={(e) => setNumOfQuestion(e.target.value)}
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {title == "Add" ? title : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export default AddEditCategoryForm;
