import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import Swal from "sweetalert2";
const Register = () => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [email, setEmail] = useState("");
  const [no_telp, setNo_telp] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const saveRegister = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:5000/register", {
          nama: nama,
          username: username,
          password: password,
          confPassword: confPassword,
          email: email,
          no_telp: no_telp,
        })
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.msg,
          });
        });

      navigate("/");
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
    <div className="bg-gradient-primary pb-5">
      <div className="container pb-5 pt-3">
        {/* Outer Row */}

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card  border-0 shadow-lg my-5">
              <div className="card-body p-0 ">
                <div className="card-header text-center">
                  <h3 className="fw-light my-4 ">Create Account</h3>
                </div>

                {/* Nested Row within Card Body */}

                {/* <div className="col-lg-6 d-none d-lg-block bg-login-image" /> */}

                <div className="p-5">
                  <form onSubmit={saveRegister}>
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

                      <button className="btn btn-primary form-control" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  <hr />

                  <div className="text-center">
                    <Link className="small text-decoration-none" to={"/"}>
                      Have an account? Go to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-admin mt-auto footer-dark text-center">
        <div className="container-xl px-4">
          <div className="row text-light">
            <div className="col-md-4 small">Copyright &copy; SARI Teknologi 2022</div>
            <div className="col-md-7 text-md-end small">
              <Link to={"#"} className="text-light text-decoration-none">
                Privacy Policy
              </Link>
              &middot;
              <Link to={"#"} className="text-light text-decoration-none">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {/* Custom scripts for all pages*/}
    </div>
  );
};

export default Register;
