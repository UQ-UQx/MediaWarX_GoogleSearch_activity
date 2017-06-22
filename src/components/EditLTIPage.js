import "../stylesheets/EditLTIPageStyles.scss"

import React from "react"

import axios from "axios"


export default class EditLTIPage extends React.Component {
    constructor(props){
        super(props)

       
    }



    render(){

        console.log(this.props.activity_title)

        return (<div className="edit-lti-page-component">

                title: <input type="text" name="temp_activity_title" onChange={this.props.handleEditPageChanges} placeholder="title" value={this.props.temp_activity_title}/>
            
        </div>)
    }

}
