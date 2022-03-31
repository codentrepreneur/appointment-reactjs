import React from 'react';
import {NavLink, Navigate } from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import Calendar from "../hooks/ReactCalendar";
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
//import DatePicker from "react-datepicker";
//import 'react-datepicker/dist/react-datepicker.css';

//import TimePicker from 'react-time-picker'
//import 'react-time-picker/dist/TimePicker.css';
//import 'react-clock/dist/Clock.css';

export default class CreateAppointment extends React.Component{

    state = {
        name: '',
        appointment_schedule: '',
        appointment_date: '',
        appointment_time: '',
        status: '',
        validationState: '',
        messageState: ''
    }


    createHandler = (e) => {
        e.preventDefault();

        //prepare data...
        const data = {
            name: this.state.name,
            appointment_schedule: this.state.appointment_schedule,
            //appointment_date: this.state.appointment_date,
            //appointment_time: this.state.appointment_time,
            status: this.state.status,
        }

        //Add data...
        RestClient.PostRequest(`${AppUrl.BaseURL}/appointments`, data).then(response => {
            this.setState({
                validationState: response.validation.status,
                messageState: response.validation.message
            });
            if(response.validation.status){
                e.target.reset();
            }
        });
    }

    test = (e) => {
        console.log(e.target.value.toISOString());
        this.setState({ appointment_schedule: e.target.value.toISOString()});
    }

    render(){

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
                <div className="ms-auto me-auto ps-5 pe-5 pb-5 pt-4 mw-600 bg-light">
                    {this.state.name}<br/>
                    {this.state.appointment_schedule}<br/>
                    {(new Date()).toISOString()}
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
                                    onChange={(e)=>{this.setState({ appointment_schedule: e.target.value.toISOString()})}}
                                ></DateTimePickerComponent>
                              </div>

                              <div className="mb-3">
                                <label className="form-label">Appointment Date</label>

                              </div>
                              <div className="mb-3">
                                <label className="form-label">Appointment Time</label>
                                <input type="text" name="appointment_time" className="form-control" onChange={(e)=>{this.setState({appointment_time:e.target.value})}}></input>
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select name="status" className="form-control" onChange={(e)=>{this.setState({status:e.target.value})}}>
                                  <option value="Scheduler">Please select...</option>
                                  <option value="Accepted">Accepted</option>
                                  <option value="Denied">Denied</option>
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
