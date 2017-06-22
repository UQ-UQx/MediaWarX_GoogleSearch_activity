// import './stylesheets/title.css'
// import './stylesheets/paragraph.scss'
import './stylesheets/IndexPage.scss'

import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap'
//import _ from "lodash"
//Clean the above later

import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import Layout from "./components/Layout"

const app = document.getElementById('app');

//console.log($LTI_resourceID);
//console.log($LTI_userID);

// var self = this;
axios.get('../public/api/api.php', {
    params: {
        action: "getUserState",
        data:{
            //state: {...this.state, "location_static_map":""},
            user_id: $LTI_userID,
            lti_id: $LTI_resourceID
        }
    }
})
.then(function (response) {
    var serverState = response.data
    console.log("This shoudl work", response)
    loadApp(serverState)
})
.catch(function (error) {
        console.log(error)

    loadApp(null)
});

function loadApp(state){
    ReactDOM.render(<Layout appState={state}/>, app);
}

