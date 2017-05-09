import "../stylesheets/MapPageMapStyles.scss"

import React from "react"


export default class MapPageMap extends React.Component {
    constructor(props){
        super(props)

        this.state ={
            map:null
        }

    }

    componentDidMount(){

        console.log("MapPageMap component did mount", this.props)

        var lat = 37.774546;
        var lng = -122.433523;

        if(this.props.location.lat && this.props.location.lng){
            lat = this.props.location.lat
            lng = this.props.location.lng
        }

        var location = new google.maps.LatLng(lat, lng);

        var map = new google.maps.Map(this.refs.map, {
          zoom: 4,
          center: location
        });

        this.setState({map:map})


    }



    render(){


//  var heatmapData = [
//   {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
//   new google.maps.LatLng(37.782, -122.445),
//   {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
//   {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
//   {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
//   new google.maps.LatLng(37.782, -122.437),
//   {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

//   {location: new google.maps.LatLng(37.785, -122.447), weight: 13},
//   {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
//   new google.maps.LatLng(37.785, -122.443),
//   {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
//   new google.maps.LatLng(37.785, -122.439),
//   {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
//   {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
// ];

//         var heatmap = new google.maps.visualization.HeatmapLayer({
//           data: heatmapData
//         });

//         heatmap.setMap(this.state.map);

        
console.log(this.state)
        return (<div className="map-component-container">
       
        
            <div className="map-container" ref="map">this should be map</div>
        
        
        </div>)

    }

}