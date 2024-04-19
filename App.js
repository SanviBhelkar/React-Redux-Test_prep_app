import React from "react";
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import { Routes, Route  } from "react-router-dom";
import Home from './components/Home';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';

const App = () => {
  return (
    <div className="App">
      <ToastContainer/>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddStudent/>} />
        <Route path='/edit/:id' element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;