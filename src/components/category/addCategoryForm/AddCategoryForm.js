import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/form.css";

const AddCategoryForm = ({ show, handleClose, title, editData }) => {
  const [noOfQuestion, setNumOfQuestion] = useState(0);

  const navigate = useNavigate();
  const [quizData, setQuizdata] = useState([]);
  const [quizImage, setQuizImage] = useState();
  const [imgurl, setImgurl] = useState("");
  const name = useParams();


  const [formData, setFormData] = useState({
    category: editData?.name || "",
    quizImage: editData?.image || "",
    entryCoins: editData?.entryCoins || "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData, "yyyyyyyyyyyyyyyyyyyyyy")
  console.log(imgurl, " ggggggggggggggggggggggggggggggggggggggggggggg")

  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/category/CONTEST"
    );
    setQuizdata(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === "Add" && editData == null) {
      try {
        const { data } = await axios.post(
          `https://atme-quiz.onrender.com/api/contests/add/category`,
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
      navigate(`/`, { state: formData });
      handleClose();
    } 
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {title ? title + " Category Form" : "Edit Form"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="category" style={{ paddingBottom: "10px" }}>
            <Form.Label>category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="entryCoins" style={{ paddingBottom: "10px" }}>
            <Form.Label>Entry Coins</Form.Label>
            <Form.Control
              type="number"
              name="entryCoins"
              value={formData?.entryCoins}
              onChange={(e) => {
        
                setFormData({
                  ...formData,
                 entryCoins:e.target.value,
                });
              }}
            />
          </Form.Group>

          <Form.Group controlId="quizImage" style={{ paddingBottom: "10px" }}>
            <Form.Label>Category Image</Form.Label>
            <Form.Control
              type="file"
              // id="categoryImage"
              name="quizImage"
              className="form-control-file"
              onChange={(e) => {
                const image = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                  setImgurl(reader.result); // This will set imgurl to a data URL
                };
                setFormData({
                  ...formData,
                  quizImage: imgurl,
                });
              }}
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

export default AddCategoryForm;
