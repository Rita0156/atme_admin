import React, { useRef } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const AddDataForm = () => {
  const { numQuestions } = useParams();
  const questionCount = +numQuestions + 1;
  const scrollToRefs = useRef([]);

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
          let scrollToIndex = null;
          const formErrors = {};

          values.questions.forEach((question, questionIndex) => {
            if (!question.question) {
              formErrors[`questions.${questionIndex}.question`] = "Question is required";
              if (scrollToIndex === null) scrollToIndex = questionIndex;
            }
            question.answers.forEach((answer, answerIndex) => {
              if (!answer.answer) {
                formErrors[`questions.${questionIndex}.answers.${answerIndex}.answer`] =
                  "Answer is required";
                if (scrollToIndex === null) scrollToIndex = questionIndex;
              }
            });
          });

          if (scrollToIndex !== null && scrollToRefs.current[scrollToIndex]) {
            scrollToRefs.current[scrollToIndex].scrollIntoView({
              behavior: "smooth",
            });
          }

          if (Object.keys(formErrors).length !== 0) {
            setSubmitting(false);
            return;
          }

          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
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
                      style={{ padding: " 15px", marginBottom: "12px" }}
                      name={`questions.${questionIndex}.question`}
                      value={question.question}
                      onChange={handleChange}
                      isInvalid={
                        touched.questions?.[questionIndex]?.question &&
                        errors.questions?.[questionIndex]?.question
                      }
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
                          isInvalid={
                            touched.questions?.[questionIndex]?.answers?.[answerIndex]
                              ?.answer &&
                            errors.questions?.[questionIndex]?.answers?.[answerIndex]
                              ?.answer
                          }
                        />
                        <Form.Check
                          type="radio"
                          name={`correctAnswer-${questionIndex}`}
                          value={answerIndex}
                          onChange={handleChange}
                          checked={values.questions[questionIndex].answers[answerIndex].correct}
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
              <Button variant="danger" className="mx-2">
                Cancel
              </Button>
              <Button variant="info">Clear</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddDataForm;
