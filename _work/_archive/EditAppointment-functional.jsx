import React, { useState, useEffect } from 'react';
import {NavLink, Navigate, useParams} from "react-router-dom";
import axios from 'axios';

const EditAppointment = props => {

    //const [count, inccount] = useState(0);
    const [itemState, setItemState] = useState({
        appointment: {
            id: '',
            name: '',
            status: '',
            appointment_date: '',
            appointment_time: ''
        },
        useParams: useParams()
    });

    const clickHandler = (e) => {
        e.preventDefault();
        alert('test');
        setItemState({
            appointment: {
                id: 3,
                name: 'Gohan',
                status: 'Accepted',
                appointment_date: '2022-03-22',
                appointment_time: '10:00'
            }
        });
    }

    // Similar to componentDidMount
    useEffect(() => {
        // Update the document title using the browser API
        const id = itemState.useParams.id;



        axios.get(`http://localhost:5000/api/appointments/${id}`)
        .then( function (response){
            // handle success
            console.log(response.data);



            /*
            setFruiteState({
                fruits:[
                    {name:'Samsung', weight: '120gm'},
                    {name:'Apple', weight: '20gm'},
                    {name:'Nokia', weight: '140gm'},
                ]
            });
            */

        })
        .catch(function (error) {
            // handle error
            console.log('Error: ',error);
        })

    });
    /*
    function componentDidMount() {

        //console.log(this.props.match.params.id, "kjhj");
        //let {urlParams} = useParams();
        //this.id = this.props.match.params.id;
        //alert(this.id);

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

    }
    */

    return(
        <div>
            <div className="ms-auto me-auto ps-5 pe-5 pb-5 pt-4 mw-600 bg-light">
                <button onClick={clickHandler}>Click Me</button>
                <div className="row">
                    <div className="col-12">
                      <div className="text-end">
                        <NavLink className="btn btn-secondary btn-sm" to="/appointments">&#171; Back</NavLink>
                      </div>
                      <h1 className="text-center mb-4">Edit Appointment</h1>
                      <form>
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" value={itemState.appointment.name}></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Appointment Date</label>
                            <input type="text" name="appointment_date" className="form-control" value={itemState.appointment.appointment_date}></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Appointment Time</label>
                            <input type="text" name="appointment_time" className="form-control" value={itemState.appointment.appointment_time}></input>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Status {itemState.appointment.status}</label>
                            <select name="status" className="form-control" value={itemState.appointment.status}>
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
    );
}

export default EditAppointment;
