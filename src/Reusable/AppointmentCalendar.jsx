import React from 'react';
import {DatePickerComponent} from '@syncfusion/ej2-react-calendars';
import Helper from "../Helper/Helper";

export default class AppointmentCalendar extends React.Component{

    state = {
        appointment_schedule: '',
        appointment_schedule_to: '',
    }

    minDate: Date = new Date(Helper.getCurrentDate()+" 09:00-5:00");
    maxDate: Date = new Date(Helper.getEndDate()+" 09:00-5:00");

    disabledDate = (args) => {
        if ((args.date).getDay() === 0 ) {
            // set 'true' to disable the weekends
            args.isDisabled = true;
        }
    }

    handleChange = (e, propName) => {
        const value = e.target.value ? e.target.value.toISOString():'';
        const data = {};
        data[propName] = value;
        this.props.setCalendar(data);
    }

    render(){

        const propName = this.props.name;

        return (
            <div>
                <DatePickerComponent
                    name={propName}
                    placeholder="Choose date from"
                    value={this.props.value}
                    format="dd-MM-yy HH:mm"
                    step={30}
                    strictMode={false}
                    min={this.minDate}
                    max={this.maxDate}
                    renderDayCell={this.disabledDate}
                    onChange={(e)=>{this.handleChange(e,propName)}}
                ></DatePickerComponent >
            </div>
        )
    }

}
