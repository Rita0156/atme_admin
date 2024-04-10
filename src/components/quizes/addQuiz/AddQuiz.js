import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../../../styles/form.css";

const AddQuizSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category Name is required"),
  entryCoins: Yup.number().required("Entry Coins is required"),
});

const AddQuiz = ({ show, handleClose, title, editData, fromSidebar }) => {
  const [quizData, setQuizdata] = useState([]);
  const name = useParams();
  const [edit, setEdit] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const quizDataString = localStorage.getItem("quizData");

    if (quizDataString) {
      const qData = JSON.parse(quizDataString);
      setQuizdata(qData);
    } else {
      console.log("No quiz data found in localStorage");
    }
  }, []);

  // console.log(edit, " d");
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title ? title + " Form" : "Edit Form"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={{
            name: editData?.name || "",
            category: name?.id || "",
            entryCoins: editData?.entryCoins || "",
            questionSet: editData?.questionSet || "",
            editQuestionSet: edit,
            id: editData?.id || "",
          }}
          validationSchema={title === "Add" ? AddQuizSchema : ""}
          onSubmit={async (values, { setSubmitting }) => {
            // console.log(values, /" w ");
            if (title === "Add") {
              navigate(`/question/${values.noOfQuestion}`, {
                state: values,
              });
            } else {
              if (edit) {
                navigate(`/question/${editData?.questionSet?.length}`, {
                  state: values,
                });
              } else {
                try {
                  await axios.put(
                    `https://atme-quiz.onrender.com/api/contests/${editData?.id}`,
                    values
                  );
                } catch (err) {
                  console.log(err, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                }
              }

              handleClose();
              setSubmitting(false);
            }
            handleClose();
            setSubmitting(false);
          }}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" style={{ paddingBottom: "10px" }}>
                <Form.Label>Name</Form.Label>
                <Field type="text" name="name" as={Form.Control} />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>

              <Form.Group
                controlId="category"
                style={{ paddingBottom: "10px" }}
              >
                <Form.Label>Category Name</Form.Label>
                {fromSidebar ? (
                  <>
                    <Field
                      as="select"
                      name="category"
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Choose...</option>
                      {quizData?.map((item, index) => (
                        <option key={index} value={item.name}>
                          {item.category}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </Field>

                    {values.category === "Other" && (
                      <Field
                        type="text"
                        placeholder="Enter new category name"
                        value={values?.otherCategoryName}
                        onChange={handleChange}
                        name="otherCategoryName"
                        style={{ marginTop: "10px" }}
                        className="form-control"
                      />
                    )}
                  </>
                ) : (
                  <Field
                    type="text"
                    name="category"
                    as={Form.Control}
                    onChange={handleChange}
                    className="form-control"
                  />
                )}
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-danger"
                />
              </Form.Group>
              {title === "Add" ? (
                <>
                  <Form.Group
                    controlId="entryCoins"
                    style={{ paddingBottom: "10px" }}
                  >
                    <Form.Label>Entry Coins</Form.Label>
                    <Field type="number" name="entryCoins" as={Form.Control} />
                    <ErrorMessage
                      name="entryCoins"
                      component="div"
                      className="text-danger"
                    />
                  </Form.Group>

                  <Form.Group style={{ paddingBottom: "10px" }}>
                    <Form.Label>
                      How many questions do you want to add?
                    </Form.Label>
                    <Field
                      type="number"
                      name="noOfQuestion"
                      as={Form.Control}
                    />
                  </Form.Group>
                </>
              ) : (
                <Form.Group style={{ paddingBottom: "10px" }}>
                  <Form.Label>Do you want to edit the question set?</Form.Label>
                  <Form.Check
                    inline
                    type="checkbox"
                    id="editQuestionSet"
                    checked={edit}
                    onChange={(e) => setEdit(e.target.checked)}
                  />
                </Form.Group>
              )}

              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ marginRight: "18px" }}
              >
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

export default AddQuiz;
