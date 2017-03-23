import "../stylesheets/LocationInputStyles.scss"

import React from "react"
import axios from "axios"
import { Icon } from "react-fa"


export default class LocationInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            coordinates:{
                lng:null,
                lat:null
            },
            fetchingSuggestion:false,
            suggestedLocation:null,
            warning:null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSuggestedTextClick = this.handleSuggestedTextClick.bind(this)

        this.googleAPIKEY = "**API_KEY**"

    }

    handleSuggestedTextClick(event){
        event.preventDefault();

        this.props.onLocationInputChange({
            type:"location_name",
            value:this.state.suggestedLocation,
        })

        this.setState({"suggestedLocation":null})


    }


    handleChange(event){

        var newInputValue = event.target.value
        this.props.onLocationInputChange({
            type:"location_name",
            value:newInputValue,
        })

        this.props.onLocationInputChange({
            type:"location_coordinates",
            value:{
                "lng":null,
                "lat":null,
            }
        })

        this.setState({
            "fetchingSuggestion":null,
            "suggestedLocation":null,
            "warning":null
        })

        clearTimeout(this.checkAddressTimeout);
        this.checkAddressTimeout = setTimeout(()=>{

            if(newInputValue.length > 0){

                this.setState({
                    "fetchingSuggestion":true
                })

                axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+newInputValue+'&key='+this.googleAPIKEY)
                   .then((response)=>{
                       console.log(response.data);
                       if(response.data.status != "ZERO_RESULTS"){

                           this.setState({
                               "fetchingSuggestion":false,
                               "suggestedLocation":response.data.results[0].formatted_address,
                               "warning":null

                           })

                           this.props.onLocationInputChange({
                               type:"location_coordinates",
                               value:{
                                   "lng":response.data.results[0].geometry.location.lng,
                                   "lat":response.data.results[0].geometry.location.lat
                               }
                           })



                       }else{
                           this.setState({
                               "fetchingSuggestion":false,
                               "suggestedLocation":null,
                               "warning":"Could not verify location, please try again."
                           })
                       }

                   })
                   .catch((error)=>{
                       this.setState({
                           "fetchingSuggestion":false,
                           "suggestedLocation":null,
                           "warning":"Oh no! we couldn't varify the location you entered. By default your location will be 'The University of Queensland (default)'"
                       })
                   })


            }

        }, 2000);

    }


    render(){

        var fetchingIcon = ""
        if(this.state.fetchingSuggestion){
            fetchingIcon = <Icon pulse name="spinner"/>;
        }

        var suggested = ""
        if(this.state.suggestedLocation){
            suggested = (<span className="suggested-location-span">Do you mean?
                <a href="#" onClick={this.handleSuggestedTextClick}> {this.state.suggestedLocation} </a>
            </span>)
        }

        var warning_text = ""
        if(this.state.warning){
            warning_text = (<span className="unknown-location-warning-span">{this.state.warning}
            </span>)
        }




        return(<div className="location-input-component">

            <input
                type="text"
                class="location-input"
                id="location-input"
                placeholder="Enter Location"
                value={this.props.value}
                onChange={this.handleChange}
            />

            {suggested}
            {fetchingIcon}
            {warning_text}
        </div>)

    }

}
