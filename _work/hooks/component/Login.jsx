import React from 'react';
import {NavLink, Navigate } from "react-router-dom";

export default class Login extends React.Component{

    render(){
        return (
            <div>
                <div className="ms-auto me-auto p-5 mw-600 bg-light">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center mb-4">Login Account</h1>
                            <form>
                              <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" name="email" className="form-control"></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control"></input>
                              </div>
                              <div className="text-center">
                                  <button type="submit" className="btn btn-primary">Login</button>
                                  <div className="mt-3 f-12">
                                  Forgot Password?  <NavLink className="text-decoration-none" to="/forgetpassword">Click Here</NavLink></div>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
