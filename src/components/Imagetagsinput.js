import "../stylesheets/ImageTagsInputStyles.scss"

import React from "react"
import {Icon} from "react-fa"


export default class Imagetagsinput extends React.Component {
    constructor(props){
        super(props)



        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.props.handleTagInputChange({
            type:"tag",
            value:event.target.value
        })
    }
    handleKeyUp(event){

        console.log(event.keyCode);


        switch (event.keyCode) {
            case 13:
                if(this.props.tag.length > 0){

                    this.props.handleTagInputChange({
                        type:"add_tag",
                        value:event.target.value
                    })

                    this.props.handleTagInputChange({
                        type:"tag",
                        value:""
                    })

                }
                break;
            default:

        }



    }


    render(){



        return (<div  className="image-tags-input-container">


            <div className="tags-container">
                {
                    this.props.tags.map((obj, ind)=>{


                        return (<div className="tag-container" aria-label="tag" key={ind}>
                                    <div className="tag">

                                    {obj} 

                                    <button className="btn btn-xs btn-link btn-default remove-tag-button"
                                        type="remove">
                                        <Icon name="times"/>
                                    </button>

                                    </div>
                                    {/* <div className="tag-remove-button-container">

                                        <button className="btn btn-xs btn-link btn-default remove-tag-button"
                                            type="remove">
                                            <Icon name="times"/>
                                        </button>
                                    </div> */}

                                </div>)

                        // return (<div className="tag" aria-label="tag" key={ind}>{obj}
                        //
                        //             <button className="btn btn-xs btn-default remove-tag-button"
                        //                 type="remove">
                        //                 <Icon name="times"/>
                        //             </button>
                        //         </div>)

                    })

                }

                <input
                    type = "text"
                    class = "tag-input"
                    aria-label = "Input for tags"
                    placeholder = "Add Tag"
                    value = {this.props.tag}
                    onChange = {this.handleChange}
                    onKeyUp = {this.handleKeyUp}
                />

            </div>



        </div>)

    }

}
