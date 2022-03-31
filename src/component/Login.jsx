import React from 'react';
import {NavLink, Redirect} from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import Auth from "../Helper/Auth";

export default class Login extends React.Component{

    state = {
        email: '',
        password: '',
        validationState: '',
        messageState: '',
        loggedIn: false
    }

    //Login
    handlerLogin = (e) => {
        e.preventDefault();

        const data = {
            email:this.state.email,
            password:this.state.password,
        }

        RestClient.PostRequest(`${AppUrl.BaseURL}/users/login`, data).then(response => {

            if(response.validation.status){

                //Save token to localStorage
                localStorage.setItem('token', response.result.token);

                //Assign User ID...
                localStorage.setItem('userID', response.result.id);

                //Assign User Role...
                if(response.result.userType==='Scheduler'){
                    localStorage.setItem('userRole', 2); // 2 equal to 'Scheduler'
                }else if(response.result.userType==='Doctor'){
                    localStorage.setItem('userRole', 3); // 3 equal to 'Doctor'
                }

                //Global set state
                this.props.setUser(response.result);
                //console.log(this.props.user);

                //set validations...
                this.setState({ loggedIn:true });

                //reset form...
                e.target.reset();
            }

            this.setState({
                validationState: response.validation.status,
                messageState: response.validation.message
            });

        });
    }

    render(){
        //For logout users only...
        if(Auth.isLoggedIn()){ return <Redirect to="/appointments" /> }

        //After Login Redirect to appointment page
        if( this.state.loggedIn){
            return <Redirect to="/appointments" />
        }

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
                            <h1 className="text-center mb-4">Login Account</h1>
                            {messageStateAlert}
                            <form onSubmit={this.handlerLogin}>
                              <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" name="email" className="form-control" onChange={(e)=>{ this.setState({email:e.target.value}) }}></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" onChange={(e)=>{ this.setState({password:e.target.value}) }}></input>
                              </div>
                              <div className="text-center">
                                  <button type="submit" className="btn btn-primary">Login</button>
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
