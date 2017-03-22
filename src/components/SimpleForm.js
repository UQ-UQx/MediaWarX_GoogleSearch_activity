import React from "react"
import uuid from "uuid"

import LocationInput from "./LocationInput"
import Autocomplete from 'react-google-autocomplete';

export default class SimpleForm extends React.Component {
    constructor(props){
        super(props);

        console.log(this.props)

        this.onSimpleFormItemChange = this.onSimpleFormItemChange.bind(this)
    }

    onSimpleFormItemChange(event){

        console.log("from simple form component", event.target.value)

    }

    renderFormFromStructure(structure){

        return (<div className="simple-form-container">

            <LocationInput onSimpleFormItemChange={this.onSimpleFormItemChange} />

            {/*
            {
                structure.map((obj, ind) => {
                    return (<div key={obj.id} className="formItem">
                        <pre>{JSON.stringify(obj, null, 2)}</pre>



                    </div>);
                })
            } */}




        </div>)

    }

    render(){

        return(<div className="simple-form-component">

            {this.renderFormFromStructure(this.props.structure)}

        </div>)
    }
}
