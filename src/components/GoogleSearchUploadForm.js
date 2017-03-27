import React from "react"
import uuid from "uuid"

import SimpleForm from "./SimpleForm"
import ImageUpload from "./ImageUpload"

export default class GoogleSearchUploadForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {


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
            image_url:null,

            tags:[],
            suggested_tags:[],
            suggested_tags_fetching:false,
            suggested_tags_error:null

        }

        this.onSimpleFormChange = this.onSimpleFormChange.bind(this)
        this.onImageUploadChange = this.onImageUploadChange.bind(this)


    }

    onImageUploadChange(imageUpload){
        switch (imageUpload.type) {
            case "image_uploaded":
                this.setState({image_url:imageUpload.image_url})
                break;
            default:

        }
    }
    onSimpleFormChange(formChange){

        //console.log(input);
        //console.log(formChange);

        switch (formChange.type) {
            case "location_name":
                //console.log(input.type,": ",input.value)
                this.setState({location_name:formChange.value})
                break;
            case "location_coordinates":
                this.setState({
                    location_lat:formChange.value.lat,
                    location_lng:formChange.value.lng
                })
                break;
            case "location_suggestion_fetching":
                this.setState({location_suggestion_fetching:formChange.value})
                break;
            case "location_suggestion":
                this.setState({location_suggestion:formChange.value})
                break;
            case "location_error":
                this.setState({location_error:formChange.value})
                break;
            case "age":
                this.setState({age:formChange.value})
                break;
            case "gender":
                this.setState({gender:formChange.value})
                break;
            case "nationality":
                this.setState({nationality:formChange.value})
                break;
            case "education":
                this.setState({education:formChange.value})
                break;


            default:

        }

    }

    render(){

        console.log(this.state);
        return (<div className="google-search-upload-form-component">
            <h3>Google Search Upload Page (component) </h3>
            <p><b>Instructions:</b> Cupcake ipsum dolor sit amet cookie. Cake lollipop muffin sugar plum.
                Chupa chups sugar plum powder. Toffee tart carrot cake chocolate cake gummi bears cheesecake.
Cotton candy pastry cake cotton candy pudding. Pastry powder dragée marshmallow macaroon
wafer caramels caramels. Jelly-o soufflé macaroon gingerbread candy soufflé.
 Candy jelly gummi bears tiramisu dragée chocolate cake biscuit.</p>
            <p><b>Step 1: Complete Form</b></p>

            <SimpleForm

                 location_name={this.state.location_name}
                 location_suggestion={this.state.location_suggestion}
                 location_suggestion_fetching={this.state.location_suggestion_fetching}
                 location_error={this.state.location_error}

                 age={this.state.age}
                 gender={this.state.gender}
                 nationality={this.state.nationality}
                 education={this.state.education}

                 onSimpleFormChange={this.onSimpleFormChange}
             />

            <br/>
            <p><b>Step 2: Upload Google Search Screenshot</b></p>

            <ImageUpload
                image_url={this.state.image_url}
                onImageUploadChange={this.onImageUploadChange}
                upload_folder="/images/"/>

        </div>)
    }




}
