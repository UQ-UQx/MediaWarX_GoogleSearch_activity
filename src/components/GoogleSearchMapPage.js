import "../stylesheets/GoogleSearchMapPageStyles.scss"

import React from "react"
import MapPageData from "./MapPageData"
import MapPageMap from "./MapPageMap"
import axios from "axios"
export default class GoogleSearchMapPage extends React.Component {
    constructor(props){
        super(props)

       
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }

    handleButtonClick(event){

        console.log("woah");

        const postData = new FormData();
        postData.append('page', 1);
        postData.append('tab', "leaderboard");
        postData.append('game_id', "star-trek-bridge-crew-ps4");


       
        axios.post('http://psntrophyleaders.com/game/getGameLeaders', postData)
        .then(function(response){

           console.log(response)
            

        }).catch(function(error){

            //console.log("Single Post Fail: 😡",error.response);

        });



    }

    render(){


        //console.log("GoogleSearchMapPage",this.props)


        return (<div className="google-search-map-page-component">

            <button onClick={this.handleButtonClick}>calculate</button>
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
                    filter_tags={this.props.filter_tags}

                    filter_ageranges={this.props.filter_ageranges}

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
                    filter_tags={this.props.filter_tags}
                    filter_ageranges={this.props.filter_ageranges}
                    filter_date_start={this.props.filter_date_start}
                    filter_date_end={this.props.filter_date_end}
                    allTags={this.props.allTags}
                />
            
            </div>
            
        </div>)
    }

}
