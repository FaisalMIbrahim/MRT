import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import avatar from "../../img/avatar.png";

const FormProfile = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNo_telp] = useState("");
  const [stasiunId, setStasiunId] = useState("");
  //   const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getStasiun();
  });

  const getStasiun = async () => {
    const response = await axios.get("http://localhost:5000/stasiun");
    // console.log(response);

    setData(response.data);
  };
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/me`);
        // console.log(response);

        setNama(response.data.nama);
        setUsername(response.data.username);
        // setPassword(response.data.password);
        // setConfpassword(response.data.confPassword);
        setEmail(response.data.email);
        setNo_telp(response.data.no_telp);
        setStasiunId(response.data.stasiunId);
        // setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const navigate = useNavigate();

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:5000/profile/${id}`, {
          nama: nama,
          username: username,
          password: password,
          confPassword: confPassword,
          email: email,
          no_telp: no_telp,
          stasiunId: stasiunId,
          //   role: role,
        })
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.msg,
          });
        });
      navigate(`/profile/${id}`);
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
                  Profile User
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={updateProfile}>
        {/* <p className="has-text-centered bg-danger text-white text-center p-3" >{msg}</p> */}
        <div className="container px-4 mt-4 ">
          <div className="row ">
            <div className="col-xl-4">
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile </div>
                <div className="card-body text-center">
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    src={avatar}
                    style={{ background: "transparent", maxHeight: "15rem", maxWidth: "auto" }}
                    alt=""
                  />

                  {/* <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                  <button className="btn btn-primary" type="button">
                    Upload new image
                  </button> */}
                </div>
              </div>
            </div>
            {/* <div className="col-xl-3"></div> */}
            <div className="col-xl-6 ">
              <div className="card mb-4 shadow">
                <div className="card-header">Account Details</div>
                {Object.keys(msg).length > 0 && (
                  <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
                )}
                <div className="card-body">
                  <div className="mb-3">
                    <label className="small mb-1">Nama Lengkap</label>
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
                    <label className="small mb-1 ">Username</label>
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
                      <label className="small mb-1">Password</label>
                      <input
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label className="small mb-1">Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        value={confPassword}
                        onChange={(e) => setConfpassword(e.target.value)}
                        placeholder="********"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label className="small mb-1">Email</label>
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
                      <label className="small mb-1">No Handphone</label>
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
                    <label className="small mb-1">Station</label>

                    <select
                      className="form-select"
                      value={stasiunId}
                      onChange={(e) => setStasiunId(e.target.value)}
                      disabled
                    >
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

                  {/* <Link className="btn btn-info mr-3" to={"/remote"}>
                    Back
                  </Link> */}
                  <button className="btn btn-primary form-control" type="submit">
                    Update
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

export default FormProfile;
