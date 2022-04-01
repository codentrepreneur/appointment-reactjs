import React from 'react';
import {TimePickerComponent} from '@syncfusion/ej2-react-calendars';
import Helper from "../Helper/Helper";

export default class AppointmentTime extends React.Component{

    minTime: Date = new Date(Helper.getCurrentDate()+" 09:00");
    maxTime: Date = new Date(Helper.getCurrentDate()+" 17:00");

    handleChange = (e, propName) => {
        const data = {};
        const value = e.target.value !== null ? e.target.value.toISOString():'';
        data[propName] = value;
        //console.log('Time', data);
        this.props.setTime(data);
    }

    render(){

        const propName = this.props.name;
        //console.log('Check Time: ',typeof this.props.value);
        return (
            <div>
                <TimePickerComponent
                name={propName}
                value={this.props.value}
                placeholder={this.props.placeholder}
                min={this.minTime}
                max={this.maxTime}
                onChange={(e)=>{this.handleChange(e,propName)}}
                strictMode={false}
                ></TimePickerComponent>
            </div>
        )
    }

}
