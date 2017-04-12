import React from "react"

import GoogleSearchUploadFormPage from "./GoogleSearchUploadFormPage"
import GoogleSearchMapPage from "./GoogleSearchMapPage"

import each from "lodash/each"


export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected_page:"map_page", // options: form_page | map_page

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
        this.checkFormRequirementsMet = this.checkFormRequirementsMet.bind(this);

        this.handlePageButtonClick = this.handlePageButtonClick.bind(this);
        // this.handleUploadFormPageButtonClick = this.handleUploadFormPageButtonClick.bind(this);
        // this.handleMapPageButtonClick = this.handleMapPageButtonClick.bind(this);
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
    checkFormRequirementsMet(){
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
        //console.log("--------------");

        each(required, (val, key)=>{
            if(!this.state[val]){
                //console.log(val);
                metRequirements = false;
            }

            if(val == "tags"){
                if(this.state[val].length == 0){
                    //console.log(val);
                    metRequirements = false;
                }
            }
        })


        return metRequirements
    }
    handlePageButtonClick(page){

        console.log("Page button clicked", page);

        this.setState({"selected_page":page})

    }
    renderGoogleSearchUploadFormPage(){
        return (<GoogleSearchUploadFormPage

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

            checkFormRequirementsMet={this.checkFormRequirementsMet}
            handleUploadFormItemUpdate={this.handleUploadFormItemUpdate}
            handleFormSubmit={this.handleFormSubmit}

        />)
    }
    renderGoogleSearchMapPage(){
        return(<GoogleSearchMapPage

            location={{lat:this.state.location_lat,lng:this.state.location_lng}}

        />)
    }

    render(){

        var page = this.renderGoogleSearchUploadFormPage();

        switch (this.state.selected_page) {
            case "form_page":
                page = this.renderGoogleSearchUploadFormPage()
                break;
            case "map_page":
                page = this.renderGoogleSearchMapPage()
                break;
            default:
        }


        return (
        <div className="layout-component">

            <button className="btn btn-default btn-med page-button" onClick={()=>this.handlePageButtonClick("form_page")}>Upload Form</button>
            <button className="btn btn-default btn-med page-button" onClick={()=>this.handlePageButtonClick("map_page")}>Map Page</button>

            {page}

        </div>);
    }
}
