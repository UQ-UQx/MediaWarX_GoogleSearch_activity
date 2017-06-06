import "../stylesheets/MapPageScreenshotViewerStyles.scss"


import React from "react"
import Gallery from '../libs/react-photo-gallery';

export default class MapPageScreenshotViewer extends React.Component {
    constructor(props){
        super(props)

        this.state={
            PHOTO_SET:[]
        }
        this.expandScreenShot = this.expandScreenShot.bind(this)
    }

    expandScreenShot(event){

        console.log("Clicked", event, this.props.markersInBounds[event].entry);
        
    }


    componentWillReceiveProps(){
        //console.log("SCREENSHOT PREVIEW VIEW DID MOUNT", this.props)

        var markers = [];
        var tags = [];
        var tagslis = [];
        var PHOTO_SET = [];
        if(this.props.markersInBounds){
            markers = this.props.markersInBounds.map(function(mark, ind){
                return <div className="col-xs-6 col-md-4 screenshot-preview-container" key={mark.user_id}><img src={"data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename}></img></div>
            });
            this.props.markersInBounds.forEach(function(mark, ind){

               var img = {
                        src: "data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename,
                        width: mark.entry.image_size.width,
                        height: mark.entry.image_size.height,
                        alt: 'image 1'
                }
                PHOTO_SET.push(img);
                mark.entry.tags.forEach(function(tag,ind){
                    tags.push(tag.tag);
                })
            });

            tagslis = tags.map(function(tag,ind){
                return <li key={ind}>{tag}</li>;
            });


            this.setState({PHOTO_SET:PHOTO_SET})

        }


    }


    render(){


        return(<div className="map-page-screenshot-viewer-container">
        <Gallery photos={this.state.PHOTO_SET} onClickPhoto={this.expandScreenShot} cols={3}
        
            onPhotoMouseOver={(k, e)=>{
                console.log(k, e, this.props.markersInBounds[k].entry)
            }}
        
            onPhotoMouseOut={(k, e)=>{
                console.log(k, e,   this.props.markersInBounds[k].entry)
            }}
        />
        
        <div className="testy" 
        
        onMouseOver={(k, e)=>{
            console.log("OVER",k, e)
        }}

        onMouseOut={(k, e)=>{
            console.log("OUT",k, e)
        }}
        
        ></div>
        
        </div>)
    }

}

