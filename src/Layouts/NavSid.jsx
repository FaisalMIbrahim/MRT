import React, { useEffect, useState } from "react";
import "../App.css";
import "./Navsid.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, reset } from "../features/authSlice";
import { FiCpu, FiServer, FiTarget } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";

//logo
import avatar from "../img/avatar.png";
import mrt from "../img/logo/mrt.png";
import sari from "../img/logo/sari-tr.png";
import lifetech from "../img/logo/lifetech2.png";
import gunadarma from "../img/logo/gunadarma-tr.png";
import inovasi from "../img/logo/inovasi.png";
import axios from "axios";

const NavSid = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  });
  const [style, setStyle] = useState("navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5 ");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };
  const changeStyle = () => {
    if (style == "navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5") {
      setStyle("navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5 toggled");
    } else {
      setStyle("navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5");
    }
  };
  const changeStyle1 = () => {
    if (style == "navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5") {
      setStyle("navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5 toggled1");
    } else {
      setStyle("navbar-nav  bg-gradient-white sidebar sidebar-light accordion pt-5");
    }
  };
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/me");
    // console.log(response);
    setUsers(response.data);
  };
  // const path = window.location.pathname
  return (
    <div>
      {" "}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow fixed-top">
        {/* <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button> */}
        {/*  <!-- NavSid Toggle (Topbar) --> */}

        {/* <button
          id="sidebarToggle"
          className="btn btn-link d-xl-none d-xs-block d-md-none rounded-circle mr-3"
          onClick={changeStyle1}
        >
          <i className="fa fa-bars"></i>
        </button> */}
        {/* <button
          id="sidebarToggleTop"
          className="btn btn-link  d-md-block rounded-circle mr-3"
          onClick={changeStyle1}
        >
          <i className="fa fa-bars"></i>
        </button> */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-block rounded-circle mr-3 ml-3"
          onClick={changeStyle}
        >
          <i className="fa fa-bars"></i>
        </button>
        <Link className="navbar-brand pe-3 ps-4 ps-lg-2" to={"/remote"}>
          <img
            src={mrt}
            alt="mrt-logo"
            style={{ background: "transparent", maxHeight: "30pt", maxWidth: "auto" }}
          />
        </Link>
        <h5 className="mt-5 mb-5 text-dark ">Robot Surveillance</h5>
        {/*  <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow pr-3">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small"> {user && user.nama}</span>
              <img className="img-profile rounded-circle" src={avatar} />
            </a>
            {/*  <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to={`/profile/${users.id}`}>
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </Link>

              <div className="dropdown-divider"></div>
              <button
                onClick={logout}
                className="dropdown-item"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
      <ul className={style} id="accordionSidebar ">
        {/*   <!-- Divider --> */}
        {/* <hr className="sidebar-divider my-0 pt-5" /> */}
        <br />
        <br />
        <li className=" nav-item ">
          <NavLink activeClassName="active" className="nav-link" to={"/remote"}>
            <FiServer className="mr-2" />
            <span>Remote</span>
          </NavLink>
        </li>
        {/* <li className="nav-item ">
          <NavLink activeClassName="active" className="nav-link" to={"/controll"}>
            <FiCpu className="mr-2" />
            <span>Dashboard Control</span>
          </NavLink>
        </li> */}
        {user && user.role == "super_admin" && (
          <li className="nav-item ">
            <NavLink activeClassName="active" className="nav-link" to={"/user"}>
              <BsPeople className="mr-1" />
              <span>User Management</span>
            </NavLink>
          </li>
        )}
        {user && user.role == "super_admin" && (
          <li className="nav-item pb-5">
            <NavLink activeClassName="active" className="nav-link" to={"/robot"}>
              <FiTarget className="mr-1" />
              <span>Robot Management</span>
            </NavLink>
          </li>
        )}
        {user && user.role == "admin" && (
          <li className="nav-item ">
            <NavLink activeClassName="active" className="nav-link" to={"/user"}>
              <BsPeople className="mr-1" />
              <span>User Management</span>
            </NavLink>
          </li>
        )}
        {user && user.role == "admin" && (
          <li className="nav-item pb-5">
            <NavLink activeClassName="active" className="nav-link" to={"/robot"}>
              <FiTarget className="mr-1" />
              <span>Robot Management</span>
            </NavLink>
          </li>
        )}
        {/* <!-- Divider --> */}
        {/* <hr className="sidebar-divider d-none d-md-block pb-5" /> */}
        {/*   <!-- NavSid Toggler (NavSid) --> */}
        {/*   <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div> */}
        {/*  <!-- NavSid Message --> */}
        <br />
        <br />
        <br />
        <br /> <br />
        <div className="sidenav-footer fixed-buttom">
          <div
            id="content-wrapper"
            className=" d-flex flex-column text-center position-relative top pt-4 pb-4"
          >
            <div id="content">
              <img
                src={sari}
                className="mx-1"
                alt="sari-logo"
                style={{ background: "transparent", maxHeight: "36pt", maxWidth: "auto" }}
              />
              <img
                src={lifetech}
                className="mx-1"
                alt="lifetech-logo"
                style={{ background: "transparent", maxHeight: "32pt", maxWidth: "auto" }}
              />
              <img
                src={gunadarma}
                className="mx-2"
                alt="gunadarma-logo"
                style={{ background: "transparent", maxHeight: "33pt", maxWidth: "auto" }}
              />
              <div>
                <img
                  src={inovasi}
                  className="mb-2"
                  alt="brin-logo"
                  style={{
                    background: "transparent",
                    maxHeight: "26pt",
                    maxWidth: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavSid;
