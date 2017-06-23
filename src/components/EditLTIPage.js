import "../stylesheets/EditLTIPageStyles.scss"

import React from "react"

import axios from "axios"
import CheckBoxGroup from "./CheckBoxGroup"

var list_items_options = [
        
                {
                    id:"location",
                    value:"Location"                            
                },
        
                {
                    id:"age",
                    value:"Age"                            
                },
        
                {
                    id:"gender",
                    value:"Gender"                            
                },
        
                {
                    id:"education",
                    value:"Education"                            
                },
        
                {
                    id:"date_of_capture",
                    value:"Date of screencapture"                            
                },
        
                {
                    id:"device",
                    value:"Device"                            
                },
        
                {
                    id:"country_of_newspaper",
                    value:"Country of newspaper"                            
                },
        
                {
                    id:"name_of_newspaper",
                    value:"Name of newspaper"                            
                },
        
                {
                    id:"name_of_photo_origin",
                    value:"Name of photo origin"                            
                },
                {
                    id:"caption_of_photo",
                    value:"Caption of photo"                            
                },
    ]


        
export default class EditLTIPage extends React.Component {
    constructor(props){
        super(props)

       this.state = {
           tags_string:props.temp_activity_tags.join(", "),
           
       }
       this.handleItemChange = this.handleItemChange.bind(this)
       this.handleFormItemListChange = this.handleFormItemListChange.bind(this)
    }

    handleFormItemListChange(name, selected_items){

        let selected_form_items = selected_items.map((item)=>{
            return item.id
        })

        //console.log(name,selected_items, selected_form_items)

        this.props.handleEditPageItemChange({
            [name]:selected_form_items
        })
    }

    handleItemChange(event){

        ////console.log(event, event.target, event.target.name, event.target.value);
        let value = event.target.value
        if(event.target.name == "temp_activity_tags"){

            this.setState({
                tags_string:value
            })
            
            value = event.target.value.replace(/(^[,\s]+)|([,\s]+$)/g, '')
                        .split(",").map((item)=>item.trim())
                        .filter((item)=>{return item != ""});
            
            
        }

        this.props.handleEditPageItemChange({
            [event.target.name]:value
        })

    }



    render(){

        //console.log(this.props)
        let commaSeparatedTagsText = this.state.tags_string//this.props.temp_activity_tags;
        if(this.props.temp_activity_tags){
            //console.log(this.props.temp_activity_tags)
           // commaSeparatedTagsText = this.props.temp_activity_tags.join(", ")

        }

        var ls = list_items_options.map((item)=>{
            let checked = false;
            if(_.indexOf(this.props.temp_activity_form_inputs_array,item.id) != -1){
                checked = true;
            }
            //console.log(checked)
            return (
                {
                    id:item.id,
                    value:item.value,
                    checked:checked
                }
            )
        })

 



        return (<div className="edit-lti-page-component">

             
                <div className="form-horizontal edit-page-form">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Activity Title</label>
                        <div className="col-sm-10">
                            <input 
                                type="text" 
                                className="form-control" 
                                name="temp_activity_title" 
                                placeholder="Enter Activity Title" 
                                value={this.props.temp_activity_title}
                                onChange={this.handleItemChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Activity Instructions (RAW HTML)</label>
                        <div className="col-sm-10">
                            <textarea 
                                type="text" 
                                className="form-control" 
                                name="temp_activity_instructions" 
                                placeholder="Enter RAW HTML of instructions to learners" 
                                value={this.props.temp_activity_instructions}
                                onChange={this.handleItemChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label preview-label">Activity Instructions (Preview)</label>
                        <div className="col-sm-10" id="rendered-instructions" dangerouslySetInnerHTML={{ __html: this.props.temp_activity_instructions }}>
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Activity Tags</label>
                        <div className="col-sm-10">

                            <textarea 
                                type="text" 
                                className="form-control" 
                                name="temp_activity_tags" 
                                placeholder="Enter tags using comma separation" 
                                value={commaSeparatedTagsText}
                                onChange={this.handleItemChange}
                            />
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Form Items</label>
                        <div className="col-sm-10">

                            <CheckBoxGroup 
                            
                                name="temp_activity_form_inputs_array"
                                options={ls}
                                onOptionChange={this.handleFormItemListChange}
                                returnVal="all"
                            />
                           
                        </div>
                    </div>
                </div>

        </div>)
    }

}
