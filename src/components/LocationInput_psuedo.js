import "../stylesheets/LocationInputStyles.scss"

import React from "react"
import axios from "axios"
import { Icon } from "react-fa"


export default class LocationInput extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            fetchingSuggestion:false,
            suggestedLocation:null,
            apikey:"**API_KEY**"
        }

    }

    handleSuggestedTextClick(event){
        event.preventDefault();

    }


    handleChange(event){
        console.log("this should fire");
        this.props.parentHandlesChange()

    }


    render(){

        var fetchingIcon = ""
        if(this.state.fetchingSuggestion){
            fetchingIcon = <Icon pulse name="spinner"/>;
        }

        var suggested = ""
        if(this.state.suggestedLocation){
            suggested = (<span className="suggested-location-span">Do you mean?

                <a href="#" onClick={()=>this.handleChange}> {this.state.suggestedLocation} </a>

            </span>)
        }

        console.log("i'm rendering cause of new value");


        return(<div className="location-input-component">

            <input
                type="text"
                class="location-input"
                id="location-input"
                placeholder="Enter Location"
                value={this.state.value}
                onChange={this.handleChange}
            />

            {suggested}
            {fetchingIcon}

        </div>)

    }

}
