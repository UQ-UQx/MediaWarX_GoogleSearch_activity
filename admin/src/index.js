
import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap'
//import _ from "lodash"
//Clean the above later

import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"

import App from "./components/App"

const app = document.getElementById('app');


loadApp();

function loadApp(state){
    console.log("WOI")
    ReactDOM.render(<App appState={state}/>, app);
}

