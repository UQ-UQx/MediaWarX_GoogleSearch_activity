import "../stylesheets/GoogleSearchMapPageStyles.scss"

import React from "react"
import MapPageScreenshots from "./MapPageScreenshots"
import MapPageMap from "./MapPageMap"
export default class GoogleSearchMapPage extends React.Component {
    constructor(props){
        super(props)

       

    }



    render(){


       
        console.log(this.props)

        return (<div className="google-search-map-page-component">

        
            This is the google search map page component woo!!

            <div className="map-page-map-container">
                <MapPageMap 

                    location={this.props.location}
                
                />
            
            </div>

            <div className="screenshots-container">

                <MapPageScreenshots 
            
                
            
            
                />
            
            </div>
            
        </div>)
    }

}
