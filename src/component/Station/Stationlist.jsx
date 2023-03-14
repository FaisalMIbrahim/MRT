import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Stationlist = () => {
  const [stations, setStations] = useState("");

  useEffect(() => {
    getstations();
  });
  const getstations = async () => {
    const response = await axios.get("http://localhost:5000/stasiun");
    // console.log(response);
    setStations(response.data);
  };

  const deleteStasiun = async (stationsId) => {
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
      .delete(`http://localhost:5000/stasiun/delete/${stationsId}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.msg,
        });
        getstations();
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
                  Station List
                </h1>
              </div>
              <div className="col-12 col-xl-auto mb-3">
                <Link className="btn btn-sm btn-light text-primary " to={"/user"}>
                  <i className="me-1" data-feather="users" />
                  Manage Users
                </Link>
                <Link className="btn btn-sm btn-light text-primary ml-2" to={"/stations/add"}>
                  <i className="me-1" data-feather="user-plus" />
                  Add New Stations
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
                  <tr>
                    <th>No</th>
                    <th>Kode Stasiun</th>
                    <th>Nama Stasiun</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stations &&
                    stations.map((stasiun, index) => (
                      <tr key={stasiun.id}>
                        <td>{index + 1}</td>
                        <td>{stasiun.kode_stasiun}</td>
                        <td>{stasiun.nama_stasiun}</td>
                        {/* <td>{stasiun.createdAt}</td> */}
                        <td>
                          <Link to={`/stations/edit/${stasiun.id}`} className="btn text-info">
                            <BsPencilSquare />
                          </Link>

                          <Link onClick={() => deleteStasiun(stasiun.id)} className="btn text-danger">
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

export default Stationlist;
