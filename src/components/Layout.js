import "../stylesheets/LayoutStyles.scss"

import React from "react"

import axios from "axios"

import GoogleSearchUploadFormPage from "./GoogleSearchUploadFormPage"
import GoogleSearchMapPage from "./GoogleSearchMapPage"
import EditLTIPage from "./EditLTIPage"

import each from "lodash/each"


export default class Layout extends React.Component {


    constructor(props){
        super(props);

         this.required = [
            "location_name",
            "location_lat",
            "location_lng",
            "country_of_newspaper",
            "name_of_newspaper",
            "name_of_photo_origin",
            "caption_of_photo",
            "agerange",
            "gender",
            "education",
            "dateOfCapture",
            "device"
        ]

// Country of the newspaper
// Name of the newspaper
// Name of the photographer and/or agency that provided the picture (if neither, write ‘not available’)
// Caption that accompanies the photo

        var defaultState = {
            selected_page:"form_page", // options: form_page | map_page
            editing_lti:false,

            location_name:'',
            location_lat:null,
            location_lng:null,
            location_suggestion_fetching:false,
            location_suggestion:null,
            location_error:null,

            country_of_newspaper:null,
            name_of_newspaper:"",
            name_of_photo_origin:"",
            caption_of_photo:"",

            age:"",
            agerange:null,
            gender:null,
            nationality:null,
            education:null,
            dateOfCapture:null,
            device:null,
            
            image_file:null,
            default_image_url:null,

            allTags:[
                
            ],
            tags:[
                
            ],

            location_static_map:null,
            submitted:false,

            map:null,
            markers:[],
            markersInBounds:[],
            hiddenMarkers:[],
            clusterer:null,
            

            mousedOverMarkers:[],

            clusterToFocus:null, 

            activeMarker:null,

            filter_genders:[],
            filter_educations:[],
            filter_devices:[],
            filter_ageranges:[],
            filter_age_min:null,
            filter_age_max:null,
            filter_tags:[],
            filter_date_start:null,
            filter_date_end:null,


            activity_title:"Title yay",
            activity_instructions:"activity instructions",
            activity_tags:[],
            activity_form_inputs_array:["location"],
            
            temp_activity_title:"Title yay",
            temp_activity_instructions:"activity instructions",
            temp_activity_form_inputs_array:["location"],
            temp_activity_tags:[],

            submitRequirementsMet:true,

            image_modal_open:false,
            image_dropzone_options:[]
        }

        this.state = {
            ...defaultState, 
            ...props.appState
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleUploadFormItemUpdate = this.handleUploadFormItemUpdate.bind(this);
        this.checkFormRequirementsMet = this.checkFormRequirementsMet.bind(this);

        this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
        this.handleFormInputOnBlur = this.handleFormInputOnBlur.bind(this);
        this.handleMapPageStateUpdate = this.handleMapPageStateUpdate.bind(this);
        this.handleEditPageItemChange = this.handleEditPageItemChange.bind(this);

        this.handleEditSaveChangesClick = this.handleEditSaveChangesClick.bind(this);

    }
    componentWillMount(){
        ////console.log("Layout component will mount")
        
    }
    componentDidMount(){
        ////console.log("Layout component did mount");

        this.setState({
            temp_activity_form_inputs_array:this.state.activity_form_inputs_array
        })

    }
    componentWillUnmount(){
        ////console.log("Layout component will unmount")
    }

    updateStateWithServerValues(serverState){

        this.setState(serverState)

    }
    handleUploadFormItemUpdate(item){

        this.setState(item);

    }

    handleFormInputOnBlur(){

        ////console.log("Bluredd");

    }


    // uploadImage(){
    //     const postData = new FormData();
    //     postData.append('file', this.state.image_file);
    //     postData.append('action', "uploadFile");
    //     postData.append('state', {...this.state, "location_static_map":""});
    //     postData.append('user_id', "user5");
    //     postData.append('lti_id',"lti23");
    //     return axios.post('../public/api/api.php', postData);
    // }
    
    

    // uploadFormData(){
    //     return axios.get('../public/api/api.php', {
    //         params: {
    //             action: "setUserState",
    //             data:{
    //                 state: {...this.state, "location_static_map":""},
    //                 user_id: "user5",
    //                 lti_id: "lti23"
    //             }
    //         }
    //     })
    // }
    handleFormSubmit(){
        ////console.log("form submit clicked");
        //console.log(this.state);
        var app = this;
        const postData = new FormData();
        postData.append('file', this.state.image_file);
        postData.append('action', "formSubmit");
        postData.append('app_state', JSON.stringify({...this.state, "location_static_map":""}));
        postData.append('user_id', $LTI_userID);
        postData.append('lti_id', $LTI_resourceID);

        postData.append('lti_grade_url', $LTI_grade_url);
        postData.append('lti_consumer_key', $LTI_consumer_key);
        postData.append('result_sourcedid', $LTI_result_sourcedid);


        axios.post('../public/api/api.php', postData)
        .then(function(response){

            ////console.log("Single Post Success: 😃",response)
                    //this.setState({"selected_page":"map_page"})
            app.setState(response.data);
            

        }).catch(function(error){

            ////console.log("Single Post Fail: 😡",error.response);

        });


    }

    checkFormRequirementsMet(){



        this.required.forEach((item, ind)=>{


            

        });













        
       
        // var metRequirements = true;
        // //////console.log("--------------");

        // each(this.required, (val, key)=>{
        //     if(!this.state[val]){
        //         //////console.log(val);
        //         metRequirements = false;
        //     }

        //     if(val == "tags"){
        //         if(this.state[val].length == 0){
        //             //////console.log(val);
        //             metRequirements = false;
        //         }
        //     }
        // })


       // return metRequirements
       return true
    }
    handlePageButtonClick(page){

        ////console.log("Page button clicked", page);

        let editing_status = false;
        if(page == "edit_page"){
            editing_status = true;
        }

        this.setState({
            "selected_page":page,
            "editing_lti":editing_status,
        })


    }

    handleMapPageStateUpdate(item){
        //////console.log(item);
        this.setState(item)
    }
    

    renderGoogleSearchUploadFormPage(){
        return (<GoogleSearchUploadFormPage

            activity_title={this.state.activity_title}
            activity_instructions={this.state.activity_instructions}
            activity_form_inputs_array={this.state.activity_form_inputs_array}
            activity_tags={this.state.activity_tags}

            location_name={this.state.location_name}
            location_lat={this.state.location_lat}
            location_lng={this.state.location_lng}
            location_suggestion_fetching={this.state.location_suggestion_fetching}
            location_suggestion={this.state.location_suggestion}
            location_error={this.state.location_error}

            age={this.state.age}
            agerange={this.state.agerange}
            gender={this.state.gender}
            nationality={this.state.nationality}
            education={this.state.education}
            dateOfCapture={this.state.dateOfCapture}
            device={this.state.device}

            


            country_of_newspaper={this.state.country_of_newspaper}
            name_of_newspaper={this.state.name_of_newspaper}
            name_of_photo_origin={this.state.name_of_photo_origin}
            caption_of_photo={this.state.caption_of_photo}

            image_file={this.state.image_file}

            allTags={this.state.allTags}

            tags={this.state.tags}

            default_image_url={this.state.default_image_url}

            location_static_map={this.state.location_static_map}

            submitRequirementsMet={this.state.submitRequirementsMet}
            handleUploadFormItemUpdate={this.handleUploadFormItemUpdate}
            handleFormSubmit={this.handleFormSubmit}
            handleFormInputOnBlur={this.handleFormInputOnBlur}

            image_dropzone_options = {this.state.image_dropzone_options}

            submitted={this.state.submitted}

        />)
    }
    renderGoogleSearchMapPage(){
        //console.log(this.state.activity_form_inputs_array)
        return(<GoogleSearchMapPage

            location={{lat:this.state.location_lat,lng:this.state.location_lng}}
            map={this.state.map}
            markers={this.state.markers}
            markersInBounds={this.state.markersInBounds}
            hiddenMarkers={this.state.hiddenMarkers}
             default_image_url={this.state.default_image_url}

            clusterer={this.state.clusterer}
            mousedOverMarkers={this.state.mousedOverMarkers}
            handleMapPageStateUpdate={this.handleMapPageStateUpdate}

            clusterToFocus={this.state.clusterToFocus}

            filter_genders={this.state.filter_genders}
            filter_educations={this.state.filter_educations}
            filter_devices={this.state.filter_devices}
            filter_tags={this.state.filter_tags}
            filter_ageranges={this.state.filter_ageranges}
            filter_date_start={this.state.filter_date_start}
            filter_date_end={this.state.filter_date_end}
            allTags={this.state.allTags}

            activity_form_inputs_array = {this.state.activity_form_inputs_array}
            activity_tags = {this.state.activity_tags}
            image_modal_open = {this.state.image_modal_open}
        />)
    }

    renderEditPage(){

        return(<EditLTIPage 
        
            handleEditPageItemChange={this.handleEditPageItemChange}
            temp_activity_title = {this.state.temp_activity_title}
            temp_activity_instructions = {this.state.temp_activity_instructions}
            temp_activity_form_inputs_array = {this.state.temp_activity_form_inputs_array}
            temp_activity_tags = {this.state.temp_activity_tags}
            image_dropzone_options = {this.state.image_dropzone_options}
            
        />)

    }

    handleEditPageItemChange(item){
        this.setState(item)   
    }

    handleEditSaveChangesClick(event){

        console.log("save click", this.state);

         this.setState({
            activity_title:this.state.temp_activity_title,
            activity_instructions:this.state.temp_activity_instructions,
            activity_form_inputs_array:this.state.temp_activity_form_inputs_array,
            activity_tags:[...this.state.temp_activity_tags]
        })

        var self = this;
        const postData = new FormData();
        postData.append('action', "setAppSettings");
        postData.append('app_settings', JSON.stringify({
            activity_title:this.state.temp_activity_title,
            activity_instructions:this.state.temp_activity_instructions,
            activity_form_inputs_array:this.state.temp_activity_form_inputs_array,
            activity_tags:this.state.temp_activity_tags,
            image_dropzone_options:this.state.image_dropzone_options
        }));
        postData.append('lti_id', $LTI_resourceID);
        axios.post('../public/api/api.php', postData)
        .then(function(response){
            
        }).catch(function(error){

        });


        

        this.handlePageButtonClick("form_page")

    }



    render(){
    
       //console.log("Layout",this.state)

        


        var page = this.renderGoogleSearchUploadFormPage();

        switch (this.state.selected_page) {
            case "form_page":
                page = this.renderGoogleSearchUploadFormPage()
                break;
            case "map_page":
                page = this.renderGoogleSearchMapPage()
                break;
            case "edit_page":
                page = this.renderEditPage()
                break;
            default:
        }

        let uploadPageActiveClass = "";
        let mapPageActiveClass = "";

        this.state.selected_page == "form_page" ? uploadPageActiveClass = "active":null
        this.state.selected_page == "map_page" ? mapPageActiveClass = "active":null


        let uploadFormPageButton = <button  type="button" className={"btn btn-default btn-med page-button "+uploadPageActiveClass} 
                                onClick={()=>this.handlePageButtonClick("form_page")}>Upload Form</button>

        let mapPageDisabledClass = "disabled"
        let mapPageDisabledProp = {disabled:true}

        if(this.state.submitted){
            mapPageDisabledClass = ""
            mapPageDisabledProp = ""
        }
        let mapPageButton = <button  type="button" className={"btn btn-default btn-med page-button "+mapPageActiveClass+" "+mapPageDisabledClass}
                                onClick={()=>this.handlePageButtonClick("map_page")} {...mapPageDisabledProp}>Map Page</button>
        
        let edit_lti_button = ""
        let cancel_button = ""
        
        if($LTI_user_roles == "Instructor"){
            if(this.state.editing_lti){
                uploadFormPageButton = ""
                mapPageButton = ""

                edit_lti_button = <button className="btn btn-warning btn-med edit-lti-button" 
                                        onClick={this.handleEditSaveChangesClick}>Save Changes</button>

                cancel_button = <button className="btn btn-default btn-med edit-lti-button" 
                                        onClick={()=>{this.handlePageButtonClick("form_page")}}>Cancel</button>

            }else{
                edit_lti_button = <button className="btn btn-danger btn-med edit-lti-button" 
                                        onClick={()=>this.handlePageButtonClick("edit_page")}>Edit LTI</button>
            }
        }



        return (
        <div className="layout-component">


                <div class='wrapper text-center application-buttons-container'>
                    <div class="btn-group">
                        {uploadFormPageButton}
                        {mapPageButton}
                        {cancel_button}
                        {edit_lti_button}
                    </div>
                </div>

          
            <div className="page-content-containers page-container clearfix">{page}</div>

        </div>);
    }
}
