import "../stylesheets/EditLTIPageStyles.scss"

import React from "react"

import axios from "axios"
import CheckBoxGroup from "./CheckBoxGroup"


export default class EditLTIPage extends React.Component {
    constructor(props){
        super(props)

       
       this.handleItemChange = this.handleItemChange.bind(this)
    }

    // temp_activity_title:"",
    // temp_activity_instructions:"",
    // temp_activity_form_inputs:[],
    // temp_activity_tags:[]

    handleItemChange(event){

        console.log(event, event.target, event.target.name, event.target.value);

        this.props.handleEditPageItemChange({
            [event.target.name]:event.target.value
        })

    }


    render(){

        console.log(this.props.activity_title)

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
                        <div className="col-sm-10" id="rendered-instructions">
                           
                        </div>
                    </div>
                </div>

        </div>)
    }

}
