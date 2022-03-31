import React from 'react';
import ReactDOM from "react-dom";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';


export default class EditAppointment extends React.Component{


    state = {
        appointment: ''
    }

    componentDidMount = () => {

        //console.log(this.props.match.params.id, "kjhj");
        let { id } = useParams();
         //const { id } = this.props.params;
         //let {id} = useParams();
         //console.log(id);

        //this.id = this.props.match.params.id;
        //alert(this.id);
        /*
        axios.get('http://localhost:5000/api/appointments/1')
        .then( (response) => {
            // handle success
            //console.log(response.data);
            this.setState({
                appointment: response.data
            });
        })
        .catch(function (error) {
            // handle error
            console.log('Error: ',error);
        })
        */
    }

    render(){

        //let {urlParams} = useParams();

        //alert(this.props.match.params.id);

        //alert(id);

        return (
          <div>
              <div className="ms-auto me-auto ps-5 pe-5 pb-5 pt-4 mw-600 bg-light">
                  <div className="row">
                      <div className="col-12">
                        <div className="text-end">
                          <Link className="btn btn-secondary btn-sm" to="/appointments">&#171; Back</Link>
                        </div>
                        <h1 className="text-center mb-4">Edit Appointment</h1>
                        <form>
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <input type="text" name="name" className="form-control" value={this.state.appointment.name}></input>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Appointment Date</label>
                              <input type="text" name="appointment_date" className="form-control" value={this.state.appointment.appointment_date}></input>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Appointment Time</label>
                              <input type="text" name="appointment_time" className="form-control" value={this.state.appointment.appointment_time}></input>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Status {this.state.appointment.status}</label>
                              <select name="status" className="form-control" value={this.state.appointment.status}>
                                <option value="">Please select...</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Dennied">Dennied</option>
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
