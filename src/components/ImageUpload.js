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

            <Imagedropzone


                image_file={this.props.image_file}
                onImageUploadChange={this.props.onImageUploadChange}

                submitted={this.props.submitted}

            />

            <Imagetagsinput

                allTags={this.props.allTags}
                tag={this.props.tag}
                handleTagInputChange={this.props.onImageUploadChange}
                tags={this.props.tags}
                suggested_tags={this.props.suggested_tags}
                suggested_tags_fetching={this.props.suggested_tags_fetching}
                submitted={this.props.submitted}

            />

        </div>)

    }

}
