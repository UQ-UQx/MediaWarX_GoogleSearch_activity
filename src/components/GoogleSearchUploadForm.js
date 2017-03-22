import React from "react"
import uuid from "uuid"

import SimpleForm from "./SimpleForm"
import ImageUpload from "./ImageUpload"

export default class GoogleSearchUploadForm extends React.Component {
    constructor(props){
        super(props);

        const simpleFormStructure = [
            {
                id:uuid.v4(),
                label:"Location",
                type:"location",
                autosuggest:true,
            },
            {
                id:uuid.v4(),
                label:"Age",
                type:"textline",
                content_type:"number"

            },
            {
                id:uuid.v4(),
                label:"Gender",
                type:"dropdown",
                options:[
                    "Male",
                    "Female",
                    "Other"
                ]
            },
            {
                id:uuid.v4(),
                label:"Ethnicity",
                type:"textline",
                content_type:"string"
            },
            {
                id:uuid.v4(),
                label:"Education",
                type:"dropdown",
                options:[
                    "Primary School",
                    "Middle School",
                    "High School",
                    "Certificate",
                    "Diploma",
                    "Undergraduate Degree",
                    "Masters Degree",
                    "Doctor of Philsophy",
                    "Other"
                ]
            }
        ]

        var initalFormState = {};

        simpleFormStructure.map((obj, ind) => {
            initalFormState[obj.id] = {
                structure:obj,
                value:null
            };
        })

        this.state = {
            ...initalFormState,
            image_url:null,
            tags:[],
            simpleFormStructure:simpleFormStructure
        }

        this.onSimpleFormChange = this.onSimpleFormChange.bind(this)
    }

    onSimpleFormChange(values){

        console.log(values);
    }

    render(){

        /*

            label: any text you like, html can be included
            type:

            location-open (start typing an address)
            location-countries
            location-continents
            input-textline
            input-textarea



        */


        return (<div className="google-search-upload-form-component">
            <h3>Google Search Upload Page (component) </h3>
            <p><b>Instructions:</b> Cupcake ipsum dolor sit amet cookie. Cake lollipop muffin sugar plum.
                Chupa chups sugar plum powder. Toffee tart carrot cake chocolate cake gummi bears cheesecake.
Cotton candy pastry cake cotton candy pudding. Pastry powder dragée marshmallow macaroon
wafer caramels caramels. Jelly-o soufflé macaroon gingerbread candy soufflé.
 Candy jelly gummi bears tiramisu dragée chocolate cake biscuit.</p>
            <p><b>Step 1: Complete Form</b></p>

            <SimpleForm
                onChange={this.onSimpleFormChange}
                submitButton="false"
                structure={this.state.simpleFormStructure}
            />

            <br/>
            <p><b>Step 2: Upload Google Search Screenshot</b></p>

            <ImageUpload
                uploadTo="Folder name"
                handleUploaded=""
                imageTags="true"
                preview="true"
            />

        </div>)
    }




}
