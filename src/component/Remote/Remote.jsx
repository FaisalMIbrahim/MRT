import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Remote = () => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [robot, setRobot] = useState([]);
  const [in_use, setIn_use] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getRobots = async () => {
    const response = await axios.get("http://localhost:5000/robot");
    // console.log(response);
    setRobot(response.data);
  };

  useEffect(() => {
    getRobots();
  }, [id]);
  const handleClick = (id, inuse) => {
    console.log('id', id);
    axios
      .patch(`http://localhost:5000/robot/inuse/${id}`)
      .then((response) => {
        console.log('response', response);
        setIn_use(response.data.in_use);
        // navigate('/controll');
        navigate(`/controll/${id}`);
      })
      .catch((error) => console.log(error.msg));
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
                  Robot List
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container-xl px-4 mt-4">
        <div className="row">
          {robot.map((robots, index) => (
            <div key={robots.id} className="col-sm-6 col-md-4 col-xl-3 mb-4">
              <div className="card mb-4 shadow">
                <div className="card-body">
                  <img
                    className="img-fluid bg-image hover-zoom"
                    src="./assets/img/logo/marti-3.png"
                    alt="..."
                  />

                  <div className="text-center small">{robots.id_robot}</div>
                  <div className="text-center">
                    {robots.status === "Active" ? (
                      robots.in_use === "Yes" ? (
                        <a
                          // href="/controll"
                          onClick={() => handleClick(robots.id)}
                          className={`btn ${buttonClicked ? "btn-success" : "btn-danger disabled"}`}
                        >
                          Remote
                        </a>
                      ) : robots.in_use === "No" ? (
                        <a
                          // href="/controll"
                          onClick={() => handleClick(robots.id)}
                          className={`btn ${buttonClicked ? "btn-danger disabled" : "btn-success"}`}
                        >
                          Remote
                        </a>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {robots.status === "Maintenance" ? (
                      <Link
                        // activeClassName="disabled"

                        onClick={() => setButtonClicked(true)}
                        className="btn btn-danger disabled"
                        // to={"/controll"}
                        // onclick="window.location.href='dashboard-control.html'"
                      >
                        Maintenance
                      </Link>
                    ) : (
                      ""
                    )}
                    {robots.status === "Inactive" ? (
                      <Link
                        // activeClassName="disabled"

                        onClick={() => setButtonClicked(true)}
                        className="btn btn-secondary disabled"
                        to={"/controll"}
                        // onclick="window.location.href='dashboard-control.html'"
                      >
                        Remote
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Remote;
