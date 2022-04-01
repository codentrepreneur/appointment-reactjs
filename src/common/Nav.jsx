import React from 'react';
import {BrowserRouter as Switch, Route, Link, Redirect} from "react-router-dom";
import Auth from "../Helper/Auth";

export default class Nav extends React.Component{

    state = {
        loggedout:false
    }

    logOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        this.setState({loggedout:true});
        this.props.setUser({user:{}});
    }

    render(){

        let loggedInLinks = '';
        let loggedOutLinks = '';
        let appointmentLink = '';

        if( Auth.isLoggedIn() && this.props.user ){
            loggedInLinks =  (
                <div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      <a href="" className="nav-link" onClick={this.logOut}>Log Out</a>
                  </li>
                </ul>
                </div>
            );

            appointmentLink  = (
                <li className="nav-item">
                 <Link className="nav-link" to="/appointments">Appointments</Link>
                </li>
            )
        }else{
            loggedOutLinks = (
                <div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </ul>
                </div>
            );
        }

        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <div className="container">
                    <Link className="navbar-brand" to="/">EXAM</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {appointmentLink}
                      </ul>
                      <span className="navbar-text">
                          {loggedInLinks}
                          {loggedOutLinks}
                      </span>
                    </div>
                  </div>
                </nav>
            </div>
        )
    }
}
