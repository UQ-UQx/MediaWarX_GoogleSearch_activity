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
            suggested_tags_error:null,

            staticmap_image_data:"https://www.rover.com/blog/wp-content/uploads/2015/05/dog-candy-junk-food-599x340.jpg",

            met_form_requirements:false
        }

        this.onSimpleFormChange = this.onSimpleFormChange.bind(this)
        this.onImageUploadChange = this.onImageUploadChange.bind(this)
        this.handleSavePDF = this.handleSavePDF.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

                if(formChange.value.lat && formChange.value.lng){
                    var locationString = formChange.value.lat+","+formChange.value.lng;

                    this.toDataURL(
                    "https://maps.googleapis.com/maps/api/staticmap?center="+locationString+"&zoom=5&scale=false&size=600x300&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:mid%7C"+locationString+"&key=**API_KEY**"
                    ,(url)=>{
                        console.log("stop");
                        this.setState({staticmap_image_data:url})
                    },
                    "jpg")
                }
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



    toDataURL(src, callback, outputFormat){
        var img = new Image();
          img.crossOrigin = 'Anonymous';
          img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.height;
            canvas.width = this.width;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback(dataURL);
          };
          img.src = src;
          if (img.complete || img.complete === undefined) {
            img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
            img.src = src;
          }
    }

    handleSavePDF(){

      console.log("handleSavePDF ", this.state)

    }

    handleSubmit(){
        console.log("handleSubmit ",this.state);
    }

    render(){

        var required = [
            "location_name",
            "location_lat",
            "location_lng",
            "age",
            "gender",
            "nationality",
            "education",
            "tags",
            "image_file"
        ]

        var metRequirements = true;
        _.each(required, (val, key)=>{
            if(!this.state[val]){
                //console.log(val);
                metRequirements = false;
            }
        })

        if(metRequirements){
            this.setState({met_form_requirements:metRequirements})
        }



        //console.log(this.state);
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
            <button class="btn btn-primary disabled" type="submit" onClick={this.handleSubmit}>Submit</button>&nbsp;
            <button class="btn btn-info" type="button" onClick={this.handleSavePDF}>Save as PDF</button>



        </div>)
    }




}
