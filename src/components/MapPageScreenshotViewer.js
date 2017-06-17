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
        this.onScreenshotPreviewMouseOver = this.onScreenshotPreviewMouseOver.bind(this)
        this.onScreenshotPreviewMouseOut = this.onScreenshotPreviewMouseOut.bind(this)
    }

    expandScreenShot(event){

        //console.log("Clicked", event, this.props.markersInBounds[event].entry);

        this.props.markersInBounds[event].setAnimation(null);
        this.props.handleMapPageStateUpdate({mousedOverMarkers:[]})

        if(this.props.clusterToFocus){
            
            // this.props.clusterToFocus.clusterIcon_.div_.className = this.props.clusterToFocus.clusterIcon_.div_.className
            // .replace(new RegExp('(?:^|\\s)'+ 'cluster-to-highlight' + '(?:\\s|$)'), ' ');
                    
            this.props.handleMapPageStateUpdate({clusterToFocus:null});

        }

        this.props.map.setZoom(17);
        this.props.map.panTo(this.props.markersInBounds[event].position);
        
    }

    onScreenshotPreviewMouseOver(screenshotMarkerIndex, event){
        

        //console.log(this.props.mousedOverMarkers)
        this.props.markersInBounds[screenshotMarkerIndex].setAnimation(google.maps.Animation.BOUNCE);
        //this.props.handleMapPageStateUpdate({"mousedOverMarkers":[...this.props.mousedOverMarkers, this.props.markersInBounds[screenshotMarkerIndex]]})
      

       
        
        if(this.props.mousedOverMarkers.length > 0){
            this.props.handleMapPageStateUpdate({"mousedOverMarkers":[...this.props.mousedOverMarkers, this.props.markersInBounds[screenshotMarkerIndex]]})
        }else{
            this.props.handleMapPageStateUpdate({"mousedOverMarkers":[...this.props.mousedOverMarkers, this.props.markersInBounds[screenshotMarkerIndex]]})
        }
        
        var clusterToFocus = null;
            
        if(this.props.clusterer){
           // //console.log(this.props.clusterer.getClusters())
            ////console.log(this.props)
            let allClusters = this.props.clusterer.getClusters();
            
            let self = this;
            allClusters.forEach(function(cluster, ind){
                var clusterMarkers = cluster.getMarkers()
                if(clusterMarkers.length > 1){
                    clusterMarkers.forEach(function(marker, ind){
                        if(marker == self.props.markersInBounds[screenshotMarkerIndex]){
                            clusterToFocus = cluster;
                            self.props.handleMapPageStateUpdate({clusterToFocus:clusterToFocus});
                        }
                    });
                }
            });
        }  


    }

    onScreenshotPreviewMouseOut(screenshotMarkerIndex, event){

        this.props.markersInBounds[screenshotMarkerIndex].setAnimation(null);
        this.props.handleMapPageStateUpdate({mousedOverMarkers:[]})

        if(this.props.clusterToFocus){
            
            // this.props.clusterToFocus.clusterIcon_.div_.className = this.props.clusterToFocus.clusterIcon_.div_.className
            // .replace(new RegExp('(?:^|\\s)'+ 'cluster-to-highlight' + '(?:\\s|$)'), ' ');
                    
            this.props.handleMapPageStateUpdate({clusterToFocus:null});

        }
       
  
        

    }

    componentWillReceiveProps(){
        ////console.log("SCREENSHOT PREVIEW VIEW DID MOUNT", this.props)
       
       //  //console.log("moused over marker in screenshot viewer",this.props.mousedOverMarkers)


    }


    render(){

        var markers = [];
        var tags = [];
        var tagslis = [];
        var PHOTO_SET = [];
        var componentThis = this;
        if(this.props.markersInBounds){
            markers = this.props.markersInBounds.map(function(mark, ind){
                return <div className="col-xs-6 col-md-4 screenshot-preview-container" key={mark.user_id}><img src={"data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename}></img></div>
            });
            this.props.markersInBounds.forEach(function(mark, ind){

               var activeClassName = "";


               if(componentThis.props.mousedOverMarkers){

                   componentThis.props.mousedOverMarkers.forEach(function(mousedOverMarker, ind){

                        if(mousedOverMarker.id == mark.id){
                            activeClassName = "hovered_marker_screenshot";
                        }

                   })
                    
               }
               

               var img = {
                        src: "data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename,
                        width: mark.entry.image_size.width,
                        height: mark.entry.image_size.height,
                        alt: 'image 1',
                        activeClassName:activeClassName

                }

                if(mark.getVisible()){
                    PHOTO_SET.push(img);
                }

                mark.entry.tags.forEach(function(tag,ind){
                    tags.push(tag.tag);
                })
            });

            tagslis = tags.map(function(tag,ind){
                return <li key={ind}>{tag}</li>;
            });

        }

        var colNum = 3;

        if(PHOTO_SET.length < 3){
            colNum = PHOTO_SET.length
        }
       

        
        return(<div className="map-page-screenshot-viewer-container">
            
            <Gallery 
                photos={PHOTO_SET} 
                onClickPhoto={this.expandScreenShot} 
                cols={colNum}
            
                onPhotoMouseOver={this.onScreenshotPreviewMouseOver}
                onPhotoMouseOut={this.onScreenshotPreviewMouseOut}
            />

        
        </div>)
    }

}

