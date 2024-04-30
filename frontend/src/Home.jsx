import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/student/` + id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-primary ">
      <div className="w-50  bg-white  rounded p-3">
        <Link to="/create" className="btn btn-success ms-2">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <Link
                    to={`update/${user.ID}`}
                    className="btn btn-primary me-2"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => deleteUser(user.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
