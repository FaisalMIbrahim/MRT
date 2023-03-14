import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditRobot = () => {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [id_robot, setId_robot] = useState("");
  const [status, setStatus] = useState("");
  const [in_use, setIn_use] = useState("");
  const [station, setStation] = useState("");
  const [system_state, setSystem_state] = useState("");
  const [inverter_state, setInverter_state] = useState("");
  const [emergency_state, setEmergency_state] = useState("");
  const [state_modified_by, setState_modified_by] = useState("");
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getStasiunsById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/robot/${id}`);
        // console.log(response);
        setId_robot(response.data.id_robot);
        setStatus(response.data.status);
        setIn_use(response.data.in_use);
        setStation(response.data.station);
        setSystem_state(response.data.system_state);
        setInverter_state(response.data.inverter_state);
        setEmergency_state(response.data.emergency_state);
        setState_modified_by(response.data.state_modified_by);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getStasiunsById();
  }, [id]);

  useEffect(() => {
    getStasiun();
  });

  const getStasiun = async () => {
    const response = await axios.get("http://localhost:5000/stasiun");
    // console.log(response);

    setData(response.data);
  };

  const updateRobot = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:5000/robot/edit/${id}`, {
          id_robot: id_robot,
          video_uri: null,
          status: status,
          in_use: in_use,
          station: station,
          system_state: system_state,
          inverter_state: inverter_state,
          emergency_state: emergency_state,
          state_modified_by: state_modified_by,
        })
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            text: data.msg,
          });
        });

      navigate("/robot");
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
                  Edit Robot
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- DataTales Example --> */}

      <form onSubmit={updateRobot}>
        {/* <p className="has-text-centered bg-danger text-white text-center p-3" >{msg}</p> */}
        <div className="container-xl px-4 mt-4">
          <div className="row">
            <div className="col-xl-3"></div>
            <div className="col-xl-5">
              <div className="card mb-4 shadow">
                <div className="card-header">Robot Details</div>
                {Object.keys(msg).length > 0 && (
                  <p className="alert alert-danger rounded text-center p-2 shadow m-3">{msg}</p>
                )}
                <div className="card-body">
                  <div className="mb-3">
                    <label className="small mb-1">Robot Id</label>
                    <input
                      className="form-control"
                      type="text"
                      value={id_robot}
                      onChange={(e) => setId_robot(e.target.value)}
                      placeholder="Masukan Robot Id"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Status</label>
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">In Use</label>
                    <select
                      className="form-select"
                      value={in_use}
                      onChange={(e) => setIn_use(e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Station</label>
                    <select
                      className="form-select"
                      value={station}
                      onChange={(e) => setStation(e.target.value)}
                    >
                      <option>Pilih Station :</option>

                      {data.map((d, i) => (
                        <option value={d.kode_stasiun}>
                          {d.kode_stasiun} - {d.nama_stasiun}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">System State</label>
                    <select
                      className="form-select"
                      value={system_state}
                      onChange={(e) => setSystem_state(e.target.value)}
                    >
                      <option value="On">On</option>
                      <option value="Off">Off</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Inverter State</label>
                    <select
                      className="form-select"
                      value={inverter_state}
                      onChange={(e) => setInverter_state(e.target.value)}
                    >
                      <option value="On">On</option>
                      <option value="Off">Off</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">Emergency State</label>
                    <select
                      className="form-select"
                      value={emergency_state}
                      onChange={(e) => setEmergency_state(e.target.value)}
                    >
                      <option value="On">On</option>
                      <option value="Off">Off</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1">State Modified By</label>
                    <select
                      className="form-select"
                      value={state_modified_by}
                      onChange={(e) => setState_modified_by(e.target.value)}
                    >
                      <option value="Web">Web</option>
                      <option value="Robot">Robot</option>
                    </select>
                  </div>

                  <Link className="btn btn-info text-light mr-3" to={"/robot"}>
                    Back
                  </Link>
                  <button className="btn btn-primary" type="submit">
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

export default FormEditRobot;
