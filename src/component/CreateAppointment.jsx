import React from 'react';
import {NavLink, Navigate, Redirect } from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import Auth from "../Helper/Auth";

export default class CreateAppointment extends React.Component{

    state = {
        doctors: [],
        name: '',
        appointment_schedule: '',
        appointment_date: '',
        appointment_time: '',
        did: '',
        validationState: '',
        messageState: ''
    }

    // Onload priority
    componentDidMount = () => {
        //Get all doctors
        RestClient.GetRequest(`${AppUrl.BaseURL}/users/doctors`, true).then(response => {
            this.setState({ doctors: response.result });
        });

    }

    createHandler = (e) => {
        e.preventDefault();

        //prepare data...
        const data = {
            name: this.state.name,
            appointment_schedule: this.state.appointment_schedule,
            did: this.state.did,
        }

        //Add data...
        RestClient.PostRequest(`${AppUrl.BaseURL}/appointments`, data, true).then(response => {
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
        if(!Auth.isLoggedIn()){ return <Redirect to="/login" /> }

        //For Scheduler only...
        if(!Auth.isScheduler()){ return <Redirect to="/appointments" /> }

        // Message alert...
        let messageStateAlert = '';
        if(this.state.messageState){
            messageStateAlert = (
                <div>
                    <div className={this.state.validationState ? 'alert alert-success':'alert alert-danger'}>{this.state.messageState}</div>
                </div>
            );
        }

        //Doctors selection...
        let doctors = [];
        let allDoctors = '';
        if(this.state.doctors.length){
            //console.log(this.state.doctors);
            doctors = this.state.doctors;
            allDoctors = doctors.map((doctor, idx)=>{
                return (
                    <option value={doctor.id}>{doctor.name}</option>
                )
            });
        }

        return (
            <div>
                <div className="ms-auto me-auto ps-5 pe-5 pb-5 pt-4 mw-600 bg-light">
                    <div className="row">
                        <div className="col-12">
                          <div className="text-end">
                            <NavLink className="btn btn-secondary btn-sm" to="/appointments">&#171; Back</NavLink>
                          </div>
                          <h1 className="text-center mb-4">Create Appointment</h1>
                          {messageStateAlert}
                          <form id="createForm" onSubmit={this.createHandler}>
                              <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="name" className="form-control" onChange={(e)=>{this.setState({name:e.target.value})}}></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Appointment Date/Time</label>
                                <DateTimePickerComponent
                                    name="appointment_schedule"
                                    placeholder="Choose date and time"
                                    value={this.state.appointment_schedule}
                                    format="dd-MM-yy HH:mm"
                                    step={60}
                                    strictMode={false}
                                    onChange={(e)=>{this.setState({ appointment_schedule: e.target.value ? e.target.value.toISOString():''})}}
                                ></DateTimePickerComponent>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Doctor</label>
                                <select name="did" className="form-control" onChange={(e)=>{this.setState({did:e.target.value})}}>
                                  <option value="Scheduler">Please select...</option>
                                  {allDoctors?allDoctors:''}
                                </select>
                              </div>
                              <div className="text-center">
                                  <button type="submit" className="btn btn-primary">Submit</button>
                              </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
