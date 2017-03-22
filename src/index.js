// import './stylesheets/title.css'
// import './stylesheets/paragraph.scss'
import './stylesheets/IndexPage.scss'

import {} from 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
//Clean the above later

import React from "react"
import ReactDOM from "react-dom"

import Layout from "./components/Layout"

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);
