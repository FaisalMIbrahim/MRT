import React, { useState, useEffect } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

import axios from "axios";
import Swal from "sweetalert2";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  });
  const deleteUser = async (userId) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.msg,
        });
        getUsers();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.msg,
          icon: "error",
        });
      });
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    // console.log(response);
    setUsers(response.data);
  };
  return (
    <div>
      <header className="sticky-footer bg-white rounded">
        <div className="container my-auto">
          <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
              <div className="col-auto mb-3">
                <h1 className="page-header-title">
                  <div className="page-header-icon">
                    <i data-feather="user" />
                  </div>
                  Users List
                </h1>
              </div>
              <div className="col-12 col-xl-auto mb-3">
                <Link className="btn btn-sm btn-light text-primary " to={"/stations"}>
                  <i className="me-1" data-feather="users" />
                  Manage Station
                </Link>
                <Link className="btn btn-sm btn-light text-primary ml-2" to={"/user/add"}>
                  <i className="me-1" data-feather="user-plus" />
                  Add New User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-fluid pt-3 p-4">
        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4 pt-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr className="text-center">
                    <th>No</th>
                    <th>User</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>No Handphone</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id} className="text-center">
                      <td>{index + 1}</td>
                      <td>{user.nama}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.no_telp}</td>
                      <td className="text-center">
                        {user.role === "super_admin" ? (
                          <Badge bg="primary rounded-pill">Super Admin</Badge>
                        ) : (
                          ""
                        )}
                        {user.role === "admin" ? <Badge bg="info rounded-pill">Admin</Badge> : ""}
                        {user.role === "supervisor" ? (
                          <Badge bg="secondary rounded-pill">Supervisor</Badge>
                        ) : (
                          ""
                        )}
                        {user.role === "station_manager" ? (
                          <Badge bg="success rounded-pill">Station Manager</Badge>
                        ) : (
                          ""
                        )}
                        {user.role === "user" ? <Badge bg="warning rounded-pill">User</Badge> : ""}
                      </td>
                      <td className=" ">
                        <Link to={`/user/edit/${user.id}`} className="btn text-info">
                          <BsPencilSquare />
                        </Link>
                        <Link onClick={() => deleteUser(user.id)} className="btn text-danger">
                          <BsTrash />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
