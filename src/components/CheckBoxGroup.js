
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
    
        this.onOptionButtonClick = this.onOptionButtonClick.bind(this)
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
        console.log("WOAOOOSOOS", this.state)

        let stateOfOptions = {...this.state, [target.value]:target.checked};

        let selected_options = []
        this.props.options.forEach(function(obj, ind){

            if(stateOfOptions[obj.value]){
                selected_options.push(obj.value)
            }

        })   

        this.props.onCheckBoxChange(this.props.name, selected_options);     

    }


    onOptionButtonClick(event){


        const target = event.target

        let selectedButtonClass = "option-selected"
        let flag = false

        if(this.state[target.dataset.value]){
            flag = false
        }else{
            flag = true;
        }

        let stateOfOptions = {...this.state, [target.dataset.value]:flag};

        if(this.props.type == "radio"){

            let defaultOptionsState = {}
            this.props.options.forEach(function(obj, ind){
                defaultOptionsState[obj.value] = obj.checked    
            })

            this.setState({
                ...defaultOptionsState, [target.dataset.value]:flag
            })
            stateOfOptions = {...defaultOptionsState, [target.dataset.value]:flag}

        }else{

            this.setState({
                [target.dataset.value]:flag
            })


        }





        let selected_options = []
        this.props.options.forEach(function(obj, ind){

            if(stateOfOptions[obj.value]){
                selected_options.push(obj.value)
            }

        })   

        this.props.onCheckBoxChange(this.props.name, selected_options);     

    }

    render(){

        
        // let self = this
        // let inputs = this.props.options.map(function(obj, ind){

        //     let checked = obj.checked

        //     if(obj.checked != self.state[obj.value]){
        //         checked = self.state[obj.value]
        //     }

        //     return(<div className="checkbox-option-container" key={uuid.v4()}>
        //             <div className="checkbox-option">
        //                 <div className="checkbox-option-input-container">
        //                 <input 
        //                     type="checkbox" 
        //                     name={self.props.name} 
        //                     className="checkbox-option"
        //                     value={obj.value}
        //                     checked={checked}
        //                     onChange={self.onCheckBoxChange}
        //                 />
        //                 </div>
        //                 <div className="checkbox-option-label" >{obj.value}</div>
        //             </div>
        //         </div>)

        // })
        //console.log("WOAH", this.state)
        

        let self = this
        let inputs = this.props.options.map((option, ind)=>{

            let count = ""
            if(this.props.counts){
                count = <span class="badge">{option.count}</span>
            }

            let selectedOptionClassName = "option-selected";
            if(!this.state[option.value]){
                selectedOptionClassName = ""
            }

            return(<div className="option-button-container"  key={uuid.v4()}>

                <button
                    className={"btn btn-sml btn-default option-button "+selectedOptionClassName+" "+self.props.name+"_option"}
                    onClick={self.onOptionButtonClick}
                    data-value={option.value}
                    data-name={self.props.name}
                    aria-pressed={this.state[option.value]}
                >
                    {option.value} {count}
                </button>
            
            </div>)

        })


        return(<div className="check-box-group-component clearfix" >
        {inputs}
        </div>)

    }

}


CheckBoxGroup.PropTypes = {
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        checked: false,
        count: PropTypes.number
  })),
  onCheckboxChange: PropTypes.func,
  type: PropTypes.string
  
};


CheckBoxGroup.defaultProps = {
  
  name: "defaultOption",
  options:[
    { 
        value: "Option 1",
        checked: false,
        count: 1
    },{ 
        value: "Option 2",
        checked: false,
        count: 1
    },{ 
        value: "Option 3",
        checked: false,
        count: 1
    },
  ],
  onCheckboxChange: (name, selected_options)=>{

    console.log(selected_options)
    
  },
  type: "checkbox",
  counts: false
}