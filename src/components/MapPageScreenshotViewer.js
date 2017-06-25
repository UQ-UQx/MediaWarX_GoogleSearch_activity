import "../stylesheets/MapPageScreenshotViewerStyles.scss"


import React from "react"
import CheckBoxGroup from "./CheckBoxGroup"
import Gallery from '../libs/react-photo-gallery';
import moment from "moment";
import ReactModal from 'react-modal';

export default class MapPageScreenshotViewer extends React.Component {
    constructor(props){
        super(props)

        this.state={
            PHOTO_SET:[],
            modal_marker:null
        }
        this.expandScreenShot = this.expandScreenShot.bind(this)
        this.onScreenshotPreviewMouseOver = this.onScreenshotPreviewMouseOver.bind(this)
        this.onScreenshotPreviewMouseOut = this.onScreenshotPreviewMouseOut.bind(this)
        this.handleGalleryImageDetailsButton = this.handleGalleryImageDetailsButton.bind(this)
    }

    expandScreenShot(event){

        ////console.log("Clicked", event, this.props.markersInBounds[event].entry);

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
        

        ////console.log(this.props.mousedOverMarkers)
        this.props.markersInBounds[screenshotMarkerIndex].setAnimation(google.maps.Animation.BOUNCE);
        //this.props.handleMapPageStateUpdate({"mousedOverMarkers":[...this.props.mousedOverMarkers, this.props.markersInBounds[screenshotMarkerIndex]]})
      

       //console.log("moused over marker", this.props.markersInBounds[screenshotMarkerIndex])
        
        if(this.props.mousedOverMarkers.length > 0){
            this.props.handleMapPageStateUpdate({"mousedOverMarkers":[...this.props.mousedOverMarkers, this.props.markersInBounds[screenshotMarkerIndex]]})
        }else{
            this.props.handleMapPageStateUpdate({"mousedOverMarkers":[...this.props.mousedOverMarkers, this.props.markersInBounds[screenshotMarkerIndex]]})
        }
        
        var clusterToFocus = null;
            
        if(this.props.clusterer){
           // ////console.log(this.props.clusterer.getClusters())
            //////console.log(this.props)
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
        //////console.log("SCREENSHOT PREVIEW VIEW DID MOUNT", this.props)
       
       //  ////console.log("moused over marker in screenshot viewer",this.props.mousedOverMarkers)


    }

    handleGalleryImageDetailsButton(markerIndex,event){



        this.setState({
            modal_marker:!this.props.image_modal_open ? this.props.markersInBounds[markerIndex]:null
        })

        this.props.handleMapPageStateUpdate({
            image_modal_open:!this.props.image_modal_open
        })

    }


    render(){

        var markers = [];
        var tags = [];
        var tagslis = [];
        var PHOTO_SET = [];
        var self = this;
        if(this.props.markersInBounds){
            markers = this.props.markersInBounds.map(function(mark, ind){
                return <div className="col-xs-6 col-md-4 screenshot-preview-container" key={mark.user_id}><img src={"data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename}></img></div>
            });
            this.props.markersInBounds.forEach(function(mark, ind){

                var activeClassName = "";


                if(self.props.mousedOverMarkers){

                   self.props.mousedOverMarkers.forEach(function(mousedOverMarker, ind){

                        if(mousedOverMarker.id == mark.id){
                            activeClassName = "hovered_marker_screenshot";
                        }

                   })
                    
                }
               
            
                //console.log(mark);


                var img = {
                        src: "data/"+$LTI_resourceID+"/"+mark.user_id+"/"+mark.entry.image_filename,
                        width: mark.entry.image_size.width,
                        height: mark.entry.image_size.height,
                        alt: 'image 1',
                        activeClassName:activeClassName,
                        expandButton:true
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
       


        var modalContent = ""

        if(this.state.modal_marker){
            console.log("DA", this.props)
            let image_filename = this.state.modal_marker.entry.image_filename
            let modal_marker = this.state.modal_marker

            let keys = [
                "tags",
                "country_of_newspaper",
                "name_of_newspaper",
                "name_of_photo_origin",
                "caption_of_photo",
                "agerange",
                "gender",
                "education",
                "dateOfCapture",
                "device"
            ]

            let details = keys.map((item) => {
                
                switch (item) {
                    case "tags":
                        if(modal_marker.entry[item].length > 0){

                            let tagOptions = modal_marker.entry[item].map((tag) => {
                                return {
                                    value:tag,
                                }
                            })

                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Tags</label>
                                <div className="col-sm-10">
                                    <CheckBoxGroup
                                        options={tagOptions}
                                        disable={true}
                                    />
                                </div>
                            </div>)
                        }
                        break;
                    case "country_of_newspaper":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Country of news orginisation</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "name_of_newspaper":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Name of newspaper</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "name_of_photo_origin":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Photographer/Agency of photo</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "caption_of_photo":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Photo's caption</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "agerange":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Age Range</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "gender":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Gender</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "education":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Education</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    case "dateOfCapture":
                        if(modal_marker.entry["date_of_capture"]){
                            return (<div className="modal-details-item form-group" key={"details_"+item}>
                                <label className="col-sm-2 control-label">Date of Screencapture</label>
                                <div className="col-sm-10">{moment(modal_marker.entry["date_of_capture"]).format("Do MMM YYYY")}</div>
                            </div>)
                        }
                        break;
                    case "device":
                        if(modal_marker.entry[item]){
                            return (<div className="modal-details-item form-group"  key={"details_"+item}>
                                <label className="col-sm-2 control-label">Device</label>
                                <div className="col-sm-10">{modal_marker.entry[item]}</div>
                            </div>)
                        }
                        break;
                    default:
                        break;
                }


            })





            

            modalContent = (<div className="image-modal-content">

                <div className="form-horizontal">

                    {details}     
                </div>

                <img className="marker-modal-image" src={"data/"+modal_marker.lti_id+"/"+modal_marker.user_id+"/"+image_filename}
                
                    width={modal_marker.entry.image_size.width}
                    height={modal_marker.entry.image_size.height}
                ></img>
        
            </div>)

        }




        
        return(<div className="map-page-screenshot-viewer-container">
            
            <Gallery 
                photos={PHOTO_SET} 
                onClickPhoto={this.expandScreenShot} 
                cols={colNum}
                handleDetails={this.handleGalleryImageDetailsButton}
            
                onPhotoMouseOver={this.onScreenshotPreviewMouseOver}
                onPhotoMouseOut={this.onScreenshotPreviewMouseOut}
            />
            <ReactModal
            /*
                Boolean describing if the modal should be shown or not.
            */
                isOpen={this.props.image_modal_open}
                contentLabel="Minimal Modal Example"
                onRequestClose={this.handleGalleryImageDetailsButton}
                //className="image-modal"
            >

            <button className="btn btn-danger image-modal-close-button" onClick={this.handleGalleryImageDetailsButton}>Close</button>
            {modalContent}

            </ReactModal>
        
        </div>)
    }

}

