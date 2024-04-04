import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';
import CategoryList from './screens/categoryList';
import QuizzesByCategory from './screens/categoryWiseQuiz';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
           <Routes>
             <Route path='/' element={<CategoryList/>}/>
             <Route path='/contests/:id' element ={<QuizzesByCategory/>} />
           </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
