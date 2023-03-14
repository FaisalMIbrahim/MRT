import React from "react";
import "../Dashboard.css";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import NavSid from "../Layouts/NavSid";
// import Userlist from "./Users/Userlist";

const Layouts = () => {
  return (
    <body id="page-top">
      <div id="wrapper">
        <NavSid />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="pt-5">
            <div className=" pt-5">{/* <Userlist /> */}</div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
      <div
        className="modal fade"
        id="logoutModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current session.
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">
                Cancel
              </button>
              <a className="btn btn-primary" href="login.html">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Layouts;
