import "../stylesheets/GoogleSearchMapPageStyles.scss"

import React from "react"

export default class GoogleSearchMapPage extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            map:null
        }


    }

    componentDidMount(){
        var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

        var map = new google.maps.Map(this.refs.map, {
          zoom: 4,
          center: sanFrancisco
        });

        this.setState({map:map})


    }


    render(){
        var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);


        var heatmapData = [
  {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
  new google.maps.LatLng(37.782, -122.445),
  {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
  {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
  {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
  new google.maps.LatLng(37.782, -122.437),
  {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

  {location: new google.maps.LatLng(37.785, -122.447), weight: 13},
  {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
  new google.maps.LatLng(37.785, -122.443),
  {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
  new google.maps.LatLng(37.785, -122.439),
  {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
  {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
];

        var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData
        });

        heatmap.setMap(this.state.map);


        return (<div className="google-search-map-page-component">


            This is the google search map page component woo!!

            <div className="map-container" ref="map">I Should be map</div>
        </div>)
    }

}
