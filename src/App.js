import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CategoryList from "./screens/categoryList";
import QuizzesByCategory from "./screens/categoryWiseQuiz";
import SidePanel from "./components/sidebar";
import QuizList from "./screens/quizList";
import AddDataForm from "./components/addQuestionForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SidePanel />
        <div>
          
          <main className="py-3">
            <Routes>
              <Route path="/" element={<CategoryList />} />
              <Route path="/contests/:id" element={<QuizzesByCategory />} />
              <Route path="/quizlist" element={<QuizList />} />
              <Route path='/question/:numQuestions' element={<AddDataForm />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;