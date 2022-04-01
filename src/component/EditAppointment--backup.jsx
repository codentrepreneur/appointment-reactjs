import React, { useState, useEffect } from 'react';
import {NavLink, Navigate, useParams, Redirect} from "react-router-dom";
import AppUrl from "../Helper/AppUrl";
import RestClient from "../Helper/RestClient";
//import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import Auth from "../Helper/Auth";

import AppointmentCalendar from "../Reusable/AppointmentCalendar";
import AppointmentTime from "../Reusable/AppointmentTime";

function EditAppointment({ history, match }) {

    const [doctorState, setDoctorState] = useState([]);
    const [itemState, setItemState] = useState({});
    const [messageState, setMessageState] = useState('');
    const [validationState, setValidationState] = useState('');
    const { id } = match.params;
    const isAddMode = !id;

    //Onload priority...
    useEffect(() => {
        if (!isAddMode) {

            //Get all doctors
            RestClient.GetRequest(`${AppUrl.BaseURL}/users/doctors`,true).then(response => {
                setDoctorState(response.result);
            });

           // get appointments and set useState...
           RestClient.GetRequest(`${AppUrl.BaseURL}/appointments/${id}`,true).then(response => {
               console.log(response.result);
               setItemState(response.result);
           });
       }
    }, []);

    //Form handler
    const formHandler = (e) => {
        e.preventDefault();

        const data = {
            did: itemState.did,
            name: itemState.name,
            status: itemState.status,
            appointment_schedule: itemState.appointment_schedule,
        }

        //Update data...
        RestClient.PutRequest(`${AppUrl.BaseURL}/appointments/${id}`, data, true).then(response => {
            setMessageState(response.validation.message);
            setValidationState(response.validation.status);
        });
    }

    //Set State
    const onChangeState = (e) => {
        //update useState...
        const data = {
            name: itemState.name,
            did: itemState.did,
            status: itemState.status,
            appointment_schedule: itemState.appointment_schedule,
            appointment_time: itemState.appointment_time,
            appointment_time_to: itemState.appointment_time_to,
        }
        data[e.target.name] = e.target.value;
        setItemState(data);
    }

    // Message alert...
    let messageStateAlert = '';
    if(messageState){
        messageStateAlert = (
            <div>
                <div className={validationState ? 'alert alert-success':'alert alert-danger'}>{messageState}</div>
            </div>
        );
    }

    //Doctors selection...
    let doctors = [];
    let allDoctors = '';
    if(doctorState.length){
        //console.log(this.state.doctors);
        doctors = doctorState;
        allDoctors = doctors.map((doctor, idx)=>{
            return (
                <option value={doctor.id}>{doctor.name}</option>
            )
        });
    }

    //For login users only...
    if(!Auth.isLoggedIn()){ return <Redirect to="/login" /> }

    //For Scheduler only...
    if(!Auth.isScheduler()){ return <Redirect to="/appointments" /> }

    //Display view
    return(
        <div>
            <div className="ms-auto me-auto ps-5 pe-5 pb-5 pt-4 mw-600 bg-light">
                <div className="row">
                    <div className="col-12">
                      <div className="text-end">
                        <NavLink className="btn btn-secondary btn-sm" to="/appointments">&#171; Back</NavLink>
                      </div>
                      <h1 className="text-center mb-4">Edit Appointment</h1>
                      {messageStateAlert}
                      <form onSubmit={formHandler}>
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" value={itemState.name} onChange={onChangeState}></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Appointment Date/Time</label>
                            <DateTimePickerComponent
                                name="appointment_schedule"
                                placeholder="Choose date and time"
                                value={itemState.appointment_schedule}
                                format="dd-MM-yy HH:mm"
                                step={60}
                                strictMode={false}
                                onChange={onChangeState}
                            ></DateTimePickerComponent>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Doctor</label>
                            <select name="did" className="form-control" value={itemState.did} onChange={onChangeState}>
                              <option value="Scheduler">Please select...</option>
                              {allDoctors?allDoctors:''}
                            </select>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select name="status" className="form-control" value={itemState.status} onChange={onChangeState}>
                              <option value="">Please select...</option>
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
    );
}

export default EditAppointment;
