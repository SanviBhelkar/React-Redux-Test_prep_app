import React from 'react'
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Home = () => {
    const students = useSelector((state) => state);
    const dispatch = useDispatch();
    const deleteStudent = (id) => {
        dispatch({type:"DELETE_STUDENT", payload:id})
        toast.success("Student deleted successfully")
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 my-5 text-right">
                <Link to="/add" className="btn btn-dark">
                    Add Student
                </Link>
            </div>
            <div className="col-md-6 mx-auto">
                <table className='table table-hover'>
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {students.length > 0 ? (
                        students.map((students, id) => (
                            <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{students.name}</td>
                    <td>{students.email}</td>
                    <td>{students.number}</td>
                    <td>
                      <Link
                        to={`/edit/${students.id}`}
                        className="btn btn-sm btn-primary "
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => deleteStudent(students.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No students found</th>
                </tr>
              )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
    students: state,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    deleteStudent: (id) => {
      dispatch({ type: "DELETE_STUDENT", payload: id });
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);