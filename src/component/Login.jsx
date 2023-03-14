import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice.js";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/remote");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ username, password }));
  };
  return (
    <div className="bg-gradient-primary pb-5">
      <div className="container pb-5 pt-3">
        {/* Outer Row */}

        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card  border-0 shadow-lg my-5">
              <div className="card-body p-0 ">
                <div className="card-header d-flex">
                  <h3 className="fw-light my-4 pr-5 mr-5 pl-sm-4 pl-3">Login</h3>
                  <img
                    src="assets/img/logo/mrt.png"
                    className="mt-2 justify-content-right pl-sm-5 ml-lg-3 ml-5"
                    alt="mrt-logo"
                    style={{
                      background: "transparent",
                      maxHeight: "38pt",
                      maxWidth: "auto",
                      justifyContent: "end",
                    }}
                  />
                </div>

                {/* Nested Row within Card Body */}

                {/* <div className="col-lg-6 d-none d-lg-block bg-login-image" /> */}

                <div className="p-5">
                  <form onSubmit={Auth}>
                    {isError && (
                      <p className="alert alert-danger rounded text-center p-2 shadow ">{message}</p>
                    )}
                    <div className="form-group">
                      <label htmlFor="">Username</label>
                      <input
                        type="text"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Masukan Usename.."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Password</label>
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                        <label className="custom-control-label" htmlFor="customCheck">
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-user btn-block">
                      {isLoading ? "Loading.." : "Login"}
                    </button>
                  </form>
                  <hr />
                  {/* <div className="text-center">
                    <a className="small" href="forgot-password.html">
                      Forgot Password?
                    </a>
                  </div> */}
                  <div className="text-center">
                    <Link className="small text-decoration-none" to={"/register"}>
                      Need an account? Sign up!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-admin mt-auto footer-dark text-center">
        <div className="container-xl pr-5">
          <div className="row text-light">
            <div className="col-md-5 small">Copyright &copy; SARI Teknologi 2022</div>
            <div className="col-md-6 text-md-end small">
              <Link to={"#"} className="text-light  text-decoration-none">
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

export default Login;
