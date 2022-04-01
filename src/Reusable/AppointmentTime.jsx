import React from 'react';
import {TimePickerComponent} from '@syncfusion/ej2-react-calendars';
import Helper from "../Helper/Helper";

export default class AppointmentTime extends React.Component{

    minTime: Date = new Date(Helper.getCurrentDate()+" 09:00");
    maxTime: Date = new Date(Helper.getCurrentDate()+" 17:00");

    handleChange = (e, propName) => {
        console.log('Time:', e.target.value.toISOString());
        const value = e.target.value ? e.target.value.toISOString():'';
        const data = {};
        data[propName] = value;
        this.props.setTime(data);
    }

    render(){

        const propName = this.props.name;

        return (
            <div>
                <TimePickerComponent
                name={propName}
                value={this.props.value}
                placeholder={this.props.placeholder}
                min={this.minTime}
                max={this.maxTime}
                onChange={(e)=>{this.handleChange(e,propName)}}
                ></TimePickerComponent>
            </div>
        )
    }

}
