import "../stylesheets/MapPageDataStyles.scss"


import React from "react"
import MapPageScreenshotViewer from "./MapPageScreenshotViewer"
import MapPageFilterPanel from "./MapPageFilterPanel"
export default class MapPageData extends React.Component {
    constructor(props){
        super(props)



    }

    componentDidMount(){

        console.log("Data container did mount");

    }

    render(){


        
        return (<div className="map-page-data-container">

            <MapPageScreenshotViewer 

                markersInBounds={this.props.markersInBounds}
                markers={this.props.markers}
                clusterer={this.props.clusterer}
                mousedOverMarker={this.props.mousedOverMarker}
                handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                            clusterToFocus={this.props.clusterToFocus}


            />
            <MapPageFilterPanel 
                markersInBounds={this.props.markersInBounds}
                markers={this.props.markers}
                clusterToFocus={this.props.clusterToFocus}

            />         

            
           {
            // <ul>{markers}</ul>
            // <ul>{tagslis}</ul>
}
        </div>)

    }


}