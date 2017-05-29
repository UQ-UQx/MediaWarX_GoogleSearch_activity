import "../stylesheets/MapPageDataStyles.scss"


import React from "react"

export default class MapPageData extends React.Component {
    constructor(props){
        super(props)



    }

    componentDidMount(){

        console.log("Data container did mount");

    }

    render(){

        var markers = [];
       
        if(this.props.markersInBounds){
            markers = this.props.markersInBounds.map(function(mark, ind){
                return <li key={mark.user_id}>{mark.user_id}<img width="100" height="auto" src={"data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.image_filename}></img></li>
            });
        }

        
        return (<div className="map-page-data-container">
            
           <ul>{markers}</ul>
            

        </div>)

    }


}