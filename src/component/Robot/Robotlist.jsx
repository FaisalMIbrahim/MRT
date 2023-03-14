import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Robotlist = () => {
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    getRobots();
  });

  const getRobots = async () => {
    const response = await axios.get("http://localhost:5000/robot");
    // console.log(response);
    setRobots(response.data);
  };
  // const deleteUser = async (userId) => {
  //   await axios.delete(`http://localhost:5000/users/${userId}`);
  //   getUsers();
  // };
  const deleteRobot = async (robotId) => {
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
      .delete(`http://localhost:5000/robot/delete/${robotId}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.msg,
        });
        // getRobots();
        console.log(getRobots());
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.msg,
          icon: "error",
        });
      });
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
                  Robot List
                </h1>
              </div>
              <div className="col-12 col-xl-auto mb-3">
                {/* <Link className="btn btn-sm btn-light text-primary " to={"/stations"}>
                  <i className="me-1" data-feather="users" />
                  Manage Station
                </Link> */}
                <Link className="btn btn-sm btn-light text-primary ml-2" to={"/robot/add"}>
                  <i className="me-1" data-feather="user-plus" />
                  Add New Robot
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
                    <th>Robot Id</th>
                    <th>Status</th>
                    <th>In Use</th>
                    <th>Station</th>
                    <th>System State</th>
                    <th>Inverter State</th>
                    <th>Emergency State</th>
                    <th>State Modified By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {robots.map((robot, index) => (
                    <tr key={robot.id}>
                      <td>{index + 1}</td>
                      <td>{robot.id_robot}</td>
                      <td className="text-center">
                        {robot.status == "Active" ? (
                          <small class="badge badge-success p-2 rounded-pill">Active</small>
                        ) : (
                          ""
                        )}
                        {robot.status == "Maintenance" ? (
                          <small class="badge badge-danger p-2 rounded-pill">Maintenance</small>
                        ) : (
                          ""
                        )}
                        {robot.status == "Inactive" ? (
                          <small class="badge badge-secondary p-2 rounded-pill">inactive</small>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="text-center">
                        {robot.in_use == "No" ? <small class="badge badge-danger p-2">NO</small> : ""}
                        {robot.in_use == "Yes" ? <small class="badge badge-success p-2">YES</small> : ""}
                      </td>
                      <td className="text-center"> {robot.station}</td>
                      <td className="text-center">
                        {robot.system_state == "Off" ? (
                          <small class="badge badge-danger p-2 ">OFF</small>
                        ) : (
                          ""
                        )}
                        {robot.system_state == "On" ? <small class="badge badge-success p-2 ">ON</small> : ""}
                      </td>
                      <td className="text-center">
                        {robot.inverter_state == "Off" ? (
                          <small class="badge badge-danger p-2 ">OFF</small>
                        ) : (
                          ""
                        )}
                        {robot.inverter_state == "On" ? (
                          <small class="badge badge-success p-2 ">ON</small>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="text-center">
                        {robot.emergency_state == "Off" ? (
                          <small class="badge badge-danger p-2 ">OFF</small>
                        ) : (
                          ""
                        )}
                        {robot.emergency_state == "On" ? (
                          <small class="badge badge-success p-2 ">ON</small>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="text-center">
                        {robot.state_modified_by == "Robot" ? (
                          <small class="badge badge-info p-2 ">Robot</small>
                        ) : (
                          ""
                        )}
                        {robot.state_modified_by == "Web" ? (
                          <small class="badge badge-success p-2 ">WEB</small>
                        ) : (
                          ""
                        )}
                      </td>

                      <td className="pl-3">
                        <Link to={`/robot/edit/${robot.id}`} className="btn text-info">
                          <BsPencilSquare />
                        </Link>
                        <Link onClick={() => deleteRobot(robot.id)} className="btn text-danger">
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

export default Robotlist;
