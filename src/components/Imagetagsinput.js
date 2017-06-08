import "../stylesheets/ImageTagsInputStyles.scss"

import React from "react"
import {Icon} from "react-fa"
import uuid from "uuid"


export default class Imagetagsinput extends React.Component {
    constructor(props){
        super(props)



        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleTagRemove = this.handleTagRemove.bind(this)
    }

    handleTagRemove(event){
        var id = event.currentTarget.dataset.tagid;
        this.props.handleTagInputChange({
            type:"remove_tag",
            value:id
        })

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

                    var tag = {
                        id:uuid.v4(),
                        tag:event.target.value

                    }

                    this.props.handleTagInputChange({
                        type:"add_tag",
                        value:tag
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

        var tagInput = ( <input
                    type = "text"
                    class = "tag-input"
                    aria-label = "Input for tags"
                    placeholder = "Add Tag"
                    value = {this.props.tag}
                    onChange = {this.handleChange}
                    onKeyUp = {this.handleKeyUp}
                />)

        let self = this;
        function generateTagButton(tagID){

            var button = (<button
                        className="btn btn-xs btn-link btn-default remove-tag-button"
                        data-tagid={tagID}
                        type="remove"
                        onClick={self.handleTagRemove}
                    >
                        <Icon name="times"/>
                    </button>)

            if(self.props.submitted){
                button = "";
            }


            return button
        } 

        if(this.props.submitted){
            tagInput = "";
        }

        return (<div  className="image-tags-input-container">

            <h4>Tags</h4>
            <hr></hr>
            <div className="tags-container">
                {
                    this.props.tags.map((obj, ind)=>{

                        return (<div className="tag-container" aria-label="tag" key={obj.id}>
                                    <div className="tag">

                                    {obj.tag}

                                    {generateTagButton(obj.id)}

                                    </div>

                                </div>)
                    })

                }

               {tagInput}

            </div>



        </div>)

    }

}




// import "../stylesheets/ImageTagsInputStyles.scss"

// import React from "react"
// import {Icon} from "react-fa"
// import uuid from "uuid"
// import Select from 'react-select';


// export default class Imagetagsinput extends React.Component {
//     constructor(props){
//         super(props)



//         this.handleKeyDown = this.handleKeyDown.bind(this)
//         this.handleChange = this.handleChange.bind(this)
//         this.handleTagRemove = this.handleTagRemove.bind(this)

//     }

//     handleTagRemove(event){
//         var id = event.currentTarget.dataset.tagid;
//         this.props.handleTagInputChange({
//             type:"remove_tag",
//             value:id
//         })

//     }

//     handleChange(data){
//         //console.log(data.label)
//        this.props.handleTagInputChange({
//                         type:"add_tag",
//                         value:data.label
//                     })

//         this.props.handleTagInputChange({
//             type:"tag",
//             value:""
//         })
        
//     }
//     handleKeyDown(event){

//        this.props.handleTagInputChange({
//             type:"tag",
//             value:event.target.value
//         })

//          switch (event.keyCode) {
//             case 13:
//                 if(this.props.tag.length > 0){

//                     var tag = {
//                         id:uuid.v4(),
//                         tag:event.target.value

//                     }

//                     this.props.handleTagInputChange({
//                         type:"add_tag",
//                         value:tag
//                     })

//                     this.props.handleTagInputChange({
//                         type:"tag",
//                         value:""
//                     })

//                 }
//                 break;
//             default:

//         }
//     }


//     render(){

//         var tags = this.props.tags.map(function(tag,ind){
//                         return {label:tag.tag, value:tag.tag};
//                     });

//         //console.log(tags);


//         return (<div  className="image-tags-input-container">


//             <div className="tags-container">
//              <Select
//                     name="tags-dropdown"
//                     value={this.props.tag}
//                     placeholder="Please type or select a tag"
//                     options={tags}
//                     onInputKeyDown={this.handleKeyDown}
//                     onChange={this.handleChange}
//                 />
//                 {
//                     this.props.tags.map((obj, ind)=>{

//                         return (<div className="tag-container" aria-label="tag" key={obj.id}>
//                                     <div className="tag">

//                                     {obj.tag}

//                                     <button
//                                         className="btn btn-xs btn-link btn-default remove-tag-button"
//                                         data-tagid={obj.id}
//                                         type="remove"
//                                         onClick={this.handleTagRemove}
//                                     >
//                                         <Icon name="times"/>
//                                     </button>

//                                     </div>

//                                 </div>)
//                     })

//                 }

//                 {/*
//                 <input
//                     type = "text"
//                     class = "tag-input"
//                     aria-label = "Input for tags"
//                     placeholder = "Add Tag"
//                     value = {this.props.tag}
//                     onChange = {this.handleChange}
//                     onKeyUp = {this.handleKeyUp}
//                 />
//                 **/}

               
//             </div>



//         </div>)

//     }

// }
