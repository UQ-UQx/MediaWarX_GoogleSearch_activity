import "../stylesheets/SimpleFormStyles.scss"
import '../../node_modules/react-select/dist/react-select.css';
import nationalities from "../data/nationalities.json";
import educationlevels from "../data/educationlevels.json";
import genders from "../data/genders.json"
import devices from "../data/devices.json"
import ageranges from "../data/ageranges.json"

import Select from 'react-select';

import DatePicker from 'react-datepicker';
import moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';


import React from "react"
import uuid from "uuid"

import LocationInput from "./LocationInput"
import Autocomplete from 'react-google-autocomplete';

export default class SimpleForm extends React.Component {
    constructor(props){
        super(props);

        this.onLocationInputChange = this.onLocationInputChange.bind(this)
        this.onAgeInputChange = this.onAgeInputChange.bind(this)
        this.onGenderChange = this.onGenderChange.bind(this)
        this.onNationalityChange = this.onNationalityChange.bind(this)
        this.onEducationChange = this.onEducationChange.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.onDeviceChange = this.onDeviceChange.bind(this)
        this.onAgeRangeChange = this.onAgeRangeChange.bind(this)

        this.onCountry_of_newspaperChange = this.onCountry_of_newspaperChange.bind(this) 
        this.onName_of_newspaperChange = this.onName_of_newspaperChange.bind(this) 
        this.onName_of_photo_originChange = this.onName_of_photo_originChange.bind(this) 
        this.onCaption_of_photoChange = this.onCaption_of_photoChange.bind(this) 
    }

    onCountry_of_newspaperChange(event){
        this.props.onSimpleFormChange({
            type:"country_of_newspaper",
            value:event.target.value
        })
    }
    onName_of_newspaperChange(event){
        this.props.onSimpleFormChange({
            type:"name_of_newspaper",
            value:event.target.value
        })
    }
    onName_of_photo_originChange(event){
        this.props.onSimpleFormChange({
            type:"name_of_photo_origin",
            value:event.target.value
        })
    }
    onCaption_of_photoChange(event){
        this.props.onSimpleFormChange({
            type:"caption_of_photo",
            value:event.target.value
        })
    }


    onLocationInputChange(data){
        this.props.onSimpleFormChange(data)
    }

    onAgeInputChange(event){
        this.props.onSimpleFormChange({
            type:"age",
            value:event.target.value
        })
    }

    onGenderChange(data){
        var gender = null;
        if(data){
            gender = data.value
        }

        this.props.onSimpleFormChange({
            type:"gender",
            value:gender
        })
    }

    onNationalityChange(data){
        var nationality = null;
        if(data){
            nationality = data.value
        }

        this.props.onSimpleFormChange({
            type:"nationality",
            value:nationality
        })
    }

    onEducationChange(data){
        var education = null;
        if(data){
            education = data.value
        }

        this.props.onSimpleFormChange({
            type:"education",
            value:education
        })
    }


    onDateChange(date) {
        this.props.onSimpleFormChange({
            type:"dateOfCapture",
            value:date
        });
    }

    onDeviceChange(data) {
        var device = null;
        if(data){
            device = data.value
        }

        this.props.onSimpleFormChange({
            type:"device",
            value:device
        });
    }

    onAgeRangeChange(data) {
        var ageRange = null;
        if(data){
            ageRange = data.value
        }

        this.props.onSimpleFormChange({
            type:"agerange",
            value:ageRange
        });
    }


