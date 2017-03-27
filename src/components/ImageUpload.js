import "../stylesheets/ImageUploadStyles.scss"

import React from "react"
import Imagedropzone from "./Imagedropzone"
import Imagetagsinput from "./Imagetagsinput"

//onImageUploadChange

export default class ImageUpload extends React.Component {
    constructor(props){
        super(props)


    }


    render(){

        return(<div className="image-upload-component">

            <Imagedropzone upload_folder={this.props.upload_folder}>

                Image upload form. Upload to


            </Imagedropzone>

            <Imagetagsinput />

        </div>)

    }

}
