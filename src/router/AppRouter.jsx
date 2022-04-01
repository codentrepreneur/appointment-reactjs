import React from 'react';
import {BrowserRouter as Switch, Route, useParams} from "react-router-dom";

import Nav from '../common/Nav';
import Home from '../component/Home';
import Appointments from '../component/Appointments';
import Login from '../component/Login';
import Register from '../component/Register';
import EditAppointment from '../component/EditAppointment';
import CreateAppointment from '../component/CreateAppointment';
import AppUrl from "../Helper/AppUrl";
import RestClient from "../Helper/RestClient";
import Auth from "../Helper/Auth";
import axios from 'axios';

//import Forgetpassword from '../component/Forgetpassword';

export default class AppRouter extends React.Component{

    state = {
        user:{}
    }

    componentDidMount = () => {
        //Check if user is authenticated...
        RestClient.GetRequest(`${AppUrl.BaseURL}/users/auth`, true).then(response => {
            this.setState({user:response.result});
        }).catch(function (error) {
            // handle error
            //console.log(error.response);
            if (error.response) {
                // Check error response...
                if(error.response.status === 401){ // if authorized force logout
                   localStorage.clear();
                   this.setUser({user:{}});
                }
            }

        });
    }

    //set state obj
    setUser = (user) => {
        this.setState({
            user:user,
        });
    }

    render(){

        let hiMessage = '';
        if(this.state.user.name){
            hiMessage = (
                <div className="text-end">
                    <h1>Hi {this.state.user.name}!</h1>
                </div>
            )
        }

        return (
          <div>
            <Switch>
                <Nav user={this.state.user} setUser={this.setUser} />
                <div className="container py-4">
                    {hiMessage}
                    <Route exact path="/"><Home /></Route>
                    <Route path="/login"><Login user={this.state.user} setUser={this.setUser} /></Route>
                    <Route path="/register"><Register user={this.state.user} setUser={this.setUser} /></Route>
                    <Route path="/appointments"><Appointments user={this.state.user} /></Route>
                    <Route path="/create-appointment"><CreateAppointment user={this.state.user} /></Route>
                    <Route path="/edit-appointment/:id" component={EditAppointment} />
                </div>
            </Switch>
          </div>
        )
    }
}
