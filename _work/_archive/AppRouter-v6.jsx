import React from 'react';
import {BrowserRouter as Link , Routes, Route, useParams} from "react-router-dom";

import Home from '../component/Home';
import Appointments from '../component/Appointments';
import Login from '../component/Login';
import Register from '../component/Register';
import EditAppointment from '../component/EditAppointment';
import CreateAppointment from '../component/CreateAppointment';
import Forgetpassword from '../component/Forgetpassword';

export default class AppRouter extends React.Component{
    render(){
        return (
          <div>
            <div className="container py-4">
                <Switch>
                    <Route path="/" component={Home}></Route>
                    <Route path="/appointments" component={Appointments}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register} ></Route>
                    <Route path="/forgetpassword" component={Forgetpassword}></Route>
                    <Route path="/create-appointment" component={CreateAppointment}></Route>
                    <Route path="/edit-appointment/:id"  component={EditAppointment}></Route>
                </Switch>
            </div>
          </div>
        )
    }
}
