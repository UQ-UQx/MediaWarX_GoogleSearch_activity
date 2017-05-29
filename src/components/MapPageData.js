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
                return <li key={ind}>{mark}</li>
            });
        }
        return (<div className="map-page-data-container">
            
           <ul>{markers}</ul>
            

        </div>)

    }


}