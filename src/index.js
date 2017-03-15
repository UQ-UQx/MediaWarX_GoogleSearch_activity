// import './stylesheets/title.css'
// import './stylesheets/paragraph.scss'
import './stylesheets/IndexPage.scss'

import {} from 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
//Clean the above later

import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./components/App"
import store from "./store/store"
const app = document.getElementById('app')



ReactDOM.render(<Provider store={store}><App /></Provider>, app);
