import "../stylesheets/ImageDropZoneStyles.scss"

import React from "react"
import Dropzone from "react-dropzone"

import { Icon } from "react-fa"


export default class Imagedropzone extends React.Component{
    constructor(props){
        super(props)

        this.onDrop = this.onDrop.bind(this)
        this.handleRemoveImageClick = this.handleRemoveImageClick.bind(this)
    }

    handleRemoveImageClick(event){
        event.preventDefault()
        this.props.onImageUploadChange({
            type:"image_file",
            value:null
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
        if(this.props.image_file){

            dropzoneContent = (

                <div className="dropzone-content-container">
                    <button className="btn btn-danger btn-sm image-remove-button"
                        onClick={this.handleRemoveImageClick}><Icon name="times"/> Remove Image
                    </button>
                    <div className="dropzone-content-image-container">
                        <img src={this.props.image_file.preview}/>
                    </div>
                </div>
            )

        }else{

            dropzoneContent = (
                <div className="dropzone-content-container">
                    <div className="dropzone-content">
                        <div className="dropzone-content-item"> <Icon size="3x" name="cloud-upload"/></div>
                        <div className="dropzone-content-item">Drag and drop your screenshot image here or use the button below</div>
                        <div className="dropzone-content-item"><button className="btn btn-default">Browse</button></div>
                    </div>
                </div>
            )


        }



        return (<div className="image-drop-zone-container">




            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                disableClick={this.props.image_file ? true : false}
                className="dropzone-normal"
                activeClassName="dropzone-active"
            >

                {dropzoneContent}

            </Dropzone>





        </div>)

    }
}
