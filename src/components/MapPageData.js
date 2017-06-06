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
                clusters={this.props.clusters}


            />
            <MapPageFilterPanel 
                markersInBounds={this.props.markersInBounds}
                markers={this.props.markers}
            
            />         

            
           {
            // <ul>{markers}</ul>
            // <ul>{tagslis}</ul>
}
        </div>)

    }


}