import "../stylesheets/GoogleSearchMapPageStyles.scss"

import React from "react"
import MapPageData from "./MapPageData"
import MapPageMap from "./MapPageMap"
export default class GoogleSearchMapPage extends React.Component {
    constructor(props){
        super(props)

       

    }



    render(){


        //console.log("GoogleSearchMapPage",this.props)


        return (<div className="google-search-map-page-component">


            <div className="map-page-map-container">
                <MapPageMap 

                    location={this.props.location}
                    map={this.props.map}
                    markers={this.props.markers}
                    markersInBounds={this.props.markersInBounds}

                    clusterer={this.props.clusterer}
                    handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                    mousedOverMarkers={this.props.mousedOverMarkers}
                    clusterToFocus={this.props.clusterToFocus}

                    filter_genders={this.props.filter_genders}
                    filter_educations={this.props.filter_educations}
                    filter_devices={this.props.filter_devices}

                />
            
            </div>

            <div className="map-page-data-container">

                <MapPageData
                    
                    map={this.props.map}

                    markersInBounds={this.props.markersInBounds}
                    markers={this.props.markers}
                    hiddenMarkers={this.props.hiddenMarkers}

                    clusterer={this.props.clusterer}
                    mousedOverMarkers={this.props.mousedOverMarkers}
                    
                    handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                    clusterToFocus={this.props.clusterToFocus}

                    filter_genders={this.props.filter_genders}
                    filter_educations={this.props.filter_educations}
                    filter_devices={this.props.filter_devices}

                />
            
            </div>
            
        </div>)
    }

}
