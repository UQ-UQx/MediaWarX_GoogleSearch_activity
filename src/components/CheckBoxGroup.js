
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

        this.props.onOptionChange(this.props.name, []);     



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
        let self = this
        this.props.options.forEach(function(obj, ind){

            if(stateOfOptions[obj.value]){
                switch (self.props.returnVal) {
                    case "value":
                        selected_options.push(obj.value)
                        break;
                    case "all":
                        selected_options.push(obj)
                        break;
                    default:
                        selected_options.push(obj[self.props.returnVal])
                        break;
                }
            }

        })   

        this.props.onOptionChange(this.props.name, selected_options);     

    }

    render(){
        
        let disabled_class = ""
        let disabled_prop = {}

        if(this.props.disable){
            disabled_class = "disabled"
            disabled_prop = {'disabled':true}
        }

        let self = this
        let inputs = this.props.options.map((option, ind)=>{

            let count = ""
            if(this.props.counts){
                count = <span class="count_badge" >{option.count}</span>
            }

            let selectedOptionClassName = "option-selected active";
            if(!this.state[option.value]){
                selectedOptionClassName = ""
            }

            return(<div className={"option-button-container "+this.props.itemClassName}  key={uuid.v4()}>

                <button
                    className={"btn btn-sml btn-default option-button "+selectedOptionClassName+" "+self.props.name+"_option "+disabled_class}
                    onClick={self.onOptionButtonClick}
                    data-value={option.value}
                    data-name={self.props.name}
                    aria-pressed={this.state[option.value]}
                    {...disabled_prop}
                >
                    {option.value} {count}
                </button>
            
            </div>)

        })


        return(<div className={"check-box-group-component clearfix"+this.props.className} >
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
  onOptionChange: PropTypes.func,
  type: PropTypes.string,
  returnVal: PropTypes.string,
  className: PropTypes.string,
  itemClassName: PropTypes.string
  
};


CheckBoxGroup.defaultProps = {
  
  name: "defaultOption",
  className: "",
  itemClassName: "",
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
  onOptionChange: (name, selected_options)=>{

    //console.log(selected_options)
    
  },
  type: "checkbox",
  counts: false,
  returnVal: "value",
}