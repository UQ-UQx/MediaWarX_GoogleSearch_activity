import React from "react"
import { connect } from "react-redux"
import { icon } from "react-fa"
import { fetchCallData } from "../store/actions/ltiActions.js"


@connect((store) => {
    console.log(store.ltiCallData);
    return{

        //lti_id: store.ltiCallData
    }
})

export default class ltiCallData extends React.Component {

    render(){


        return(

            <div className="lti_call_data_container">
                LTI CALL DATA
            </div>

        )

    }

}
