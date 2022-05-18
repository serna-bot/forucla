import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.scss';
import Homepage from './Homepage';
import Posts from './Posts';
import Submit from './Submit';
import CustomizedPosts from './Posts/CustomizedPosts';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={ <App /> } /> */}
        <Route path='/' element={<Homepage />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/submit' element={<Submit />} />
        {/* <Route path="/review" element={ <Post /> } /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
