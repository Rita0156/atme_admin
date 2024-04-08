import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CategoryList from "./screens/categoryList/CategoryList";
import QuizzesByCategory from "./screens/categoryWiseQuiz/QuizzesByCategory";
import SidePanel from "./components/sidebar";
import QuizList from "./screens/quizList/QuizList";
import AddDataForm from "./components/quizes/addQuestionForm/AddDataForm";
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
       
          <main className="py-3">
            {/* <SidePanel /> */}
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/contests/:id" element={<QuizzesByCategory />} />
              <Route path="/quizlist" element={<QuizList />} />
              <Route path="/question/:numQuestions" element={<AddDataForm />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
