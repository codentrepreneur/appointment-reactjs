import React from 'react';
import {DatePickerComponent} from '@syncfusion/ej2-react-calendars';
import Helper from "../Helper/Helper";
import dateTimeFormat from "../Helper/dateTimeFormat";

export default class AppointmentCalendar extends React.Component{

    minDate: Date = new Date(Helper.getCurrentDate());
    maxDate: Date = new Date(Helper.getEndDate());

    disabledDate = (args) => {
        if ((args.date).getDay() === 0 ) {
            // set 'true' to disable the weekends
            args.isDisabled = true;
        }
    }

    handleChange = (e, propName) => {
        const data = {};
        const value = e.target.value !== null ? e.target.value.toISOString():'';
        data[propName] = value;
        console.log('Calendar', data);
        this.props.setCalendar(data);
    }

    render(){

        const propName = this.props.name;
        const cleanDate = dateTimeFormat.cleanDate(this.props.value);
        const xDateString = dateTimeFormat.xDate(cleanDate);

        return (
            <div>
                <DatePickerComponent
                    name={propName}
                    value={xDateString}
                    placeholder={this.props.placeholder}
                    min={this.minDate}
                    max={this.maxDate}
                    onChange={(e)=>{this.handleChange(e,propName)}}
                    strictMode={false}
                    renderDayCell={this.disabledDate}
                ></DatePickerComponent >
            </div>
        )
    }

}
