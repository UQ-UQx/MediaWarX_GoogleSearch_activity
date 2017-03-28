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

            image_file:null,

            tag:"",
            tags:[

            ],
            suggested_tags:[],
            suggested_tags_fetching:false,
            suggested_tags_error:null

        }

        this.onSimpleFormChange = this.onSimpleFormChange.bind(this)
        this.onImageUploadChange = this.onImageUploadChange.bind(this)

    }

    onImageUploadChange(imageUpload){
        switch (imageUpload.type) {
            case "image_file":
                this.setState({image_file:imageUpload.value})
                break;
            case "tag":
                this.setState({tag:imageUpload.value})
                break;
            case "add_tag":
                this.setState({tags:[...this.state.tags, imageUpload.value]})
                break;
            case "remove_tag":
                this.setState({tags:this.state.tags.filter(tag => tag.id !== imageUpload.value)})
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
            <h3>Google Search Upload</h3>
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
                image_file={this.state.image_file}
                onImageUploadChange={this.onImageUploadChange}

                tag={this.state.tag}
                tags={this.state.tags}
                suggested_tags={this.state.suggested_tags}
                suggested_tags_fetching={this.state.suggested_tags_fetching}

            />

            <br/>
            <button class="btn btn-primary disabled" type="submit">Submit</button>&nbsp;
            <button class="btn btn-info" type="button">Save as PDF</button>


        </div>)
    }




}