    renderForm(){


       
        let locationInput = this.props.location_name, 
            ageInput = this.props.age, 
            genderInput = this.props.gender, 
            educationInput = this.props.education, 
            agerange = this.props.agerange,
            dateOfCaptureInput = moment(this.props.dateOfCapture).format("Do MMM YYYY"),
            deviceInput = this.props.device,
            country_of_newspaperInput = this.props.country_of_newspaper,
            name_of_newspaperInput = this.props.name_of_newspaper,
            name_of_photo_originInput = this.props.name_of_photo_origin,
            caption_of_photoInput = this.props.caption_of_photo;


        if(!this.props.submitted){

            locationInput = (<LocationInput
                            value={this.props.location_name}
                            location_suggestion={this.props.location_suggestion}
                            location_suggestion_fetching={this.props.location_suggestion_fetching}
                            location_error={this.props.location_error}
                            onLocationInputChange={this.onLocationInputChange}
                        />)
            agerange = (<Select
                            	name="agerange-dropdown"
                                value={this.props.agerange}
                            	placeholder="Please Select Your Age Range"
                            	options={ageranges}
                            	onChange={this.onAgeRangeChange}
                            />)
            genderInput = (<Select
                            	name="gender-dropdown"
                                value={this.props.gender}
                            	placeholder="Please Select You Gender"
                            	options={genders}
                            	onChange={this.onGenderChange}
                            />)
            educationInput = (<Select
                            	name="education-dropdown"
                                value={this.props.education}
                            	placeholder="Please Select Your Level of Education"
                            	options={educationlevels}
                            	onChange={this.onEducationChange}
                            />)
            dateOfCaptureInput = (<DatePicker
                                selected={this.props.dateOfCapture}
                                onChange={this.onDateChange}
                                isClearable={true}
                               // className="date-picker-custom-styles"
                                calendarClassName="date-picker-calendar-custom-styles"
                            />)
            deviceInput = (<Select
                            	name="education-dropdown"
                                value={this.props.device}
                            	placeholder="Please Select Your Device"
                            	options={devices}
                            	onChange={this.onDeviceChange}
                            />)

            country_of_newspaperInput = (<input className="default-input country_of_newspaper-input"
                                name="country_of_newspaper-input"
                                value={this.props.country_of_newspaper}
                                placeholder="Country of newspaper name"
                                onChange={this.onCountry_of_newspaperChange}
                            />)
            name_of_newspaperInput = (<input className="default-input name_of_newspaper-input"
                                name="name_of_newspaper-input"
                                value={this.props.name_of_newspaper}
                                placeholder="Newspaper name"
                                onChange={this.onName_of_newspaperChange}
                            />)
            name_of_photo_originInput = (<input className="default-input name_of_photo_origin-input"
                                name="name_of_photo_origin-input"
                                value={this.props.name_of_photo_origin}
                                placeholder="Photographer/Agency name"
                                onChange={this.onName_of_photo_originChange}
                            />)
            caption_of_photoInput = (<input className="default-input caption_of_photo-input"
                                name="caption_of_photo-input"
                                value={this.props.caption_of_photo}
                                placeholder="Photo caption"
                                onChange={this.onCaption_of_photoChange}
                            />)
        }


        



        return (<div className="simple-form-container">


            <div className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Activity Title</label>
                    <div className="col-sm-10">
                        
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Activity Instructions (RAW HTML)</label>
                    <div className="col-sm-10">
                        
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Activity Instructions (Preview)</label>
                    <div className="col-sm-10">
                        
                    </div>
                </div>
            </div>

            <table className="form-inputs-table">
                <tbody>
                <tr>
                    <td><span className="form-input-label-span">Location:</span></td>
                    <td>
                        {locationInput}
                    </td>
                </tr>
                <tr>
                    <td><span className="form-input-label-span">Age:</span></td>
                    <td>
                        <div className="age-input-container">
                            {agerange}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span className="form-input-label-span">Gender:</span></td>
                    <td>
                        <div className="gender-dropdown-container">
                            {genderInput}
                        </div>
                    </td>
                </tr>
                <tr>
                 
                    <td><span className="form-input-label-span">Education:</span></td>
                    <td>
                        <div className="education-dropdown-container">
                            {educationInput}
                        </div>
                    </td>
                
                
                </tr>
                <tr>
                   
                    <td><span className="form-input-label-span">Date of Screencapture:</span></td>
                    <td>
                        <div className="date-of-capture-container">
                             {dateOfCaptureInput}
                        </div>
                    </td>

               
                </tr>

                <tr>
                   
                <td><span className="form-input-label-span">Device:</span></td>
                    <td>
                        <div className="device-container">
                             {deviceInput}
                        </div>
                    </td>

               
                </tr>

                <tr>
                   
                <td><span className="form-input-label-span">Country of news orginisation:</span></td>
                    <td>
                        <div className="country_of_newspaper-container">
                             {country_of_newspaperInput}
                        </div>
                    </td>

               
                </tr>

                <tr>
                   
                <td><span className="form-input-label-span">Name of newspaper:</span></td>
                    <td>
                        <div className="name_of_newspaper-container">
                             {name_of_newspaperInput}
                        </div>
                    </td>

               
                </tr>

                <tr>
                   
                <td><span className="form-input-label-span">Photographer/Agency of photo:</span></td>
                    <td>
                        <div className="name_of_photo_origin-container">
                             {name_of_photo_originInput}
                        </div>
                    </td>

               
                </tr>

                <tr>
                   
                <td><span className="form-input-label-span">Photo's caption:</span></td>
                    <td>
                        <div className="caption_of_photo-container">
                             {caption_of_photoInput}
                        </div>
                    </td>

               
                </tr>


                </tbody>
            </table>



        </div>)

    }

    render(){

        return(<div className="simple-form-component">

            {this.renderForm()}

        </div>)
    }
}

/*
{
    structure.map((obj, ind) => {
        return (<div key={obj.id} className="formItem">
            <pre>{JSON.stringify(obj, null, 2)}</pre>



        </div>);
    })
} */


// Country of the newspaper
// Name of the newspaper
// Name of the photographer and/or agency that provided the picture (if neither, write ‘not available’)
// Caption that accompanies the photo