import React from 'react';
import {BrowserRouter as Switch, Route, useParams} from "react-router-dom";

import Nav from '../common/Nav';
import Home from '../component/Home';
import Appointments from '../component/Appointments';
import Login from '../component/Login';
//import Register from '../component/Register';
import EditAppointment from '../component/EditAppointment';
import CreateAppointment from '../component/CreateAppointment';
//import Forgetpassword from '../component/Forgetpassword';

export default class AppRouter extends React.Component{
    render(){
        return (
          <div>
            <Switch>
                <Nav/>
                <div className="container py-4">
                    <Route exact path="/"><Home /></Route>
                    <Route path="/login"><Login /></Route>
                    <Route path="/appointments"><Appointments /></Route>
                    <Route path="/create-appointment"><CreateAppointment /></Route>
                    <Route path="/edit-appointment/:id" component={EditAppointment} />
                </div>
            </Switch>
          </div>
        )
    }
}
