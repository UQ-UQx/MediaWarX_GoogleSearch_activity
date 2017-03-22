import React from "react"

import GoogleSearchUploadForm from "./GoogleSearchUploadForm"

export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selected_page:"upload", // options: upload | map
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this);

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


    handleFormSubmit(){


        console.log("form submit clicked");
    }




    render(){


        return (
        <div className="layout-component">

            --- page buttons go here for ---

            <GoogleSearchUploadForm />


        </div>);
    }
}
