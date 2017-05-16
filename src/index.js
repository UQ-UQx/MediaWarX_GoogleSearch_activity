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

// var self = this;
axios.get('../public/api/api.php', {
    params: {
        action: "getUserState",
        data:{
            //state: {...this.state, "location_static_map":""},
            user_id: "user5",
            lti_id: "lti23"
        }
    }
})
.then(function (response) {
    var serverState = JSON.parse(response.data.state)
    loadApp(serverState)
})
.catch(function (error) {
    loadApp(null)
});

function loadApp(state){
    ReactDOM.render(<Layout appState={state}/>, app);
}

