import React, { useEffect } from "react";
import Footer from "../../Layouts/Footer";
import NavSid from "../../Layouts/NavSid";
import FormEditUser from "../../component/User/FormEditUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice";
import Swal from "sweetalert2";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        text: "Mohon Login ke Akun Anda!",
        icon: "info",
      });
      navigate("/");
    }
    if(user.role != 'admin' && user.role != 'super_admin')
    {
      navigate("/remote");
    
    }
  }, [isError, user, navigate]);

  return (
    <body id="page-top">
      <div id="wrapper">
        <NavSid />

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content" className="pt-5">
            <div className=" pt-5">
              <FormEditUser />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </body>
  );
};

export default EditUser;
