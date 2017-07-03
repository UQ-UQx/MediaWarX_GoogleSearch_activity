import "../stylesheets/GoogleSearchUploadFormStyles.scss"
import React from "react"
import uuid from "uuid"

import SimpleForm from "./SimpleForm"
import ImageUpload from "./ImageUpload"

import jsPDF from "../libs/jsPDF"

import moment from "moment";

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
                    "https://maps.googleapis.com/maps/api/staticmap?center="+locationString+"&zoom=5&scale=false&size=600x300&maptype=roadmap&format=jpg&visual_refresh=true&markers=size:mid%7C"+locationString+"&key=AIzaSyBQ7RQL3LDtmQ4ccxW_uBZLflfETkaKE6U"
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

    // toDataUrl(file,callback) {
    //        var xhr = new XMLHttpRequest();
    //           xhr.responseType = 'blob';
    //           xhr.onload = function() {
    //          var reader = new FileReader();
    //          reader.onloadend = function() {
    //           callback(reader.result);
    //        }
    //          reader.readAsDataURL(xhr.response);
    //       };
    //        xhr.open('GET', file);
    //        xhr.send();
    // }

    handleSavePDF(event){

        let url = "data/"+$LTI_resourceID+"/"+$LTI_userID+"/"+$LTI_userID+"_screencapture.jpg"
        //let url = "data/courses.edx.org-aa766098b5a94a738b54e89caf3a8973/f770caedc6d860f087297810891526d7user/f770caedc6d860f087297810891526d7user_screencapture.jpg"
        console.log(url)

        let keys = [
            {
                id:"tags",
                label:"Tags"
            },
            {
                id:"location_name",
                label:"Location"
            },
            {
                id:"country_of_newspaper",
                label:"Country of news organisation"
            },
            {
                id:"name_of_newspaper",
                label:"Name of newspaper"
            },
            {
                id:"name_of_photo_origin",
                label:"Photographer/Agency of photo"
            },
            {
                id:"caption_of_photo",
                label:"Photo's caption"
            },
            {
                id:"agerange",
                label:"Age Range"
            },
            {
                id:"gender",
                label:"Gender"
            },
            {
                id:"education",
                label:"Education"
            },
            {
                id:"dateOfCapture",
                label:"Date of screencapture"
            },
            {
                id:"device",
                label:"Device"
            }
        ]







        this.toDataURL(url,imageData=>{
            
            let info = keys.map(item=>{
                if(this.props[item.id]){

                    let val = this.props[item.id]

                    if(item.id == "dateOfCapture"){
                        console.log(val)
                        val = moment(this.props[item.id]).format("Do MMM YYYY")
                    }

                    if(item.id == "tags"){
                        if(this.props[item.id].length == 0){
                            return []
                        }
                    }
                
                    return [
                        {   text: item.label+"\n", style: 'subheader'},
                        {
                            text: val+"\n\n"
                        }
                    ]

                }
                return {};

            })

            var docDefinition = { 
            content:[
                {
                    text:this.props.activity_title+"\n\n\n",
                    style:"header"
                },
                ...info,

                {
                    image: imageData,
                    width:500
                }


            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                    
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }};

            pdfMake.createPdf(docDefinition).download('optionalName.pdf');
    
        
        })





    }

    handleSubmit(){

        if((this.props.location_lat && this.props.location_lng) && (this.props.default_image_url || this.props.image_file)){
            
                this.props.handleFormSubmit()
            
        }
    }



    render(){


        var requirementsMet = this.props.submitRequirementsMet

        var disabled_class = "disabled"
        var disabled_prop = {disabled:true}
        console.log(this.props)
        if((this.props.location_lat && this.props.location_lng) && (this.props.default_image_url || this.props.image_file)){
            //if((this.props.activity_tags.length > 0) && (this.props.tags.length > 0)){
                disabled_class = ""
                disabled_prop["disabled"] = false
            //}
        }

        
        var submitButton = (<button className={"btn btn-primary "+disabled_class} 
            type="submit" 
            onClick={this.handleSubmit} {...disabled_prop}>Submit</button>);

        var pdfButton = ""

        if(this.props.submitted){
            submitButton = ""
            pdfButton = (<button className={"btn btn-info "} 
                            type="button" onClick={this.handleSavePDF}>Save as PDF</button>)
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

            <ImageUpload


                image_file={this.props.image_file}
                onImageUploadChange={this.onImageUploadChange}
                activity_tags={this.props.activity_tags}
                default_image_url={this.props.default_image_url}

                tags={this.props.tags}
                            image_dropzone_options = {this.props.image_dropzone_options}

                submitted={this.props.submitted}
            />

            <br/>
            {/* <button className={"btn btn-info "+disabled_class} type="button" onClick={requirementsMet ? this.handleSavePDF:null}>Save as PDF</button> */}
            {submitButton}
            {pdfButton}
        </div>)
    }




}
