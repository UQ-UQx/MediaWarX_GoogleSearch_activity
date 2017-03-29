import "../stylesheets/SimpleFormStyles.scss"
import '../../node_modules/react-select/dist/react-select.css';
import nationalities from "../data/nationalities.json";
import educationlevels from "../data/educationlevels.json";

import Select from 'react-select';

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



    renderForm(){

        const gender_options = [
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Other', label: 'Other' }
        ]

        return (<div className="simple-form-container">

            <table className="form-inputs-table">
                <tbody>
                <tr>
                    <td><span className="form-input-label-span">Location:</span></td>
                    <td>
                        <LocationInput
                            value={this.props.location_name}
                            location_suggestion={this.props.location_suggestion}
                            location_suggestion_fetching={this.props.location_suggestion_fetching}
                            location_error={this.props.location_error}
                            onLocationInputChange={this.onLocationInputChange}
                        />
                    </td>
                </tr>
                <tr>
                    <td><span className="form-input-label-span">Age:</span></td>
                    <td>
                        <div className="age-input-container">
                            <input
                                type="number"
                                class="age-input"
                                id="age-input"
                                placeholder="Enter Age"
                                min="1"
                                max="122"
                                value={this.props.age}
                                onChange={this.onAgeInputChange}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span className="form-input-label-span">Gender:</span></td>
                    <td>
                        <div className="gender-dropdown-container">
                            <Select
                            	name="gender-dropdown"
                                value={this.props.gender}
                            	placeholder="Please Select You Gender"
                            	options={gender_options}
                            	onChange={this.onGenderChange}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span className="form-input-label-span">Ethnicity:</span></td>
                    <td>
                        <div className="nationality-dropdown-container">
                            <Select
                            	name="gender-dropdown"
                                value={this.props.nationality}
                            	placeholder="Please Select You Nationality"
                            	options={nationalities}
                            	onChange={this.onNationalityChange}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><span className="form-input-label-span">Education:</span></td>
                    <td>
                        <div className="education-dropdown-container">
                            <Select
                            	name="education-dropdown"
                                value={this.props.education}
                            	placeholder="Please Select Your Level of Education"
                            	options={educationlevels}
                            	onChange={this.onEducationChange}
                            />
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
