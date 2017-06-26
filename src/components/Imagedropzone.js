import "../stylesheets/ImageDropZoneStyles.scss"

import React from "react"
import axios from "axios"
import CheckBoxGroup from "./CheckBoxGroup"
import Dropzone from "react-dropzone"

import { Icon } from "react-fa"


export default class Imagedropzone extends React.Component{
    constructor(props){
        super(props)

        this.onDrop = this.onDrop.bind(this)
        this.handleRemoveImageClick = this.handleRemoveImageClick.bind(this)
        this.handleDefaultImageClick = this.handleDefaultImageClick.bind(this)
    }

    handleRemoveImageClick(event){
        event.preventDefault()
        this.props.onImageUploadChange({
            type:"image_file",
            value:null
        })
        this.props.onImageUploadChange({
            type:"default_image_url",
            value:null
        })
    }

    handleDefaultImageClick(name, option){
        console.log(name, option)
        let value = "lib/images/unabletoaccess.png"

        if(option[0] == "uncomfortable"){
            value = "lib/images/uncomfortable.png"
        }
        
        this.props.onImageUploadChange({
            type:"default_image_url",
            value:value
        })

    }


    onDrop(acceptedFiles, rejectedFiles){
       console.log(acceptedFiles);

       
    
      this.props.onImageUploadChange({
          type:"image_file",
          value:acceptedFiles[0]
      })

    }


    render(){


        var dropzoneContent = null
        if(this.props.image_file || this.props.submitted || this.props.default_image_url){
            var url = "";
            
            

            if(this.props.default_image_url){
                url = this.props.default_image_url
            }else{
                url = this.props.image_file.preview
            }



            var removeImage = (<button className="btn btn-danger btn-sm image-remove-button"
                        onClick={this.handleRemoveImageClick}><Icon name="times"/> Remove Image
                    </button>)

            if(this.props.submitted){
                removeImage = ""
                url = "data/"+$LTI_resourceID+"/"+$LTI_userID+"/"+$LTI_userID+"_screencapture.jpg";
            }

            var imgEL = <img src={url}/>


            dropzoneContent = (

                <div className="dropzone-content-container">
                    {removeImage}
                    <div className="dropzone-content-image-container">
                        {imgEL}
                    </div>
                </div>
            )

        }else{

           
           var dropzone_options = [
                                    {id:"google",value:"Unable to access Google"},
                                    {id:"uncomfortable",value:"Uncomfortable uploading online"}
                                ]

            console.log(this.props)

            let other_options_title = "Other Options"

            var options = dropzone_options.filter(item=>{
                //console.log(item.id)
                if(_.indexOf(this.props.image_dropzone_options, item.id) != -1){
                    return item;
                }
            })

            if(options.length == 0){
                other_options_title = ""
            }

            dropzoneContent = (
                <div className="dropzone-content-container">
                    <div className="dropzone-content">
                        <div className="dropzone-content-item"> <Icon size="3x" name="cloud-upload"/></div>
                        <div className="dropzone-content-item">Drag and drop your screenshot image here or use the button below</div>
                        <div className="dropzone-content-item"><button className="btn btn-default" onClick={(event)=>{this.refs.image_dropzone.open()}}>Browse</button>
                        <hr/>
                        {other_options_title}
                        <CheckBoxGroup 
                            name="default_image_url_buttons"
                            className="clearfix image-dropzone-default-options-group"
                            itemClassName="image-dropzone-default-options-item"
                            type="radio"
                            options={
                                options
                            }
                            onOptionChange={this.handleDefaultImageClick}
                            returnVal="id"
                        /></div>
                    </div>
                </div>
            )

        }



        return (<div className="image-drop-zone-container">




            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                disableClick={true}//{this.props.image_file ? true : false}
                className="dropzone-normal"
                activeClassName="dropzone-active"
                ref="image_dropzone"
            >

                {dropzoneContent}

            </Dropzone>





        </div>)

    }
}
