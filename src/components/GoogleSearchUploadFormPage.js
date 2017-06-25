import "../stylesheets/GoogleSearchUploadFormStyles.scss"
import React from "react"
import uuid from "uuid"

import SimpleForm from "./SimpleForm"
import ImageUpload from "./ImageUpload"


import jsPDF from "../libs/jsPDF"

export default class GoogleSearchUploadForm extends React.Component {
    constructor(props){
        super(props);


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
            case "update_tags":
                this.props.handleUploadFormItemUpdate({tags:imageUpload.value})
                break;
            case "default_image_url":
                this.props.handleUploadFormItemUpdate({default_image_url:imageUpload.value})
            default:
        }

    }

    onSimpleFormChange(formChange){



        switch (formChange.type) {
            case "onBlur":
                this.props.handleFormInputOnBlur();
                break;
            case "location_name":
                ////console.log(input.type,": ",input.value)
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
                        //console.log("stop");
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
            case "dateOfCapture":
                this.props.handleUploadFormItemUpdate({dateOfCapture:formChange.value})
                break;
            case "device":
                this.props.handleUploadFormItemUpdate({device:formChange.value})
                break;
            case "agerange":
                this.props.handleUploadFormItemUpdate({agerange:formChange.value})
                break;
            case "country_of_newspaper":
                this.props.handleUploadFormItemUpdate({country_of_newspaper:formChange.value})
                break;
            case "name_of_newspaper":
                this.props.handleUploadFormItemUpdate({name_of_newspaper:formChange.value})
                break;
            case "name_of_photo_origin":
                this.props.handleUploadFormItemUpdate({name_of_photo_origin:formChange.value})
                break;
            case "caption_of_photo":
                this.props.handleUploadFormItemUpdate({caption_of_photo:formChange.value})
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
        //console.log("saving")

      //console.log("handleSavePDF ", this.props)
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

          doc.setFont("Arial")
          doc.setFontSize(10)
          doc.setFontType("bold")
          doc.text('Location: '+this.props.location_name, position.center, position.top+150, null, null, 'center')
          
          doc.setFont("Arial")
          doc.setFontSize(10)
          doc.setFontType("bold")
          doc.text('Age: '+this.props.age, position.center, position.top+155, null, null, 'center')
            
          doc.setFont("Arial")
          doc.setFontSize(10)
          doc.setFontType("bold")
          doc.text('Education: '+this.props.education, position.center, position.top+160, null, null, 'center')



          doc.addPage("a4", "p")

          doc.addImage(search_image_data, position.left, position.top+30, 190,95)




          doc.save('Test.pdf', (opt)=>{
              //console.log("saved", opt)
          })





      }, "jpeg")





    }

    handleSubmit(){
        //console.log("handleSubmit ",this.props);

        this.props.handleFormSubmit();
    }



    render(){


        var requirementsMet = this.props.submitRequirementsMet

        var disabled_class = "disabled"
        var disabled_prop = {disabled:false}
        if(requirementsMet){
            disabled_class = ""
            disabled_prop["disabled"] = false
        }

        
        var submitButton = (<button className={"btn btn-primary "+disabled_class} 
            type="submit" 
            onClick={this.handleSubmit} {...disabled_prop}>Submit</button>);

        var pdfButton = (<button className={"btn btn-info "} 
        type="button" onClick={this.handleSavePDF}>Save as PDF</button>)

        if(this.props.submitted){
            submitButton = ""
        }
        //console.log("FORM PAGE",this.props)



        let simpleFormComponent = ( <SimpleForm

                activity_form_inputs_array={this.props.activity_form_inputs_array}


                 location_name={this.props.location_name}
                 location_suggestion={this.props.location_suggestion}
                 location_suggestion_fetching={this.props.location_suggestion_fetching}
                 location_error={this.props.location_error}

                 age={this.props.age}
                 gender={this.props.gender}
                 nationality={this.props.nationality}
                 education={this.props.education}
                dateOfCapture={this.props.dateOfCapture}
                device={this.props.device}
                agerange={this.props.agerange}

                country_of_newspaper={this.props.country_of_newspaper}
                name_of_newspaper={this.props.name_of_newspaper}
                name_of_photo_origin={this.props.name_of_photo_origin}
                caption_of_photo={this.props.caption_of_photo}



                 onSimpleFormChange={this.onSimpleFormChange}

                submitted={this.props.submitted}


             />)
        //console.log("ROAR",this.props.activity_form_inputs_array)
        if(this.props.activity_form_inputs_array.length == 0){
            simpleFormComponent = ""
        }




        return (<div className="google-search-upload-form-component">
            <div className="title-instructions-container">
                <h3>{this.props.activity_title}</h3>
                <div className="activity-instructions-container"  dangerouslySetInnerHTML={{ __html: this.props.activity_instructions }}></div>
            </div>

            {simpleFormComponent}

            <br/>
            <p><b>Step 2: Upload Google Search Screenshot</b></p>

            <ImageUpload


                image_file={this.props.image_file}
                onImageUploadChange={this.onImageUploadChange}
                activity_tags={this.props.activity_tags}
                default_image_url={this.props.default_image_url}

                tags={this.props.tags}
                
                submitted={this.props.submitted}
            />

            <br/>
            {/* <button className={"btn btn-info "+disabled_class} type="button" onClick={requirementsMet ? this.handleSavePDF:null}>Save as PDF</button> */}
            {submitButton}
            {pdfButton}
        </div>)
    }




}
