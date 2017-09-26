import React from "react"
import axios from "axios"
import { Icon } from "react-fa"

import { clearFix } from "polished"
import styled from "styled-components"
import uuid from "uuid"

const Container = styled.div`

`
const Button = styled.button`

`

export default class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {

            entries:null,
            courses:null
        }

        this.testButton = this.testButton.bind(this)
        this.getEntries = this.getEntries.bind(this)
    }

    testButton(){

        console.log("button pressed")
        let self = this

        axios.get('./api/api.php', {
            params: {
                action: "getAllCourses",
                data:{
                    "course_id":"course-v1:UQx+COURSECODEx+2T2017"
                }
            }
        })
        .then(function (response) {
            let data = response.data

            let courses = {}

            data.forEach((obj, ind)=>{
                
                let course_id = obj.course_id ? obj.course_id : "Unidentified"
                let lti_id = obj.lti_id
                let lti_title = (JSON.parse(obj.app_settings)).activity_title

                if(!courses.hasOwnProperty(course_id)){
                    courses[course_id] = []
                    courses[course_id].push({
                        "lti_id":lti_id,
                        "title":lti_title
                    })
                }else{
                    courses[course_id].push({
                        "lti_id":lti_id,
                        "title":lti_title
                    })                    
                }
            })

            self.setState({
                courses:courses
            })

        })
        .catch(function (error) {
            
        });

    }

    getEntries(event){

        console.log(event.target.dataset.lti_id)
        axios.get('./api/api.php', {
            params: {
                action: "getAllEntriesInLTI",
                data:{
                    "lti_id":event.target.dataset.lti_id
                }
            }
        })
        .then(function (response) {
            let data = response.data

           console.log(data)

        })
        .catch(function (error) {
            
        });

    }

    render(){

        let list = ''

        
        if(this.state.courses){
            let courses = Object.keys(this.state.courses)
            
           
            list = courses.map((course, ind)=>{
                return <li key={uuid.v4()}> <h3>{course}</h3> 
                    <ul>
                        {this.state.courses[course].map((lti, ind)=>{
                            return <li key={uuid.v4()}><a data-lti_id={lti.lti_id} onClick={this.getEntries}>{lti.title}</a></li>
                        })}
                    </ul>
                </li>
            })
        }

        return(<Container>

            ADMIN!!! 
            <Button className="btn btn-lg btn-primary" onClick={this.testButton}>Get All Entries</Button>
            
            <ul>{list}</ul>

        </Container>)
    }

}
