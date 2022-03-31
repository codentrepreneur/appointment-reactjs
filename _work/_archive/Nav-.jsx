import React from 'react';
import {Link} from "react-router-dom";

export default class Nav extends React.Component{

    render(){
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container">
                    <a className="navbar-brand" href="#">Appointment System</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                         <Link className="nav-link" to="/appointments">Appointments</Link>
                        </li>
                      </ul>
                      <span className="navbar-text">
                          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                              <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                              <Link className="nav-link" to="/register">Register</Link>
                            </li>
                          </ul>
                      </span>
                    </div>
                  </div>
                </nav>
            </div>
        )
    }
}
