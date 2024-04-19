import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const students = useSelector((state) => state);
  const dispatch = useDispatch();

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !name || !number) {
      return toast.warning("Please provide value in each input field");
    }
    const checkEmail = students.find((students) => students.email === email);
    if (checkEmail) {
      return toast.warning("This email already exists");
    }

    const data = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      email,
      number
    };

    dispatch({ type: "ADD_STUDENT", payload: data });
    toast.success("Student added successfully");
    history("/");
  };

  return (
    <div>
      <h1 className="display-3 text-center">Add Student</h1>
      <div className="container shadow-lg p-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className='form-group mb-3'>
                <input type="text" placeholder='Name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='form-group mb-3'>
                <input type="email" placeholder='Email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group mb-3'>
                <input type="tel" placeholder='Phone Number' className='form-control' value={number} onChange={(e) => setNumber(e.target.value)} />
              </div>
              <div className='form-group text-center'>
                <input type="submit" value="Add Student" className='btn btn-block btn-dark' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
