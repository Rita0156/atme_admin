
// App.js
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserList from './components/contests/contestdata'; 
import UserEdit from './components/contests/editContest';

const dataProvider = jsonServerProvider('https://atme-quiz.onrender.com/api');

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="contests" list={UserList} edit={UserEdit} /> 
  </Admin>
);

export default App;

