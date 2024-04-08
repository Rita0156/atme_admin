import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/form.css";

const AddEditCategoryForm = ({ show, handleClose, title, editData }) => {
  const [noOfQuestion, setNumOfQuestion] = useState(0);
  const navigate = useNavigate();
  const name = useParams();

  console.log(name, "  params data - ooo - ");

  const [formData, setFormData] = useState({
    name: editData?.category || '',
    quizImage: editData?.quizImage || "",
    entryCoins: editData?.entryCoins || "",
    Time: 60,
  });

  // console.log(title, " ffffffffffffffffffffffffffffffffffffff")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(editData?.category," ddddddddddddddddddddddddddddd")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "Add" && editData == null) {
      navigate(`/question/${noOfQuestion}`, { state: formData });
      handleClose();
    } else {
      try {
      
        
        const { data } = await axios.patch(
          `https://atme-quiz.onrender.com/api/contests/${editData?.category}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        console.log("error", title, err);
      }
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title ? title + " Form" : "Edit Form"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="name" style={{ paddingBottom: "10px" }}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="entryCoins" style={{ paddingBottom: "10px" }}>
            <Form.Label>Entry Coins</Form.Label>
            <Form.Control
              type="number"
              name="entryCoins"
              value={formData.entryCoins}
              onChange={handleChange}
            />
          </Form.Group>
         
        </Form>

        <Button
          variant="secondary"
          onClick={handleClose}
          style={{ marginRight: "18px" }}
        >
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {title === "Add" ? title : "Submit"}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditCategoryForm;
