import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const EditStudent = (students, updatestudents) => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const currentStudents = students.find(
    students => students.id === parseInt(id)
  );

  useEffect(() => {
    setName(currentStudents.name);
    setEmail(currentStudents.email);
    setNumber(currentStudents.number);
  }, [currentStudents]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkStudentsEmailExists = students.filter((students) =>
      students.email === email && students.id !== currentStudents.id
        ? students
        : null
    );
    const checkStudentsNumberExists = students.filter((students) =>
      students.number === number && students.id !== currentStudents.id
        ? students
        : null
    );
    if (!email || !name || !number) {
      return toast.warning("Please provide value in each input field");
    }
    if (checkStudentsEmailExists.length > 0) {
      return toast.error("This email already exists!!");
    }
    if (checkStudentsNumberExists.length > 0) {
      return toast.error("This phone number already exists!!");
    }
    const checkEmail = students.some((students) => students.email === email);
    if (checkEmail) {
      return toast.warning("This email already exists");
    }

    const data = {
      id: currentStudents.id,
      name,
      email,
      number
    };
    dispatch({ type: "UPDATE_STUDENT", payload: data });
    updatestudents(data);
    toast.success("Student updated successfully");
    history("/");
  };
  return (
    <div>
      <h1 className="display-3 text-center">Edit Student {id}</h1>
      <div className="container shadow-lg p-5">
        <div className="row">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history("/")}
        >
          Go back
        </button>
          <div className="col-md-6 mx-auto">
          {currentStudents ? (
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
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Student   Found</h1>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updatestudents: (data) => {
    dispatch({ type: "UPDATE_STUDENT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStudent);