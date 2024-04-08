import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../../styles/form.css";

const AddQuiz = ({ show, handleClose, title, editData, fromSidebar }) => {
  const [noOfQuestion, setNumOfQuestion] = useState(0);
  const navigate = useNavigate();
  const [quizData, setQuizdata] = useState([]);
  const name = useParams();

  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/all/category"
    );
    setQuizdata(data);
  };

  // console.log(quizData, ' 000000000000000000000000000000000000000000000000000000000 ')
  useEffect(() => {
    getData();
  }, []);

  const [formData, setFormData] = useState({
    name: editData?.name || "",
    quizImage: editData?.quizImage || "",
    entryCoins: editData?.entryCoins || "",
    winningCoins: editData?.winningCoins || "",
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

  // console.log(editData, ' --------------------- ')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "Add" && editData == null) {
      navigate(`/question/${noOfQuestion}`, { state: formData });
      handleClose();
    } else {
      try {
        const { data } = await axios.put(
          `https://atme-quiz.onrender.com/api/contests`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log(data, "update data");
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

          <Form.Group
            controlId="categoryName"
            style={{ paddingBottom: "10px" }}
          >
            <Form.Label>Category Name</Form.Label>
            {fromSidebar ? (
              <>
                <Form.Select onChange={handleChange} name="categoryName">
                  <option value="">Choose...</option>
                  {quizData?.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.category}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>

                {formData.categoryName === "Other" && (
                  <Form.Control
                    type="text"
                    placeholder="Enter new category name"
                    value={formData.otherCategoryName}
                    onChange={handleChange}
                    name="otherCategoryName"
                    style={{ marginTop: "10px" }}
                  />
                )}
              </>
            ) : (
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            )}
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

          <Form.Group style={{ paddingBottom: "10px" }}>
            <Form.Label>How many questions do you want to add?</Form.Label>
            <Form.Control
              type="number"
              value={noOfQuestion}
              onChange={(e) => setNumOfQuestion(e.target.value)}
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

export default AddQuiz;
