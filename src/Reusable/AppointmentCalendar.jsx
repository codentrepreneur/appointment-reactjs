import React from 'react';
import {DatePickerComponent} from '@syncfusion/ej2-react-calendars';
import dateTimeFormat from "../Helper/dateTimeFormat";
import Helper from "../Helper/Helper";
import * as ReactDOM from 'react-dom';

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
        //console.log('Calendar', data);
        this.props.setCalendar(data);
    }

    onFocus = (args) => {
        this.dateObj.show();
    }

    render(){

        const propName = this.props.name;

        return (

                <DatePickerComponent
                    name={propName}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    min={this.minDate}
                    onChange={(e)=>{this.handleChange(e,propName)}}
                    strictMode={false}
                    renderDayCell={this.disabledDate}

                    focus={this.onFocus.bind(this)}
                    ref = {scope => {this.dateObj = scope }}
                ></DatePickerComponent >

        )
    }

}
