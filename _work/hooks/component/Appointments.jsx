import React from 'react';
import {NavLink, Navigate } from "react-router-dom";
import AppUrl from "../RestApi/AppUrl";
import RestClient from "../RestApi/RestClient";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import {Button, Modal} from 'react-bootstrap';


export default class Appointments extends React.Component{

    // Init state
    state = {
        appointments:[],
        modal_show: false,
        modal_id: '',
        modal_name: '',
        modal_status: '',
        validationState: '',
        messageState: ''
    };

    // Onload priority
    componentDidMount(){

        //Get all appointments
        RestClient.GetRequest(`${AppUrl.BaseURL}/appointments`).then(result => {
            this.setState({ appointments: result });
        });
    }

    deleteHandler = (e) => {
        e.preventDefault();

        //Delete an appointment
        RestClient.DeleteRequest(`${AppUrl.BaseURL}/appointments/${e.target.id}`).then(result => {
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

        //Display all appointments
        const appointments = this.state.appointments;
        const allAppointments = appointments.map((appointment, idx)=>{
            return (
                <tr key={appointment.id} >
                  <td>{appointment.name}</td>
                  <td>{appointment.appointment_date} {appointment.appointment_time}</td>
                  <td>
                      {appointment.status}
                      <a href=""><FontAwesomeIcon className="faPencil" icon={faPencil} onClick={ (e)=>{this.handleModal(e, appointment.id)} } /></a>
                  </td>
                  <td className="text-center">
                    <NavLink className="btn btn-primary btn-sm mx-1" to={"/edit-appointment/"+appointment.id} >Edit</NavLink>
                    <a href="#" className="btn btn-danger btn-sm mx-1" id={appointment.id} onClick={this.deleteHandler} >Delete</a>
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
                  <div className="row">
                      <div className="col-2">
                        <input type="text" name="date_start" className="form-control me-1" placeholder="Start Date" readOnly></input>
                      </div>
                      <div className="col-2">
                        <input type="text" name="date_end" className="form-control mx-1" placeholder="End Date" readOnly></input>
                      </div>
                      <div className="col-2">
                        <button type="submit" className="btn btn-primary">Filter</button>
                      </div>
                  </div>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th width="35%" scope="col">Name</th>
                      <th width="35%" scope="col">Date/Time</th>
                      <th width="15%" scope="col">Status</th>
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
