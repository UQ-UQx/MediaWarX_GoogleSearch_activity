import "../stylesheets/MapPageDataStyles.scss"


import React from "react"
import MapPageScreenshotViewer from "./MapPageScreenshotViewer"
import MapPageFilterPanel from "./MapPageFilterPanel"
export default class MapPageData extends React.Component {
    constructor(props){
        super(props)



    }

    componentDidMount(){

        //console.log("Data container did mount");

    }

    render(){


        //console.log("Map Page Data", this.props)
        
        return (<div className="map-page-data-container">

            <MapPageScreenshotViewer 
                    map={this.props.map}

                markersInBounds={this.props.markersInBounds}
                markers={this.props.markers}
                clusterer={this.props.clusterer}
                mousedOverMarkers={this.props.mousedOverMarkers}
                handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                clusterToFocus={this.props.clusterToFocus}

                filter_genders={this.props.filter_genders}
                filter_educations={this.props.filter_educations}
                filter_devices={this.props.filter_devices}
                filter_tags={this.props.filter_tags}

                filter_ageranges={this.props.filter_ageranges}
                filter_date_start={this.props.filter_date_start}
                filter_date_end={this.props.filter_date_end}
            />
            <MapPageFilterPanel 
                markersInBounds={this.props.markersInBounds}
                markers={this.props.markers}
                                    hiddenMarkers={this.props.hiddenMarkers}

                clusterToFocus={this.props.clusterToFocus}
                clusterer={this.props.clusterer}

                handleMapPageStateUpdate={this.props.handleMapPageStateUpdate}
                map={this.props.map}


                filter_genders={this.props.filter_genders}
                filter_educations={this.props.filter_educations}
                filter_devices={this.props.filter_devices}
                filter_tags={this.props.filter_tags}

                filter_ageranges={this.props.filter_ageranges}
                filter_date_start={this.props.filter_date_start}
                filter_date_end={this.props.filter_date_end}
                allTags={this.props.allTags}

            />         

            
           {
            // <ul>{markers}</ul>
            // <ul>{tagslis}</ul>
}
        </div>)

    }


}