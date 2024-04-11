import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../../styles/form.css";

const AddCategoryForm = ({ show, handleClose, title, editData }) => {
  const navigate = useNavigate();
  const [quizData, setQuizdata] = useState([]);
  const [imgurl, setImgurl] = useState("");
  const name = useParams();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      "https://atme-quiz.onrender.com/api/contests/category/CONTEST"
    );
    setQuizdata(data);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {title ? title + " Category Form" : "Edit Form"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{
            category: editData?.name || "",
            quizImage: editData?.image || "",
            entryCoins: editData?.entryCoins || "",
          }}
          validationSchema={Yup.object().shape({
            category: Yup.string().required("Category is required"),
            entryCoins: Yup.number().required("Entry Coins is required"),
            quizImage: Yup.string().required("Category Image is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const { data } = await axios.post(
                "https://atme-quiz.onrender.com/api/contests/add/category",
                values,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  if (imgurl) {
                    values.quizImage = imgurl;
                  }
                }
              );
              navigate("/", { state: values });
              handleClose();
            } catch (err) {
              console.log("error", title, err);
            }
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="category" style={{ paddingBottom: "10px" }}>
                <Form.Label>Category</Form.Label>
                <Field
                  type="text"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.category && errors.category ? "form-control is-invalid" : "form-control"}
                />
                <ErrorMessage name="category" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group controlId="entryCoins" style={{ paddingBottom: "10px" }}>
                <Form.Label>Entry Coins</Form.Label>
                <Field
                  type="number"
                  name="entryCoins"
                  value={values.entryCoins}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.entryCoins && errors.entryCoins ? "form-control is-invalid" : "form-control"}
                />
                <ErrorMessage name="entryCoins" component="div" className="invalid-feedback" />
              </Form.Group>

              <Form.Group controlId="quizImage" style={{ paddingBottom: "10px" }}>
                <Form.Label>Category Image</Form.Label>
                <Field
                  type="file"
                  name="quizImage"
                  onChange={(e) => {
                    handleChange(e);
                    const image = e.currentTarget.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImgurl(reader.result);
                    };
                    reader.readAsDataURL(image);
                  }}
                  onBlur={handleBlur}
                  className={touched.quizImage && errors.quizImage ? "form-control is-invalid" : "form-control"}
                />
                <ErrorMessage name="quizImage" component="div" className="invalid-feedback" />
              </Form.Group>

              <Button variant="secondary" onClick={handleClose} style={{ marginRight: "18px" }}>
                Close
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {title === "Add" ? title : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddCategoryForm;
