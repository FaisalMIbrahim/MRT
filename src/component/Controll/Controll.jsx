import React, { useState } from "react";
import ReactNipple from "react-nipple";
export default class Controll extends React.Component {
  state = {
    data: {},
  };

  render() {
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
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-6 col-xs-12  ">
            <div className="card">
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
            </div>
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
                    <div id="call-frame-container">
                      <ReactNipple
                        className="btn btn-info "
                        options={{ mode: "static", position: { top: "50%", left: "50%" } }}
                        style={{
                          outline: "2px dashed blue",

                          width: 150,
                          height: 150,
                          position: "relative",
                        }}
                        onStart={this.handleEvent}
                        onEnd={this.handleEvent}
                        onMove={this.handleEvent}
                        onDir={this.handleEvent}
                        onPlain={this.handleEvent}
                        onShown={this.handleEvent}
                        onHidden={this.handleEvent}
                        onPressure={this.handleEvent}
                      />
                      {/* <DebugView data={this.state.data} /> */}
                    </div>
                  </div>
                </div>
                {/* <div onShow={this.timeout}></div> */}

                {/* <!-- SPEED --> */}
                <div className="row">
                  <div className=" col-6">
                    <label>
                      <strong>Kecepatan Lurus</strong>
                    </label>
                    <input type="range" min="0" max="100" />
                    <p>Value: </p>
                  </div>
                  <div className=" col-6">
                    <label>
                      <strong>Kecepatan Belok</strong>
                    </label>
                    <input type="range" min="10" max="90" className="range" />
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

                {/* <!-- INFO 
                            <div className="row my-4">
                                <div className="col-md-12">
                                <div className="alert alert-success">
                                    <h4 className="alert-heading">Telepresence interface demo</h4>
                                    <ul>
                                    <li>Gunakan joystik untuk bergerak</li>
                                    <li>Selalu gerak-gerakkan joystick agar robot tetap berjalan</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <hr/>
                            Batas Garis Atas Tengah
                            onmousedown="mousedown_dangak()" onmouseup="mouseup_dangak()"
                    onmouseout="mouseup_dangak()" 
					onmousedown="mousedown_nunduk()" onmouseup="mouseup_nunduk()"
                    // onmouseout="mouseup_nunduk()" 
					--> */}
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
  }

  handleEvent = (evt, data) => {
    console.log(evt);
    this.setState({ data });
  };
}
