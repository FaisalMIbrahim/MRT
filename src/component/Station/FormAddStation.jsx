import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddStation = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [kode_stasiun, setKodestasiun] = useState([]);
  const [nama_stasiun, setNamastasiun] = useState([]);

  const saveStasiun = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/stasiun", {
          kode_stasiun: kode_stasiun,
          nama_stasiun: nama_stasiun,
        })
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.msg,
          });
        });

      navigate("/stations");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        Swal.fire({
          text: error.data.msg,
          icon: "error",
        });
      }
    }
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
                  Add Stations
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- DataTales Example --> */}

      <form onSubmit={saveStasiun}>
        {/* <p className="has-text-centered bg-danger text-white text-center p-3" >{msg}</p> */}
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-3"></div>
            <div className="col-xl-5">
              <div className="card mb-4 shadow">
                <div className="card-header">Stations Details</div>
                {Object.keys(msg).length > 0 && (
                  <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
                )}
                <div className="card-body">
                  <div className="mb-3">
                    <label className="small mb-1">Kode Stasiun</label>
                    <input
                      className="form-control"
                      type="text"
                      value={kode_stasiun}
                      onChange={(e) => setKodestasiun(e.target.value)}
                      placeholder="Masukan Kode Stasiun"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Nama Stasiun</label>
                    <input
                      className="form-control"
                      type="text"
                      value={nama_stasiun}
                      onChange={(e) => setNamastasiun(e.target.value)}
                      placeholder="Masukan Nama Stasiun"
                      required
                    />
                  </div>

                  <Link className="btn btn-info text-light mr-3" to={"/stations"}>
                    Back
                  </Link>
                  <button className="btn btn-primary" type="submit">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormAddStation;
