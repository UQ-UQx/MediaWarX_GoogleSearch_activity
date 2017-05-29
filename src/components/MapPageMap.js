import "../stylesheets/MapPageMapStyles.scss"

import React from "react"
import 'js-marker-clusterer'
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
            console.log(entryAll);
            var parsedEntry = JSON.parse(entryAll.entry);
            console.log(parsedEntry);
            markers.push(
                new google.maps.Marker({
                    user_id:entryAll.user_id,
                    image_filename:parsedEntry.image_filename,
                    position:{lat:parsedEntry.location_lat, lng:parsedEntry.location_lng},
                    map:self.props.map
                })
            );
       });


        // var locations = [
        //     {lat: -31.563910, lng: 147.154312},
        //     {lat: -33.718234, lng: 150.363181},
        //     {lat: -33.727111, lng: 150.371124},
        //     {lat: -33.848588, lng: 151.209834},
        //     {lat: -33.851702, lng: 151.216968},
        //     {lat: -34.671264, lng: 150.863657},
        //     {lat: -35.304724, lng: 148.662905},
        //     {lat: -36.817685, lng: 175.699196},
        //     {lat: -36.828611, lng: 175.790222},
        //     {lat: -37.750000, lng: 145.116667},
        //     {lat: -37.759859, lng: 145.128708},
        //     {lat: -37.765015, lng: 145.133858},
        //     {lat: -37.770104, lng: 145.143299},
        //     {lat: -37.773700, lng: 145.145187},
        //     {lat: -37.774785, lng: 145.137978},
        //     {lat: -37.819616, lng: 144.968119},
        //     {lat: -38.330766, lng: 144.695692},
        //     {lat: -39.927193, lng: 175.053218},
        //     {lat: -41.330162, lng: 174.865694},
        //     {lat: -42.734358, lng: 147.439506},
        //     {lat: -42.734358, lng: 147.501315},
        //     {lat: -42.735258, lng: 147.438000},
        //     {lat: -43.999792, lng: 170.463352}
        // ]

        // var markers = locations.map(function(loc, ind){
        //     return new google.maps.Marker({
        //         id:ind,
        //         position:loc,
        //         map:this.props.map
        //     });
        // });



        var options = {
            imagePath: 'lib/images/m'
        };
        var clusters = new MarkerClusterer(this.props.map, markers,options);
        

        this.props.handleMapPageStateUpdate({markers:markers, entries:entriesRAW})

    }

    mapBoundsChanged(){

        var map = this.props.map;

        var markersInBounds = [];

        this.props.markers.forEach(function(marker, ind){
            if(map.getBounds().contains(marker.getPosition())){
                markersInBounds.push(marker);
            }
        });

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