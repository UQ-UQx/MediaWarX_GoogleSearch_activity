import "../stylesheets/MapPageFilterPanelStyles.scss"

import React from "react"
import educationlevels from "../data/educationlevels.json"
import devices from "../data/devices.json"
import genders from "../data/genders.json"

import CheckBoxGroup from "./CheckBoxGroup"

import uuid from "uuid"
export default class MapPageFilterPanel extends React.Component {
     constructor(props){
        super(props)

        this.onResetClicked = this.onResetClicked.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
    }

    onResetClicked(event){

        console.log("clicked reset")
        //remove all filter selections
        this.refs.gender_checkboxgroup.resetSelections();
        this.refs.education_checkboxgroup.resetSelections();
        this.refs.device_checkboxgroup.resetSelections();

        //enable all markers as nothing is being filtered
        let bounds = new google.maps.LatLngBounds();
        this.props.markers.forEach((marker, ind)=>{
            marker.setVisible(true)
            bounds.extend(marker.getPosition());
        })
        this.props.map.fitBounds(bounds);
 
        if(this.props.clusterer){
            this.props.clusterer.setIgnoreHidden(true)
            this.props.clusterer.repaint()
        }

    }

    handleCheckBoxChange(name, selected_options){
         
        console.log(name, selected_options)

        let filter_genders = []
        let filter_educations = []
        let filter_devices = []

        if(this.props.filter_genders && filter_genders.length == 0){
            filter_genders = [...this.props.filter_genders]
        }
        if(this.props.filter_educations && filter_educations.length == 0){
            filter_educations = [...this.props.filter_educations]
        }
        if(this.props.filter_devices && filter_devices.length == 0){
            filter_devices = [...this.props.filter_devices]
        }

        switch (name) {
            case "gender":
                this.props.handleMapPageStateUpdate({
                    filter_genders:selected_options
                })
                filter_genders = []
                filter_genders = [...selected_options]
                break;
            case "education":
                this.props.handleMapPageStateUpdate({
                    filter_educations:selected_options
                })
                filter_educations = []
                filter_educations = [...selected_options]
                break;
            case "device":
                this.props.handleMapPageStateUpdate({
                    filter_devices:selected_options
                })
                filter_devices = []
                filter_devices = [...selected_options]
                break;
            default:
                break;
        }




        var filters = [
            ...filter_genders,
            ...filter_educations,
            ...filter_devices
        ]

        let checkDetails = [
            "gender",
            "education",
            "device"
        ]

        let bounds = new google.maps.LatLngBounds();
        let numInvisibleMarkers = 0;

        this.props.markers.forEach((marker, ind)=>{
            let weight = 0;
           // marker.setVisible(true)

            checkDetails.forEach((detailKey, ind)=>{

                if(_.indexOf(filters, marker.entry[detailKey]) != -1){
                    weight ++;
                }

            })

            if(weight != filters.length){
                console.log("matching marker: ", marker)
                marker.setVisible(false)
                numInvisibleMarkers++;
            }else{
                marker.setVisible(true)
                bounds.extend(marker.getPosition());
            }


        })

        console.log(filters);
       
 
        if(this.props.clusterer){
            this.props.clusterer.setIgnoreHidden(true)
            this.props.clusterer.repaint()
        }

        if(numInvisibleMarkers > 0){
            this.props.map.fitBounds(bounds);
        }else{

        }
       


    }

    render(){


        











        
        let genderOptions = [];
        genders.forEach(function(gender, ind){
            genderOptions.push({
                value:gender.value,
            })
        });

        let educationOptions = [];
        educationlevels.forEach(function(educationlevel, ind){
            educationOptions.push({
                value:educationlevel.value,
            })
        });


        let deviceOptions = [];
        devices.forEach(function(device, ind){
            deviceOptions.push({
                value:device.value,
            })
        });






        return(<div className="map-page-filter-panel-container">

            <div className="filter-panel-title-container">
                Filter Options
            </div>
            
            <button className="btn btn-small btn-danger" onClick={this.onResetClicked}>Reset</button>

            
            <div className="filter-options">
                <div className="filter-container age-filter"></div>
                <div className="filter-container gender-filter">
                    <h4>Gender</h4>
                    <CheckBoxGroup
                    ref="gender_checkboxgroup"
                    name="gender" 
                    options={genderOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} />
                </div>
                <div className="filter-container education-filter">
                    <h4>Education</h4>
                    <CheckBoxGroup
                    ref="education_checkboxgroup"
                    name="education" 
                    options={educationOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} />
                </div>
                <div className="filter-container dateofcapture-filter"></div>
                <div className="filter-container device-filter">
                    <h4>Device</h4>
                    <CheckBoxGroup
                    ref="device_checkboxgroup"
                    name="device" 
                    options={deviceOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} />
                </div>
            </div>

        </div>)
    }
}

