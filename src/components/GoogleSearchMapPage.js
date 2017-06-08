import "../stylesheets/GoogleSearchMapPageStyles.scss"

import React from "react"
import MapPageData from "./MapPageData"
import MapPageMap from "./MapPageMap"
export default class GoogleSearchMapPage extends React.Component {
    constructor(props){
        super(props)

       

    }



    render(){


       

        return (<div className="google-search-map-page-component">

        
            This is the google search map page component woo!!

            <div className="map-page-map-container">
                <MapPageMap 

                    location={this.props.location}
                    map={this.props.map}
                    markers={this.props.markers}
                    markersInBounds={this.props.markersInBounds}

                    clusterer={this.props.clusterer}
                    handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                    mousedOverMarker={this.props.mousedOverMarker}
                    clusterToFocus={this.props.clusterToFocus}

                />
            
            </div>

            <div className="map-page-data-container">

                <MapPageData
            
                    markersInBounds={this.props.markersInBounds}
                    markers={this.props.markers}
                    clusterer={this.props.clusterer}
                    mousedOverMarker={this.props.mousedOverMarker}
                    
                    handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                    clusterToFocus={this.props.clusterToFocus}

                />
            
            </div>
            
        </div>)
    }

}
