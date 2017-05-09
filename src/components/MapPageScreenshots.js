import "../stylesheets/MapPageScreenshotsStyles.scss"


import React from "react"

export default class MapPageScreenshots extends React.Component {
    constructor(props){
        super(props)



    }

    componentDidMount(){

        console.log("Screenshots container did mount")

    }

    render(){



        return (<div className="map-page-screenshots-container">
            
            This is where screenshots will go

        </div>)

    }


}