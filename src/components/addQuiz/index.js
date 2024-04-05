import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/form.css";

const AddQuiz = ({ show, handleClose, title, editData }) => {
  const [noOfQuestion, setNumOfQuestion] = useState(0);
  const navigate = useNavigate();
  const [quizData, setQuizdata] = useState([]);
  const [returnReason, setReturnReason] = useState("");
  const [returnDetails, setReturnDetails] = useState("");
  const [returnOptions, setReturnOptions] = useState("");
  const name = useParams();

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

  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/category/CONTEST"
    );
    setQuizdata(data);
    console.log(quizData, " =========================== ");
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate(`/question/${noOfQuestion}`, { state: formData });
    if (title === "Add" && editData == null) {
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
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Quiz</Modal.Title>
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
            <Form.Select onChange={handleChange} name="categoryName">
              <option value="">Choose...</option>
              {quizData?.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
              <option value="Other">Other</option>
            </Form.Select>
     
            {formData.categoryName === "Other" && (
              <Form.Control
                type="text"
                placeholder="Enter new category name"
                value={formData.otherCategoryName} // Use formData to keep track of the value
                onChange={handleChange} // Update the value in the state
                name="otherCategoryName" // Add a name to identify this field in handleChange
                style={{ marginTop: "10px" }} // Adjust styling as needed
              />
            )}
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

          <Form.Group controlId="entryCoins" style={{ paddingBottom: "10px" }}>
            <Form.Label>Entry Coins</Form.Label>
            <Form.Control
              type="number"
              name="entryCoins"
              value={formData.entryCoins}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group
            controlId="winningCoins"
            style={{ paddingBottom: "10px" }}
          >
            <Form.Label>Winning Coins</Form.Label>
            <Form.Control
              type="number"
              name="winningCoins"
              value={formData.winningCoins}
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
