import React from "react"

import GoogleSearchUploadForm from "./GoogleSearchUploadForm"

export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected_page:"upload", // options: upload | map


            location_name:'',
            location_lat:null,
            location_lng:null,
            location_suggestion_fetching:false,
            location_suggestion:null,
            location_error:null,

            age:"",
            gender:null,
            nationality:null,
            education:null,

            image_file:null,

            tag:"",
            tags:[

            ],
            suggested_tags:[],
            suggested_tags_fetching:false,
            suggested_tags_error:null,

            location_static_map:null,
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUploadFormItemUpdate = this.handleUploadFormItemUpdate.bind(this);
    }
    componentWillMount(){
        console.log("Layout component will mount");
    }
    componentDidMount(){
        console.log("Layout component did mount")
    }
    componentWillUnmount(){
        console.log("Layout component will unmount")
    }

    handleUploadFormItemUpdate(item){

        this.setState(item);

    }

    handleFormSubmit(){


        console.log("form submit clicked");
    }





    render(){


        return (
        <div className="layout-component">

            --- page buttons go here for ---

            <GoogleSearchUploadForm

                location_name={this.state.location_name}
                location_lat={this.state.location_lat}
                location_lng={this.state.location_lng}
                location_suggestion_fetching={this.state.location_suggestion_fetching}
                location_suggestion={this.state.location_suggestion}
                location_error={this.state.location_error}

                age={this.state.age}
                gender={this.state.gender}
                nationality={this.state.nationality}
                education={this.state.education}

                image_file={this.state.image_file}

                tag={this.state.tag}
                tags={this.state.tags}

                suggested_tags={this.state.suggested_tags}
                suggested_tags_fetching={this.state.suggested_tags_fetching}
                suggested_tags_error={this.state.suggested_tags_error}

                location_static_map={this.state.location_static_map}

                handleUploadFormItemUpdate={this.handleUploadFormItemUpdate}

            />


        </div>);
    }
}
