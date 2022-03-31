import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import Auth from "../Helper/Auth";

export default class Register extends React.Component{

    state = {
        userType:'',
        name:'',
        email:'',
        password:'',
        confirmPassword: '',
        validationState: '',
        messageState: ''
    }

    handlerRegister = (e) => {
        e.preventDefault();

        const data = {
            userType:this.state.userType,
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }

        RestClient.PostRequest(`${AppUrl.BaseURL}/users`, data).then(response => {
            this.setState({
                validationState: response.validation.status,
                messageState: response.validation.message
            });
            if(response.validation.status){
                e.target.reset();
            }
        });

    }

    render(){
        //For login users only...
        if(Auth.isLoggedIn()){ return <Redirect to="/appointments" /> }

        // Message alert...
        let messageStateAlert = '';
        if(this.state.messageState){
            messageStateAlert = (
                <div>
                    <div className={this.state.validationState ? 'alert alert-success':'alert alert-danger'}>{this.state.messageState}</div>
                </div>
            );
        }

        return (
            <div>
                <div className="ms-auto me-auto p-5 mw-600 bg-light">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center mb-4">Register Account</h1>
                            {messageStateAlert}
                            <form onSubmit={this.handlerRegister}>
                              <div className="mb-3">
                                <label className="form-label">User Type</label>
                                <select name="userType" className="form-control" onChange={(e)=>{ this.setState({userType:e.target.value}) }}>
                                  <option value="">Please select...</option>
                                  <option value="Scheduler">Scheduler</option>
                                  <option value="Doctor">Doctor</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="userType" className="form-control" onChange={(e)=>{ this.setState({name:e.target.value}) }} ></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="text" name="email" className="form-control" onChange={(e)=>{ this.setState({email:e.target.value}) }}></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" onChange={(e)=>{ this.setState({password:e.target.value}) }}></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" name="confirmPassword" className="form-control" onChange={(e)=>{ this.setState({confirmPassword:e.target.value}) }}></input>
                              </div>
                              <div className="text-center">
                                  <button type="submit" className="btn btn-primary">Submit</button>
                                  <div className="mt-3 f-12">
                                  Book an appointment?  <NavLink className="text-decoration-none" to="/">Click Here</NavLink></div>
                              </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
