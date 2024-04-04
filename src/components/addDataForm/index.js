import React, { useRef } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const AddDataForm = () => {
  const { numQuestions } = useParams();
  const questionCount = +numQuestions + 1;
  const scrollToRefs = useRef([]);
  const navigate = useNavigate();

  return (
    <Container style={{ paddingRight: "24px" }}>
      <Formik
        initialValues={{
          questions: Array.from({ length: questionCount }, () => ({
            question: "",
            answers: Array.from({ length: 4 }, () => ({
              answer: "",
              correct: false,
            })),
          })),
        }}
        validationSchema={Yup.object().shape({
          questions: Yup.array().of(
            Yup.object().shape({
              question: Yup.string().required("Question is required"),
              answers: Yup.array().of(
                Yup.object().shape({
                  answer: Yup.string().required("Answer is required"),
                })
              ),
            })
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched, resetForm }) => (
          <Form onSubmit={handleSubmit}>
            {values.questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="mb-3">
                <Card.Body ref={(el) => (scrollToRefs.current[questionIndex] = el)}>
                  <Card.Title>Question {questionIndex + 1}</Card.Title>
                  <Form.Group controlId={`questions.${questionIndex}.question`}>
                    <Form.Label>Enter your question</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your question"
                      style={{ padding: " 15px", marginBottom:"12px" }}
                      name={`questions.${questionIndex}.question`}
                      value={question.question}
                      onChange={handleChange}
                      isInvalid={touched.questions?.[questionIndex]?.question && errors.questions?.[questionIndex]?.question}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.questions?.[questionIndex]?.question}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div
                    style={{
                      display: "grid",
                      paddingLeft: "15px",
                      gridTemplateColumns: "repeat(2,1fr)",
                    }}
                  >
                    {question.answers.map((answer, answerIndex) => (
                      <Form.Group
                        controlId={`questions.${questionIndex}.answers.${answerIndex}.answer`}
                        key={answerIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "7px",
                        }}
                      >
                        <Form.Control
                          type="text"
                          placeholder={`Answer ${answerIndex + 1}`}
                          name={`questions.${questionIndex}.answers.${answerIndex}.answer`}
                          value={answer.answer}
                          onChange={handleChange}
                          style={{ width: "85%", marginRight: "10px" }}
                          isInvalid={touched.questions?.[questionIndex]?.answers?.[answerIndex]?.answer && errors.questions?.[questionIndex]?.answers?.[answerIndex]?.answer}
                        />
                        <Form.Check
                          type="radio"
                          name={`correctAnswer-${questionIndex}`}
                          value={answerIndex}
                          onChange={handleChange}
                          // checked={values.questions[questionIndex].answers[answerIndex].correct}
                        />
                      </Form.Group>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            ))}
            <div className="d-flex justify-content-end mb-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="danger" onClick={() => {
                
                  navigate(-1)
                }} className="mx-2">
                Cancel
              </Button>
              <Button variant="info" onClick={resetForm}>
                Clear
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddDataForm;
