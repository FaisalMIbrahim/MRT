import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="sticky-footer ">
        <div className="container my-auto">
          <div className="row text-center pr-lg-5">
            <div className="col-md-5 small pr-lg-5 text-secondary">Copyright &copy; SARI Teknologi 2022</div>
            <div className="col-md-6 text-md-end small">
              <Link to={"#"} className="text-secondary text-decoration-none">
                Privacy Policy
              </Link>
              &middot;
              <Link to={"#"} className="text-secondary text-decoration-none">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
