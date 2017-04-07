import React from "react"
import uuid from "uuid"

import SimpleForm from "./SimpleForm"
import ImageUpload from "./ImageUpload"

import each from "lodash/each"

import jsPDF from "jsPDF"

export default class GoogleSearchUploadForm extends React.Component {
    constructor(props){
        super(props);

        // this.props = {
        //
        //
        //
        // }

        this.onSimpleFormChange = this.onSimpleFormChange.bind(this)
        this.onImageUploadChange = this.onImageUploadChange.bind(this)
        this.handleSavePDF = this.handleSavePDF.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onImageUploadChange(imageUpload){
        switch (imageUpload.type) {
            case "image_file":
                this.props.handleUploadFormItemUpdate({image_file:imageUpload.value})
                break;
            case "tag":
                this.props.handleUploadFormItemUpdate({tag:imageUpload.value})
                break;
            case "add_tag":
                this.props.handleUploadFormItemUpdate({tags:[...this.props.tags, imageUpload.value]})
                break;
            case "remove_tag":
                this.props.handleUploadFormItemUpdate({tags:this.props.tags.filter(tag => tag.id !== imageUpload.value)})
                break;
            default:
        }

    }

    onSimpleFormChange(formChange){



        switch (formChange.type) {
            case "location_name":
                //console.log(input.type,": ",input.value)
                this.props.handleUploadFormItemUpdate({location_name:formChange.value})
                break;
            case "location_coordinates":
                this.props.handleUploadFormItemUpdate({
                    location_lat:formChange.value.lat,
                    location_lng:formChange.value.lng
                })

                if(formChange.value.lat && formChange.value.lng){
                    var locationString = formChange.value.lat+","+formChange.value.lng;

                    this.toDataURL(
                    "https://maps.googleapis.com/maps/api/staticmap?center="+locationString+"&zoom=5&scale=false&size=600x300&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:mid%7C"+locationString+"&key=**API_KEY**"
                    ,(url)=>{
                        console.log("stop");
                        this.props.handleUploadFormItemUpdate({location_static_map:url})
                    },
                    "jpg")
                }else{
                    this.props.handleUploadFormItemUpdate({location_static_map:null})
                }
                break;
            case "location_suggestion_fetching":
                this.props.handleUploadFormItemUpdate({location_suggestion_fetching:formChange.value})
                break;
            case "location_suggestion":
                this.props.handleUploadFormItemUpdate({location_suggestion:formChange.value})
                break;
            case "location_error":
                this.props.handleUploadFormItemUpdate({location_error:formChange.value})
                break;
            case "age":
                this.props.handleUploadFormItemUpdate({age:formChange.value})
                break;
            case "gender":
                this.props.handleUploadFormItemUpdate({gender:formChange.value})
                break;
            case "nationality":
                this.props.handleUploadFormItemUpdate({nationality:formChange.value})
                break;
            case "education":
                this.props.handleUploadFormItemUpdate({education:formChange.value})
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

      console.log("handleSavePDF ", this.props)
      this.toDataURL(this.props.image_file.preview, (search_image_data)=>{


          const position = {
              left: 10,
              top:15,
              center:105
          }

          let doc = new jsPDF("p", "mm", "a4")

          doc.setFont("Arial")
          doc.setFontSize(20)
          doc.setFontType("bold")
          doc.text('MediaWarX: Google Search Activity', position.center, position.top, null, null, 'center')

          doc.setFontSize(13)
          doc.setFontType("normal")
          doc.text('Unit 2: Name of the block', position.center, position.top+8, null, null, 'center')

          doc.addImage(this.props.location_static_map, position.left, position.top+30, 190,95)




          doc.addPage("a4", "p")

          doc.addImage(search_image_data, position.left, position.top+30, 190,95)




          doc.save('Test.pdf')





      }, "jpeg")





    }

    handleSubmit(){
        console.log("handleSubmit ",this.props);
    }

    checkRequirementsMet(){
        var required = [
            "location_name",
            "location_lat",
            "location_lng",
            "age",
            "gender",
            "nationality",
            "education",
            "tags",
            "location_static_map",
            "image_file"
        ]

        var metRequirements = true;
        console.log("--------------");

        each(required, (val, key)=>{
            if(!this.props[val]){
                console.log(val);
                metRequirements = false;
            }

            if(val == "tags"){
                if(this.props[val].length == 0){
                    console.log(val);
                    metRequirements = false;
                }
            }
        })


        return metRequirements
    }

    render(){

        var requirementsMet = this.checkRequirementsMet()

        var disabled_class = "disabled"
        if(requirementsMet){
            disabled_class = ""
        }

        console.log(this.props)

        //console.log(this.props);
        return (<div className="google-search-upload-form-component">
            <h3>Google Search Upload</h3>
            <p><b>Instructions:</b> Cupcake ipsum dolor sit amet cookie. Cake lollipop muffin sugar plum.
                Chupa chups sugar plum powder. Toffee tart carrot cake chocolate cake gummi bears cheesecake.
Cotton candy pastry cake cotton candy pudding. Pastry powder dragée marshmallow macaroon
wafer caramels caramels. Jelly-o soufflé macaroon gingerbread candy soufflé.
 Candy jelly gummi bears tiramisu dragée chocolate cake biscuit.</p>
            <p><b>Step 1: Complete Form</b></p>

            <SimpleForm

                 location_name={this.props.location_name}
                 location_suggestion={this.props.location_suggestion}
                 location_suggestion_fetching={this.props.location_suggestion_fetching}
                 location_error={this.props.location_error}

                 age={this.props.age}
                 gender={this.props.gender}
                 nationality={this.props.nationality}
                 education={this.props.education}

                 onSimpleFormChange={this.onSimpleFormChange}

             />

            <br/>
            <p><b>Step 2: Upload Google Search Screenshot</b></p>

            <ImageUpload

                image_file={this.props.image_file}
                onImageUploadChange={this.onImageUploadChange}

                tag={this.props.tag}
                tags={this.props.tags}
                suggested_tags={this.props.suggested_tags}
                suggested_tags_fetching={this.props.suggested_tags_fetching}

            />

            <br/>
            <button className={"btn btn-primary "+disabled_class} type="submit" onClick={requirementsMet ? this.handleSubmit:null}>Submit</button>&nbsp;
            {/* <button className={"btn btn-info "+disabled_class} type="button" onClick={requirementsMet ? this.handleSavePDF:null}>Save as PDF</button> */}
            <button className={"btn btn-info "} type="button" onClick={this.handleSavePDF}>Save as PDF</button>


        </div>)
    }




}
