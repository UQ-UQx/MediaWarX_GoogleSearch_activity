import "../stylesheets/LocationInputStyles.scss"

import React from "react"
import axios from "axios"
import { Icon } from "react-fa"


export default class LocationInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value:"",
            coordinates:{
                lng:null,
                lat:null
            },
            fetchingSuggestion:false,
            suggestedLocation:null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSuggestedTextClick = this.handleSuggestedTextClick.bind(this)

        this.googleAPIKEY = "**API_KEY**"

    }

    handleSuggestedTextClick(event){
        event.preventDefault();

        this.setState({
            "value":this.state.suggestedLocation,
            "suggestedLocation":null
        })

        this.props.onSimpleFormItemChange({
            "value":this.state.suggestedLocation,
            "coordinates":this.state.coordinates
        })

    }


    handleChange(event){
        console.log("this should fire");
        this.setState({"value":event.target.value})
        this.props.onSimpleFormItemChange({
            "value":this.state.value,
            "coordinates":this.state.coordinates
        })


        this.setState({"suggestedLocation":null})
        if(event.target.value.length > 0){
            clearTimeout(this.check);
            this.setState({
                "fetchingSuggestion":true,
            })
            this.check = setTimeout(()=>{

                axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.value+'&key='+this.googleAPIKEY)
                   .then((response)=>{
                       console.log(response.data);
                       this.setState({
                           "fetchingSuggestion":false,
                           "suggestedLocation":response.data.results[0].formatted_address,
                           "coordinates":{
                               "lng":response.data.results[0].geometry.location.lng,
                               "lat":response.data.results[0].geometry.location.lat
                           }
                       })

                       this.props.onSimpleFormItemChange({
                           "value":this.state.value,
                           "coordinates":this.state.coordinates
                       })

                   })
                   .catch((error)=>{

                   })

            }, 2000)
        }
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
