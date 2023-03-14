import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddUser = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNo_telp] = useState("");
  const [stasiunId, setStasiunId] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getStasiun();
  });

  const getStasiun = async () => {
    const response = await axios.get("http://localhost:5000/stasiun");
    // console.log(response);

    setData(response.data);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/users", {
          nama: nama,
          username: username,
          password: password,
          confPassword: confPassword,
          email: email,
          no_telp: no_telp,
          stasiunId: stasiunId,
          role: role,
        })
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.msg,
          });
        });

      navigate("/user");
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
                  Add User
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- DataTales Example --> */}

      <form onSubmit={saveUser} className="  mb-4 pt-4">
        {/* <p className="has-text-centered bg-danger text-white text-center p-3" >{msg}</p> */}
        <div className="container px-4 mt-4">
          <div className="row">
            {/* <div className="col-xl-4">
                        <div className="card mb-4 mb-xl-0">
                          <div className="card-header">Profile Picture</div>
                          <div className="card-body text-center">
                            <img
                              className="img-account-profile rounded-circle mb-2"
                              src="assets/img/illustrations/profiles/profile-1.png"
                              alt=""
                            />

                            <div className="small font-italic text-muted mb-4">
                              JPG or PNG no larger than 5 MB
                            </div>

                            <button className="btn btn-primary" type="button">
                              Upload new image
                            </button>
                          </div>
                        </div>
                      </div> */}
            <div className="col-xl-3"></div>
            <div className="col-xl-6 ">
              <div className="card mb-4  shadow">
                <div className="card-header">Account Details</div>
                {Object.keys(msg).length > 0 && (
                  <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
                )}
                <div className="card-body">
                  <div className="mb-3">
                    <p className="small mb-1 text-left">Nama Lengkap</p>
                    <input
                      className="form-control"
                      type="text"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Masukan Nama Lengkap"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <p className="text-left mb-1 ">Username</p>
                    <input
                      className="form-control"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Masukan Username"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <p className="text-left mb-1">Password</p>
                      <input
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <p className="text-left mb-1">Confirm Password</p>
                      <input
                        className="form-control"
                        type="password"
                        value={confPassword}
                        onChange={(e) => setConfpassword(e.target.value)}
                        placeholder="********"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <p className="text-left mb-1">Email</p>
                      <input
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@example.com"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <p className="text-left mb-1">No Handphone</p>
                      <input
                        className="form-control"
                        type="text"
                        value={no_telp}
                        onChange={(e) => setNo_telp(e.target.value)}
                        placeholder="Masukan No Handphone"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-left mb-1">Station</p>
                    <select
                      className="form-select"
                      value={stasiunId}
                      onChange={(e) => setStasiunId(e.target.value)}
                    >
                      <option selected>Pilih Stasiun : </option>
                      {/* <option selected disabled>
                                  Select a Grup:
                                </option> */}

                      {data.map((d, i) => (
                        <option value={d.id}>
                          {d.kode_stasiun} - {d.nama_stasiun}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <p className="text-left mb-1">Role</p>
                    <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>Pilih Role :</option>

                      <option value="admin">Admin</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="station_manager">Station Manager</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                  <Link className="btn btn-info text-light mr-3" to={"/user"}>
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

export default FormAddUser;
