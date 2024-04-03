
// App.js
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserList from './components/contests/contestdata'; 
import UserEdit from './components/contests/editContest';
import './App.css'
import Category from './components/quizzes/editQuestion';
import CategoryEdit from './components/quizzes/questionList';

const dataProvider = jsonServerProvider('https://atme-quiz.onrender.com/api/contests/category');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="CONTEST" options={{ label: "category" }} list={UserList} edit={UserEdit} /> 
    <Resource name="category/name" options={{ label: "contests" }} list={Category} edit={CategoryEdit} /> 
  </Admin>
);

export default App;

