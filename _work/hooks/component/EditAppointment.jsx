import React, { useState, useEffect } from 'react';
import {NavLink, Navigate, useParams} from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import axios from 'axios';

//const EditAppointment = () => {
function EditAppointment({ history, match }) {

    const [itemState, setItemState] = useState({});
    const [messageState, setMessageState] = useState('');
    const [validationState, setValidationState] = useState('');
    const { id } = match.params;
    const isAddMode = !id;

    //Onload priority...
    useEffect(() => {
        if (!isAddMode) {

           // get appointments and set useState...
           RestClient.GetRequest(`${AppUrl.BaseURL}/appointments/${id}`).then(response => {
               setItemState(response.result);
           });
       }
    }, []);

    //Form handler
    const formHandler = (e) => {
        e.preventDefault();

        const data = {
            name: itemState.name,
            status: itemState.status,
            appointment_date: itemState.appointment_date,
            appointment_time: itemState.appointment_time
        }

        //Update data...
        RestClient.PutRequest(`${AppUrl.BaseURL}/appointments/${id}`, data).then(response => {
            setMessageState(response.validation.message);
            setValidationState(response.validation.status);
        });
    }

    //Set State
    const onChangeState = (e) => {
        //update useState...
        const data = {
            name: itemState.name,
            status: itemState.status,
            appointment_date: itemState.appointment_date,
            appointment_time: itemState.appointment_time
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
                            <label className="form-label">Appointment Date</label>
                            <input type="text" name="appointment_date" className="form-control" value={itemState.appointment_date} onChange={onChangeState}></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Appointment Time</label>
                            <input type="text" name="appointment_time" className="form-control" value={itemState.appointment_time} onChange={onChangeState}></input>
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
