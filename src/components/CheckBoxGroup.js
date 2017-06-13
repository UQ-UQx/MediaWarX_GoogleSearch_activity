
import React from "react"

import PropTypes from 'prop-types';
import uuid from 'uuid';

import "../stylesheets/CheckBoxGroup.scss"


export default class CheckBoxGroup extends React.Component {
    constructor(props){
        super(props)


        let defaultOptionsState = {}
        this.props.options.forEach(function(obj, ind){
            defaultOptionsState[obj.value] = obj.checked    
        })

        this.state={
            ...defaultOptionsState,
        }

        this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
        this.resetSelections = this.resetSelections.bind(this)
    }

    resetSelections(){

        let defaultOptionsState = {}
        this.props.options.forEach(function(obj, ind){
            defaultOptionsState[obj.value] = obj.checked    
        })

        this.setState({
            ...defaultOptionsState,
        })

        this.props.onCheckBoxChange(this.props.name, []);     



    }
    onCheckBoxChange(event){

        const target = event.target
        this.setState({[target.value]:target.checked});

        let stateOfOptions = {...this.state, [target.value]:target.checked};

        let selected_options = []
        this.props.options.forEach(function(obj, ind){

            if(stateOfOptions[obj.value]){
                selected_options.push(obj.value)
            }

        })   

        this.props.onCheckBoxChange(this.props.name, selected_options);     

    }

    render(){

        
        let self = this
        let inputs = this.props.options.map(function(obj, ind){

            let checked = obj.checked

            if(obj.checked != self.state[obj.value]){
                checked = self.state[obj.value]
            }

            return(<div className="checkbox-option-container" key={uuid.v4()}>
                        <input 
                            type="checkbox" 
                            name={self.props.name} 
                            className="checkbox-option"
                            value={obj.value}
                            checked={checked}
                            onChange={self.onCheckBoxChange}
                        />
                        <span className="filter-option-label">{obj.value}</span>
                </div>)

        })

        return(<div className="check-box-group-component" >
        {inputs}
        </div>)

    }

}


CheckBoxGroup.PropTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        checked: false,
  })),
  onCheckboxChange: PropTypes.func,
  
};


CheckBoxGroup.defaultProps = {
  
  name: "defaultOption",
  options:[
    { 
        value: "Option 1",
        checked: false,
    },{ 
        value: "Option 2",
        checked: false,
    },{ 
        value: "Option 3",
        checked: false,
    },
  ],
  onCheckboxChange: (name, selected_options)=>{

    console.log(selected_options)
    
  }
}