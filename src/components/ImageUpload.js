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


        console.log("custom tags", $LTI_CUSTOM_tags)

        let imaTagsInput = (<Imagetagsinput

               
                handleTagInputChange={this.props.onImageUploadChange}
                tags={this.props.tags}
                activity_tags={this.props.activity_tags}

               
                submitted={this.props.submitted}

            />);

        if(!$LTI_CUSTOM_tags || (this.props.activity_tags.length == 0)){
            imaTagsInput = ""
        }

        return(<div className="image-upload-component">

            <Imagedropzone


                image_file={this.props.image_file}
                onImageUploadChange={this.props.onImageUploadChange}

                submitted={this.props.submitted}

            />

            {imaTagsInput}
            

        </div>)

    }

}
