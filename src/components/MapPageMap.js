import "../stylesheets/MapPageMapStyles.scss"

import React from "react"
import MarkerClusterer from 'marker-clusterer-plus'
import axios from "axios"


export default class MapPageMap extends React.Component {
    constructor(props){
        super(props)

    
        this.mapBoundsChanged = this.mapBoundsChanged.bind(this);
        this.setMarkersInMapUsingAllEntries = this.setMarkersInMapUsingAllEntries.bind(this)
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
 

        
        map.addListener('bounds_changed', this.mapBoundsChanged);
        map.addListener('tilesloaded', this.mapBoundsChanged);
        
        this.props.handleMapPageStateUpdate({map:map, markers:[]})

        var self = this;
        axios.get('../public/api/api.php', {
            params: {
                action: "getAllEntries",
                data:{
                    lti_id: $LTI_resourceID
                }
            }
        })
        .then(function (response) {
            console.log("This shoudl work", self, response.data)
            self.setMarkersInMapUsingAllEntries(response.data)
        })
        .catch(function (error) {
            console.log("WOOOOOWOW",error)
        });


    }


    setMarkersInMapUsingAllEntries(entriesRAW){

       var entries = [];
       var markers = [];

       var self = this;
       entriesRAW.forEach(function(entryAll, ind){
            //console.log(entryAll);
            var parsedEntry = JSON.parse(entryAll.entry);
            //console.log(parsedEntry);
            var iconWidth=30;
            var iconHeight=45;
            var redIconImage = {
                url: 'lib/images/red_search_map_icon.png',
                // This marker is 20 pixels wide by 32 pixels high.
                scaledSize: new google.maps.Size(iconWidth, iconHeight),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(iconWidth/2, iconHeight)
            };

            markers.push(
                new google.maps.Marker({
                    ...entryAll,
                    entry:parsedEntry,
                    position:{lat:parsedEntry.location_lat, lng:parsedEntry.location_lng},
                    map:self.props.map,
                    icon:redIconImage
                })
            );
       });


        var options = {
            imagePath: 'lib/images/m'
        };
        var clusterer = new MarkerClusterer(this.props.map, markers,options);
    

        this.props.handleMapPageStateUpdate({markers:markers, clusterer:clusterer})
        

    }

    componentWillReceiveProps(){
       // console.log("CWRP",this.props)
    }

    mapBoundsChanged(){

        console.log("BOUNDS CHANGED")

        var map = this.props.map;

        var markersInBounds = [];
        var self = this;
        this.props.markers.forEach(function(marker, ind){
            if(map.getBounds().contains(marker.getPosition())){
                
                markersInBounds.push(marker);
            }
        });



       // console.log("markers in bound",this.props.markersInBounds !== markersInBounds,this.props.markersInBounds, markersInBounds)

        // for (var marker in this.props.markersInBounds) {
        //     if (this.props.markersInBounds.hasOwnProperty(marker)) {
        //         var element = this.props.markersInBounds[marker];
        //     }
        // }
             //   console.log("CLUSTERS",this.props.clusters.clusters_)

        if(this.props.markersInBounds !== markersInBounds){
            this.props.handleMapPageStateUpdate({markersInBounds:markersInBounds})

        }else{
            console.log("still the same")
        }

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

//         heatmap.setMap(this.props.map);


        
        return (<div className="map-component-container">
       
        
            <div className="map-container" ref="map">this should be map</div>
        
        
        </div>)

    }

}