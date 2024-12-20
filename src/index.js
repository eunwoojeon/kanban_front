import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import KanbanBoard from './pages/KanbanBoard';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const root = ReactDOM.createRoot(document.getElementById('wrap'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/kanban' element={<KanbanBoard />} />
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
