import React from 'react'
import {NavLink, Navigate } from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';

export default class Home extends React.Component{

    state = {
        name: '',
        appointment_schedule: '',
        appointment_date: '',
        appointment_time: '',
        validationState: '',
        messageState: ''
    }


    createHandler = (e) => {
        e.preventDefault();

        //prepare data...
        const data = {
            name: this.state.name,
            appointment_schedule: this.state.appointment_schedule,
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
