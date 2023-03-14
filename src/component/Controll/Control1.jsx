import React, { useState } from "react";
import Nipple from "react-nipple";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Control1 = () => {
  const [ setPosition] = useState({ x: 0, y: 0 });
  const [joy, setJoy] = useState(50);
  const [key, setKey] = useState(50);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const id = params.id;
  console.log('params', id)
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setJoy(event.target.value);
  };
  const handleOnChange1 = (event) => {
    setKey(event.target.value);
  };

  const handleMove = (evt, data) => {
    setPosition({ x: data.position.x, y: data.position.y });
  };

  const btnStatus = () => {
    setOpen(!open);
    // console.log('open', open);

    if(open === true){
      axios
      .patch(`http://localhost:5000/robot/inuse/${id}`)
      .then((response) => {
        console.log('response', response);
        // setIn_use(response.data.in_use);
        navigate('/remote');
      })
      .catch((error) => console.log(error.msg));
    }
  }
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
                  Dashboard Control
                </h1>
                
                <div className="text-center col-md-12">
                  <button type="button" onClick={() => btnStatus()} className={`btn text-center pl-5 pr-5  ml-5 ${open ?'btn-danger' : 'btn-success'}`}>{open ? 'Klik Untuk Mematikan' : 'Klik Untuk Memulai'}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="row">
        
        <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12  ">
          {open ? <div className="card">
            <div className="card-body ">
              <iframe
                src="https://clb.daily.co/room1"
                width="100%"
                height="450px"
                id=""
                className=""
                display="block"
                position=""
                allow="camera; microphone"
              />
              {/* <Webcamp /> */}
            </div>
          </div> : null}
          
        </div>

        <div className=" col-md-4 col-sm-6 col-xs-12 ">
          <div className="card p-4">
            <div className="header">
              <h2>
                Navigasi
                <small>
                  Status: <span id="status"></span>
                </small>
              </h2>
            </div>
            <div className="body">
              {/* <!-- JOYSTICK --> */}
              <div className="row my-4 ">
                <div className="text-center">
                  <div className="text-center col-lg-12">


                    <Nipple
                      options={{ mode: "static", color: "#00FFFF", position: { left: "50%", top: "50%" } }}
                      style={{
                        outline: "2px dashed #808080",
                        color: "blue",
                        width: 150,
                        height: 150,
                        position: "relative",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                       
                      }}
                      onMove={handleMove}
                    />
                    {/* <p>X: {position.x.toFixed(2)}</p>
                    <p>Y: {position.y.toFixed(2)}</p> */}
                  </div>
                </div>
              </div>

              {/* <!-- SPEED --> */}
              <div className="row">
                <div className=" col-6">
                  <label>
                    <strong>Kecepatan Lurus</strong>
                  </label>
                  <input type="range" min="0" max="100" value={joy} onChange={handleOnChange} />
                  <p>Value: {joy}</p>
                </div>
                <div className=" col-6">
                  <label>
                    <strong>Kecepatan Belok</strong>
                  </label>
                  <input type="range" min="0" max="100" value={key} onChange={handleOnChange1} />
                  <p>Value: {key}</p>
                </div>
              </div>

              <div className="row clearfix">
                <div className="col-6  pb-3">
                  <button type="button" className="btn bg-info btn-block btn-sm text-white joyjoy">
                    Joystick
                  </button>
                </div>
                <div className="col-6 col-lg-6">
                  <button type="button" className="btn bg-info btn-block btn-sm text-white keykey">
                    Keyboard
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 text-center">
                  <p>
                    <b>Kamera</b>
                  </p>
                </div>
              </div>
              <div className="row clear fix">
                <div className="  col-4 "></div>
                <div className=" col-4  pb-3">
                  <button type="button" className="btn bg-info btn-block btn-sm text-white tengokatas">
                    Atas
                  </button>
                </div>
                <div className=" col-4 "></div>
              </div>
              <div className="row clearfix">
                <div className=" col-4  pb-3">
                  <button type="button" className="btn bg-info btn-block btn-sm text-white tengokkiri">
                    Kiri
                  </button>
                </div>
                <div className=" col-4 pb-3">
                  <button type="button" className="btn bg-danger btn-block btn-sm text-white resetkamera">
                    Reset
                  </button>
                </div>
                <div className=" col-4  pb-3">
                  <button type="button" className="btn bg-info btn-block btn-sm text-white tengokkanan">
                    Kanan
                  </button>
                </div>
              </div>
              <div className="row clearfix">
                <div className=" col-4 "></div>
                <div className=" col-4  pb-3">
                  <button type="button" className="btn bg-info btn-block btn-sm text-white tengokbawah">
                    Bawah
                  </button>
                </div>
                <div className=""></div>
              </div>
              <div className="row clearfix">
                <div className="col-6 col-lg-6 pb-3">
                  <button type="button" className="btn bg-success btn-block btn-sm text-white naik">
                    Naik
                  </button>
                </div>
                <div className="col-6 col-lg-6">
                  <button ype="button" className="btn bg-success btn-block btn-sm text-white  turun">
                    Turun
                  </button>
                </div>
              </div>
              {/* <!-- Batas Garis Tengah Bawah --> */}

              {/* </div> <!-- card --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control1;
