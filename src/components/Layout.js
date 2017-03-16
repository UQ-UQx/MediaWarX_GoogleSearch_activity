import React from "react"
import { connect } from "react-redux"

import Client from "./client/Client"
import Admin from "./admin/Admin"

import { fetchUser, setUserAdmin } from "../store/actions/userActions"

@connect((store) => {

    return {
        user: store.user.user
    }
})
export default class Layout extends React.Component {

    componentWillMount(){

        console.log("Layout component will mount");

        this.props.dispatch(fetchUser())
    }

    componentDidMount(){

        console.log("Layout component did mount")


    }

    componentWillUnmount(){

        console.log("Layout component will unmount")
    }

    ChangeUserRole(){

        this.props.dispatch(setUserAdmin(this.props.user.id, true))

    }

    render(){

        var layer = null;
        if(this.props.user.admin){
            console.log("is admin")
            layer = <Admin />;
        }else{
            console.log("is student")
            layer = <Client />;
        }

        // var layer = this.getLayer.bind(this);
        // console.log(layer);
        return (<div className="Layout_component">
                <button className="btn btn-danger" onClick={this.ChangeUserRole.bind(this)}>Change Role</button>

                <div className="layer_continer">
                    {layer}
                </div>
        </div>);
    }
}
