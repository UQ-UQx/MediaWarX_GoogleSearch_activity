import "../stylesheets/MapPageScreenshotViewerStyles.scss"


import React from "react"
import Gallery from 'react-photo-gallery';

export default class MapPageScreenshotViewer extends React.Component {
    constructor(props){
        super(props)

    }


    render(){

        var markers = [];
        var tags = [];
        var tagslis = [];
        var PHOTO_SET = [];
        if(this.props.markersInBounds){
            markers = this.props.markersInBounds.map(function(mark, ind){
                return <div className="col-xs-6 col-md-4 screenshot-preview-container" key={mark.user_id}><img src={"data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename}></img></div>
            });
            this.props.markersInBounds.forEach(function(mark, ind){
                console.log("BLUE",mark);

               var img = {
                      src: "data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename,
                        width: mark.entry.image_size.width,
                        height: mark.entry.image_size.height,
                        alt: 'image 1'
                }
                console.log(img);
                PHOTO_SET.push(img);

                mark.entry.tags.forEach(function(tag,ind){
                    tags.push(tag.tag);
                })
            });

            tagslis = tags.map(function(tag,ind){
                return <li key={ind}>{tag}</li>;
            });



        }

      //  var PHOTO_SET = this.props.markersInBounds
      console.log(PHOTO_SET)

        return(<div className="map-page-screenshot-viewer-container">

            <Gallery photos={PHOTO_SET} onClickPhoto={this.props.expandScreenShot}/>
     
        
        </div>)
    }

}

