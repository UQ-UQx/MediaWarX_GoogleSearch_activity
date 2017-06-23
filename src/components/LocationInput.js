import "../stylesheets/LocationInputStyles.scss"

import React from "react"
import axios from "axios"
import { Icon } from "react-fa"


export default class LocationInput extends React.Component {
    constructor(props){
        super(props)


        this.handleChange = this.handleChange.bind(this)
        this.handleSuggestedTextClick = this.handleSuggestedTextClick.bind(this)

        this.googleAPIKEY = "**API_KEY**"

    }

    handleSuggestedTextClick(event){
        event.preventDefault();

        this.props.onLocationInputChange({
            type:"location_name",
            value:this.props.location_suggestion,
        })

        this.props.onLocationInputChange({
            type:"location_suggestion",
            value:null,
        })

    }

    componentDidMount(){

        //handles location related actions if address is already provided through props
        this.handleChange()

    }

    handleChange(event){


        var newInputValue = this.props.value
        if(event){
            var newInputValue = event.target.value
            if(event.type == "blur"){
                this.props.onLocationInputChange({
                    type:"onBlur",
                    value:null
                })
                return;
            }
        }
        
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

        this.props.onLocationInputChange({
            type:"location_suggestion_fetching",
            value:false,
        })

        this.props.onLocationInputChange({
            type:"location_suggestion",
            value:null,
        })

        this.props.onLocationInputChange({
            type:"location_error",
            value:null,
        })


        clearTimeout(this.checkAddressTimeout);
        this.checkAddressTimeout = setTimeout(()=>{
            
            if(newInputValue.length > 0){

                this.props.onLocationInputChange({
                    type:"location_suggestion_fetching",
                    value:true,
                })

                axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+newInputValue+'&key='+this.googleAPIKEY)
                   .then((response)=>{
                       ////console.log(response.data);
                       if(response.data.status != "ZERO_RESULTS"){



                           this.props.onLocationInputChange({
                               type:"location_suggestion_fetching",
                               value:false,
                           })

                           this.props.onLocationInputChange({
                               type:"location_suggestion",
                               value:response.data.results[0].formatted_address,
                           })

                           this.props.onLocationInputChange({
                               type:"location_error",
                               value:null,
                           })


                           this.props.onLocationInputChange({
                               type:"location_coordinates",
                               value:{
                                   "lng":response.data.results[0].geometry.location.lng,
                                   "lat":response.data.results[0].geometry.location.lat
                               }
                           })



                       }else{
                           this.props.onLocationInputChange({
                               type:"location_name",
                               value:"",
                           })
                           this.props.onLocationInputChange({
                               type:"location_suggestion_fetching",
                               value:false,
                           })

                           this.props.onLocationInputChange({
                               type:"location_suggestion",
                               value:null,
                           })

                           this.props.onLocationInputChange({
                               type:"location_error",
                               value:"Could not verify location, please try again.",
                           })
                       }

                   })
                   .catch((error)=>{
                       this.props.onLocationInputChange({
                           type:"location_name",
                           value:"",
                       })

                       this.props.onLocationInputChange({
                           type:"location_suggestion_fetching",
                           value:false,
                       })

                       this.props.onLocationInputChange({
                           type:"location_suggestion",
                           value:null,
                       })

                       this.props.onLocationInputChange({
                           type:"location_error",
                           value:"Oh no! we couldn't varify the location you entered. By default your location will be 'The University of Queensland (default)'",
                       })

                   })


            }

        }, 2000);

    }


    render(){

        var fetchingIcon = ""
        if(this.props.location_suggestion_fetching){
            fetchingIcon = <Icon pulse name="spinner"/>;
        }

        var suggested = ""
        if(this.props.location_suggestion){
            // suggested = (<span className="suggested-location-span">Do you mean?
            //     <a href="#" onClick={this.handleSuggestedTextClick}> {this.props.location_suggestion} </a>
            // </span>)
        }

        var error_text = ""
        if(this.props.location_error){
            error_text = (<span className="unknown-location-error-span">{this.props.location_error}
            </span>)
        }




        return(<div className="location-input-component">

            <input
                type="text"
                class={"location-input "+this.props.className}
                id="location-input"
                placeholder="Enter Location"
                value={this.props.value}
                onChange={this.handleChange}
                onBlur={this.handleChange}
            />

            {suggested}
            {fetchingIcon}
            {error_text}
        </div>)

    }

}
