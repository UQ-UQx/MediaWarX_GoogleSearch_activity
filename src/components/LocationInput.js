import React from "react"
import axios from "axios"
import { Icon } from "react-fa"

export default class LocationInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value:"",
            fetchingSuggestion:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.googleAPIKEY = "AIzaSyBQ7RQL3LDtmQ4ccxW_uBZLflfETkaKE6U"
        //this.checkAddress = this.checkAddress.bind(this)
    }

    handleChange(event){
        this.setState({"value":event.target.value})
        this.props.onSimpleFormItemChange(event);


    }

    componentWillUnmount(){

        console.log("unmounting");

    }
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

    checkAddress(){
        this.setState({"fetchingSuggestion":true})
        // axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+"aukclnd"+'&key='+this.googleAPIKEY)
        // .then((response)=>{
        //     console.log(response);
        //
        // })
        // .catch((error)=>{
        //
        // })
        //
        console.log("why!!");
    }

    render(){

        this.checkAddress

        var fetchingIcon = ""

        if(this.state.fetchingSuggestion){
            fetchingIcon = <Icon pulse name="spinner"/>;
        }

        return(<div className="location-input-component">

            <input
                type="text"
                class="location-input"
                id="location-input"
                placeholder="Enter Location"
                value={this.state.value}
                onChange={this.handleChange}
            />
            {fetchingIcon}

        </div>)

    }

}
