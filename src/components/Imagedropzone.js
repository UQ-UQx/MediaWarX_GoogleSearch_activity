import React from "react"
import Dropzone from "react-dropzone"

export default class Imagedropzone extends React.Component{
    constructor(props){
        super(props)

        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(acceptedFiles, rejectedFiles){

        console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);

    }


    render(){


        return (<div className="image-drop-zone-container">


            this is where the image drop zone goes<br/>
            {this.props.children} - {this.props.upload_folder}

            <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                disableClick={false}
            />



        </div>)

    }
}
