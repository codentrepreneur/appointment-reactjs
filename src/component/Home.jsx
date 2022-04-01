import React from 'react'
import {NavLink, Navigate } from "react-router-dom";
import AppUrl from "../Helper/AppUrl";
import RestClient from "../Helper/RestClient";
import Helper from "../Helper/Helper";
import AppointmentCalendar from "../Reusable/AppointmentCalendar";
import AppointmentTime from "../Reusable/AppointmentTime";

export default class Home extends React.Component{

    //Initiate State
    state = {
        name: '',
        appointment_schedule: '',
        appointment_time: '',
        appointment_time_to: '',
        appointment_comment: '',
        validationState: '',
        messageState: '',
    }

    //Create appointment handler
    createHandler = (e) => {
        e.preventDefault();

        //prepare data...
        const data = {
            name: this.state.name,
            appointment_schedule: this.state.appointment_schedule,
            appointment_time: this.state.appointment_time,
            appointment_time_to: this.state.appointment_time_to,
            appointment_comment: this.state.appointment_comment,
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

    //set state
    setCalendar = (calendar) => {
        this.setState(calendar);
    }

    //set state
    setTime = (time) => {
        this.setState(time);
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
            <div className="pt-5">
                  <div className="ms-auto me-auto p-5 mw-600 bg-light">
                      <div className="row">
                          <div className="col-12">
                            <h1 className="text-center mb-4">Book an appointment </h1>
                            {messageStateAlert}
                            <form id="createForm" onSubmit={this.createHandler}>
                                <div className="mb-3">
                                  <label className="form-label">Name</label>
                                  <input type="text" name="name" className="form-control" onChange={(e)=>{this.setState({name:e.target.value})}}></input>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Appointment Date</label>
                                  <div className="row">
                                    <div className="col-md-12">
                                        <AppointmentCalendar
                                            name="appointment_schedule"
                                            value={this.state.appointment_schedule}
                                            setCalendar={this.setCalendar}
                                        />
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label className="form-label">Appointment Time</label>

                                  <div className="row">
                                    <div className="col-md-6">
                                        <AppointmentTime
                                            name="appointment_time"
                                            value={this.state.appointment_time}
                                            setTime={this.setTime}
                                            placeholder="Choose time from"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <AppointmentTime
                                            name="appointment_time_to"
                                            value={this.state.appointment_time_to}
                                            setTime={this.setTime}
                                            placeholder="Choose time to"
                                        />
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Comment</label>
                                    <textarea name="appointment_comment" className="form-control u-height-150" onChange={(e)=>{this.setState({appointment_comment:e.target.value})}} ></textarea>
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
