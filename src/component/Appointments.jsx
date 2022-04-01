import React from 'react';
import {NavLink, Navigate, Redirect } from "react-router-dom";
import AppUrl from "../Helper/AppUrl";
import RestClient from "../Helper/RestClient";
import Auth from "../Helper/Auth";
import Helper from "../Helper/Helper";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {Button, Modal} from 'react-bootstrap';
import dateTimeFormat from  "../Helper/dateTimeFormat";
import {DatePickerComponent} from '@syncfusion/ej2-react-calendars';
import axios from 'axios';

export default class Appointments extends React.Component{

    // Init state
    state = {
        appointments:[],
        doctors:[],
        docfilter: '',
        modal_show: false,
        modal_id: '',
        modal_name: '',
        modal_status: '',
        validationState: '',
        messageState: '',
        startDate: '',
        endDate: '',
    };

    // Onload priority
    componentDidMount() {

        //Get all doctors
        RestClient.GetRequest(`${AppUrl.BaseURL}/users/doctors`,true).then(response => {
            this.setState({ doctors: response.result });
        });

        //Get all appointments
        RestClient.GetRequest(`${AppUrl.BaseURL}/appointments`,true).then(response => {
            this.setState({ appointments: response.result });
        });
    }

    /*
    * Filter by date
    */
    handlerFilter = (e) => {
      e.preventDefault();

      const data = {
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        docfilter: this.state.docfilter
      }

      // Date Filter appointments
      RestClient.PostRequest(`${AppUrl.BaseURL}/appointments/dateFilter`, data, true).then(response => {
          this.setState({ appointments: response.result });
      });

    }

    /*
    * Delete appointment
    */
    deleteHandler = (e) => {
        e.preventDefault();

        //Delete an appointment
        RestClient.DeleteRequest(`${AppUrl.BaseURL}/appointments/${e.target.id}`, true).then(response => {
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

    /*
    * Update Status from modal
    */
    handeUpdateStatus = (e) => {
        e.preventDefault();

        const data = {
            status: this.state.modal_status
        }

        //Update data...
        RestClient.PutRequest(`${AppUrl.BaseURL}/appointments/status/${this.state.modal_id}`, data, true).then(response => {
            this.setState({
                validationState: response.validation.status,
                messageState: response.validation.message
            });

            if(response.validation.status){
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
            }

        });
    }

    /*
    * Modal component
    */
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

    /*
    * Modal close handler
    */
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

    /*
    * Display view
    */
    render(){

        /*
        * For login users only...
        */
        if(!Auth.isLoggedIn()){ return <Redirect to="/login" /> }

        //Display all appointments loop...
        let createApp = '';
        let docFilter = '';

        const appointments = this.state.appointments;
        const allAppointments = appointments.map((appointment, idx)=>{

            let doctor = Helper.getItemById(this.state.doctors, appointment.did);
            let appAction = 'N/A';
            let appUpdateStatus = '';

            // Action Buttons...
            if( !Auth.isDoctor() && appointment.status !== 'Accepted' ){ //Visble only to Scheduler and not yet been Accepted
                appAction = (
                    <div key={appointment.id}>
                        <NavLink className="btn btn-primary btn-sm mx-1" to={"/edit-appointment/"+appointment.id} >Edit</NavLink>
                        <a href="#" className="btn btn-danger btn-sm mx-1" id={appointment.id} onClick={this.deleteHandler} >Delete</a>
                    </div>
                );
            }

            // Update Status...
            /*
            if( Auth.isScheduler() ||  // Allow if Scheduler
                (appointment.did === parseInt(localStorage.getItem('userID')) &&  appointment.status !== 'Accepted' &&  // Assigned Doctor disable if status is Accepted...
                //(appointment.status !== 'Accepted' || appointment.did === parseInt(localStorage.getItem('userID')) ) &&   // For Doctor disable if status is Accepted...
                appointment.did ) // Disabled if no doctor assigned...
            ){
            */
            if(
                (Auth.isScheduler() && appointment.did) || // Allow if Scheduler, could not change status if no assigned doctor...
                appointment.did === parseInt(localStorage.getItem('userID')) // Allow doctor update status assigned to them...
            ){
                appUpdateStatus = (
                    <a href=""><FontAwesomeIcon className="faPencil" icon={faPencil} onClick={ (e)=>{this.handleModal(e, appointment.id)} } /> </a>
                );
            }

            //Prepare HTML...
            return (
                <tr key={appointment.id} >
                  <td className="f-12">{appointment.name}</td>
                  <td className="f-12">
                      {doctor ? doctor.name : ''}
                  </td>
                  <td className="text-center f-12">
                      {appointment.status}
                      {appUpdateStatus}
                  </td>
                  <td className="f-12">
                    {dateTimeFormat.cleanDate(appointment.appointment_schedule)}
                  </td>
                  <td className="f-12">
                    {dateTimeFormat.cleanTime(appointment.appointment_time)} -
                    {dateTimeFormat.cleanTime(appointment.appointment_time_to)}
                  </td>
                  <td className="text-center f-12">
                    {appAction}
                  </td>
                </tr>
            );

        });
        // End Display all appointments loop...

        // Doctor's filter...
        if(Auth.isDoctor()){
            docFilter = (
                <div className="col-2">
                    <select name="docfilter" className="form-control" onChange={(e)=>{ this.setState({docfilter:e.target.value}) }}>
                      <option value="">All Appointments</option>
                      <option value={localStorage.getItem('userID')}>My Appointments</option>
                    </select>
                </div>
            );
        }

        //Create Appoint for Scheduler only...
        if(!Auth.isDoctor()){
            createApp = (
                <div className="float-end">
                  <NavLink className="btn btn-success" to="/create-appointment"><FontAwesomeIcon icon={faPlus} /> Create Appointment</NavLink>
                </div>
            )
        }

        //Message alert...
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
                {createApp}

                <div className="clearfix"></div>
                <div className="mb-4">

                  <form onSubmit={this.handlerFilter}>
                    <div className="row">
                        <div className="col-2">
                          <DatePickerComponent
                              name="startDate"
                              placeholder="Start Date"
                              value={this.state.startDate}
                              strictMode={false}
                              onChange={(e)=>{this.setState({ startDate: e.target.value ? e.target.value.toISOString(): ''})}}
                          ></DatePickerComponent>
                        </div>
                        <div className="col-2">
                          <DatePickerComponent
                              name="startDate"
                              placeholder="End Date"
                              value={this.state.endDate}
                              strictMode={false}
                              onChange={(e)=>{this.setState({ endDate: (e.target.value) ? e.target.value.toISOString() : ''})}}
                          ></DatePickerComponent>
                        </div>
                        {docFilter}
                        <div className="col-2">
                          <button type="submit" className="btn btn-primary">Filter</button>
                        </div>
                    </div>
                  </form>
                </div>

                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="20%" scope="col">Patient Name</th>
                      <th width="20%" scope="col">Assigned Doctor</th>
                      <th width="10%" scope="col" className="text-center">Status</th>
                      <th width="15%" scope="col">Date</th>
                      <th width="15%" scope="col">Time</th>
                      <th width="15%" scope="col" className="text-center">Action</th>
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
                              Patient's Name: {this.state.modal_name}
                            </div>
                            <div className="mb-3">
                              <select name="status" className="form-control" value={this.state.modal_status} onChange={(e)=>{ this.setState({modal_status:e.target.value}) }}>
                                <option value="">Please select a status...</option>
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
