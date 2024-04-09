import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const AddDataForm = () => {
  const { numQuestions } = useParams();
  const questionCount = +numQuestions + 1;
  const scrollToRefs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [onAlert, setOnAlert] = useState(false);

  console.log(state, " = s")
  const validateForm = (values) => {
    for (let i = 0; i < questionCount; i++) {
      const question = values.questions[i];

      if (!question.question.trim() && onAlert) {
        scrollToRefs.current[i].scrollIntoView({ behavior: "smooth" });
        return false;
      }

      let correctAnswerSelected = false;
      for (let j = 0; j < 4; j++) {
        const answer = question.answers[j];
        if (!answer.answer.trim()) {
          scrollToRefs.current[i].scrollIntoView({ behavior: "smooth" });
          return false;
        }
        if (answer.selected) {
          correctAnswerSelected = true;
          break;
        }
      }
      if (!correctAnswerSelected) {
        scrollToRefs.current[i].scrollIntoView({ behavior: "smooth" });
        return false;
      }
    }
    return true;
  };
  return (
    <Container style={{ paddingRight: "24px" }}>
      <Formik
       initialValues={{
        questions: state.questionSet
          ? state.questionSet.map(question => ({
              question: question.question,
              answers: question.answerOptions.map(answerOption => ({
                answer: answerOption.answer,
                correct: answerOption.isCorrectAnswer,
                selected: false,
              })),
            }))
          : Array.from({ length: questionCount }, () => ({
              question: "",
              answers: Array.from({ length: 4 }, () => ({
                answer: "",
                correct: false,
                selected: false,
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
        validate={(values) => {
          if (!validateForm(values)) {
            return {};
          }
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setOnAlert(true);
          const arrayData = [];
          values.questions?.map((ele) => {
            console.log("inside map function");
            const obj = {
              question: ele.question,
              answerOptions: [
                {
                  option: 1,
                  answer: ele.answers[0].answer,
                  isCorrectAnswer: ele.answers[0].selected,
                },
                {
                  option: 2,
                  answer: ele.answers[1].answer,
                  isCorrectAnswer: ele.answers[1].selected,
                },
                {
                  option: 3,
                  answer: ele.answers[2].answer,
                  isCorrectAnswer: ele.answers[2].selected,
                },
                {
                  option: 4,
                  answer: ele.answers[3].answer,
                  isCorrectAnswer: ele.answers[3].selected,
                },
              ],
            };
            arrayData.push(obj);
          });
          state.questionSet.questionSet = arrayData;
          console.log(state, "state");
          try {
            const { data } = await axios.post(
              `https://atme-quiz.onrender.com/api/contests`,
              state,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            // console.log(data, "%%%%%%%%%%%% add data");
          } catch (err) {
            console.log("error", err);
          }

          toast.success("Quiz Added ");
          navigate("/");
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            {values.questions.map((question, questionIndex) => (
              <Card key={questionIndex} className="mb-3">
                <Card.Body
                  ref={(el) => (scrollToRefs.current[questionIndex] = el)}
                >
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
                            touched.questions?.[questionIndex]?.answers?.[
                              answerIndex
                            ]?.answer &&
                            errors.questions?.[questionIndex]?.answers?.[
                              answerIndex
                            ]?.answer
                          }
                        />
                        <Form.Check
                          type="radio"
                          name={`questions.${questionIndex}.correctAnswer`}
                          value={answerIndex}
                          checked={answer.selected} // Use selected property to check if the answer is selected
                          onChange={(e) => {
                            const { value } = e.target;
                            const updatedAnswers = question.answers.map(
                              (ans, idx) => ({
                                ...ans,
                                selected: idx.toString() === value, // Update selected property based on radio button selection
                              })
                            );
                            handleChange({
                              target: {
                                name: `questions.${questionIndex}.answers`,
                                value: updatedAnswers,
                              },
                            });
                          }}
                        />
                        {answer.selected && (
                          <span
                            style={{
                              color: "green",
                              marginLeft: "5px",
                              marginRight: "5px",
                            }}
                          >
                            Correct Answer{" "}
                          </span>
                        )}
                      </Form.Group>
                    ))}
                  </div>
                  {!question.answers.some((answer) => answer.selected) &&
                    onAlert && (
                      <Alert variant="danger">
                        Please select the correct answer for Question{" "}
                        {questionIndex + 1}.
                      </Alert>
                    )}
                </Card.Body>
              </Card>
            ))}
            <div className="d-flex justify-content-end mb-4">
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  navigate(-1);
                }}
                className="mx-2"
              >
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