import React from 'react';
import {NavLink, Navigate, Redirect } from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";
import Auth from "../Helper/Auth";
import Helper from "../Helper/Helper";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Button, Modal} from 'react-bootstrap';
import dateTimeFormat from  "../Helper/dateTimeFormat";
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import axios from 'axios';

export default class Appointments extends React.Component{

    // Init state
    state = {
        appointments:[],
        doctors:[],
        modal_show: false,
        modal_id: '',
        modal_name: '',
        modal_status: '',
        validationState: '',
        messageState: '',
        startDate: '',
        endDate: ''
    };

    // Onload priority
    componentDidMount() {

        const token = localStorage.getItem("token");
        console.log("Token:", token);


        //Get all doctors
        /*
        RestClient.GetRequest(`${AppUrl.BaseURL}/users/doctors`).then(response => {
            this.setState({ doctors: response.result });
        });


        //Get all appointments
        RestClient.GetRequest(`${AppUrl.BaseURL}/appointments`).then(response => {
            this.setState({ appointments: response.result });
        });
        */

        RestClient.GetRequest(`${AppUrl.BaseURL}/users/doctors`, {
            headers:{
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response => {
            this.setState({ doctors: response.result });
        });

        axios.get(`${AppUrl.BaseURL}/appointments`,{
            headers:{
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response=>{
            //console.log('status: ',response.validation.status);
            this.setState({ appointments: response.result });
        }).catch(function (error) {
            // handle error
            //console.log('Error: ',error.request.status);
            //if(typeof error.request.status !== undefined && error.request.status === 401){
            //    localStorage.clear();
            //}

        });

    }

    handlerFilter = (e) => {
      e.preventDefault();

      const data = {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }

     // console.log(data);

      // Date Filter appointments
      RestClient.PostRequest(`${AppUrl.BaseURL}/appointments/dateFilter`, data).then(response => {
          this.setState({ appointments: response.result });
      });
    }

    deleteHandler = (e) => {
        e.preventDefault();

        //Delete an appointment
        RestClient.DeleteRequest(`${AppUrl.BaseURL}/appointments/${e.target.id}`).then(response => {
            const index = this.state.appointments.findIndex(function(o){
                return o.id == e.target.id;
            });
            if(index !==-1){
                const newList = this.state.appointments;
                newList.splice(index, 1);
                this.setState({appointments:newList});
            }
        });
    }

    //Update Status from modal
    handeUpdateStatus = (e) => {
        e.preventDefault();
        const data = {
            status: this.state.modal_status
        }

        //Update data...
        RestClient.PutRequest(`${AppUrl.BaseURL}/appointments/status/${this.state.modal_id}`, data).then(response => {
            this.setState({
                validationState: response.validation.status,
                messageState: response.validation.message
            });

            //get current list
            let update_appointments = this.state.appointments;

            //get index of the updated...
            const selected_appointment = update_appointments.find( (o)=> {
                return o.id == this.state.modal_id;
            });

            const index = update_appointments .indexOf(selected_appointment);

            //Update status of the specific appointment
            //console.log(update_appointments);
            update_appointments[index].status = this.state.modal_status;
            this.setState({
                appointments: update_appointments
            });

        });
    }

    // Modal
    handleModal = (e, id) => {
        e.preventDefault();

        // open modal
        this.setState({
            modal_show: true,
        });

        //check if appointment exist
        const index = this.state.appointments.find(function(o){
            return o.id == e.target.id;
        });

        //update modal state
        if(index !==-1){
            const appointment = this.state.appointments.find(a => a.id == id);
            this.setState({
                modal_id: appointment.id,
                modal_name: appointment.name,
                modal_status: appointment.status,
            });
        }
    }

    handleCloseModal = () => {
        //close modal
        this.setState({
            modal_show: false,
        });

        //Clear modal state and validation...
        this.setState({
            modal_id: '',
            modal_name: '',
            modal_status: '',
            validationState: '',
            messageState: ''
        });
    }

    //Display view
    render(){
        //For login users only...
        if(!Auth.isLoggedIn()){ return <Redirect to="/login" /> }

        //Display all appointments
        const appointments = this.state.appointments;
        const allAppointments = appointments.map((appointment, idx)=>{

            let doctor = Helper.getItemById(this.state.doctors, appointment.did);

            let appAction = '';
            if(appointment.status !== 'Accepted'){
                appAction = (
                    <>
                        <NavLink className="btn btn-primary btn-sm mx-1" to={"/edit-appointment/"+appointment.id} >Edit</NavLink>
                        <a href="#" className="btn btn-danger btn-sm mx-1" id={appointment.id} onClick={this.deleteHandler} >Delete</a>
                    </>
                )
            }

            return (
                <tr key={appointment.id} >
                  <td>{appointment.name}</td>
                  <td>
                      {doctor ? doctor.name : ''}
                  </td>
                  <td className="text-center">
                      {appointment.status}
                      <a href=""><FontAwesomeIcon className="faPencil" icon={faPencil} onClick={ (e)=>{this.handleModal(e, appointment.id)} } /></a>
                  </td>
                  <td>{dateTimeFormat.cleanDate(appointment.appointment_schedule)}</td>
                  <td className="text-center">
                    {appAction}
                  </td>
                </tr>
            )
        });

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
                <h1 className="float-start">Appointments</h1>
                <div className="float-end">
                  <NavLink className="btn btn-success" to="/create-appointment"><FontAwesomeIcon icon={faPlus} /> Create Appointment</NavLink>
                </div>
                <div className="clearfix"></div>
                <div className="mb-4">
                  <form onSubmit={this.handlerFilter}>
                    <div className="row">
                        <div className="col-2">
                          <DateTimePickerComponent
                              name="startDate"
                              placeholder="Start Date"
                              value={this.state.startDate}
                              format="dd-MM-yy HH:mm"
                              step={60}
                              strictMode={false}
                              onChange={(e)=>{this.setState({ startDate: e.target.value ? e.target.value.toISOString(): ''})}}
                          ></DateTimePickerComponent>
                        </div>
                        <div className="col-2">
                          <DateTimePickerComponent
                              name="startDate"
                              placeholder="End Date"
                              value={this.state.endDate}
                              format="dd-MM-yy HH:mm"
                              step={60}
                              strictMode={false}
                              onChange={(e)=>{this.setState({ endDate: (e.target.value) ? e.target.value.toISOString() : ''})}}
                          ></DateTimePickerComponent>
                        </div>
                        <div className="col-2">
                          <button type="submit" className="btn btn-primary">Filter</button>
                        </div>
                    </div>
                  </form>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="25%" scope="col">Name</th>
                      <th width="20%" scope="col">Doctor</th>
                      <th width="15%" scope="col" className="text-center">Status</th>
                      <th width="15%" scope="col">Date/Time</th>
                      <th width="10%" scope="col" className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {allAppointments}
                  </tbody>
                </table>

                <Modal show={this.state.modal_show} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <h4>Update Appointment Status</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handeUpdateStatus}>
                            {messageStateAlert}
                            <div className="mb-3">
                              {this.state.modal_name}
                            </div>
                            <div className="mb-3">
                              <select name="status" className="form-control" value={this.state.modal_status} onChange={(e)=>{ this.setState({modal_status:e.target.value}) }}>
                                <option value="">Please select...</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Denied">Denied</option>
                              </select>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                          </form>
                    </Modal.Body>
                </Modal>
            </div>

        )
    }
}
