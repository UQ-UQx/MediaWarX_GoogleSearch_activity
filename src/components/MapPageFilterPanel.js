import "../stylesheets/MapPageFilterPanelStyles.scss"

import React from "react"
import educationlevels from "../data/educationlevels.json"
import devices from "../data/devices.json"
import genders from "../data/genders.json"
import agesranges from "../data/ageranges.json"

import {Icon} from 'react-fa'

import ReactBootstrapSlider from 'react-bootstrap-slider';


import CheckBoxGroup from "./CheckBoxGroup"

import uuid from "uuid"
export default class MapPageFilterPanel extends React.Component {
     constructor(props){
        super(props)

        this.state = {
            shouldScroll:false,
            filter_strict:$LTI_CUSTOM_filter_strict
        }

        this.onResetClicked = this.onResetClicked.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
        this.handleFilterOptionsOnScroll = this.handleFilterOptionsOnScroll.bind(this)
        this.updateShouldScroll = this.updateShouldScroll.bind(this)

        this.updateSliderValue = this.updateSliderValue.bind(this)

        this.strictFilter = this.strictFilter.bind(this)
        this.looseFilter = this.looseFilter.bind(this)
        
    }

    updateSliderValue(event){

        console.log(event)

    }

    handleFilterOptionsOnScroll(event){

        this.updateShouldScroll();
    }

    onResetClicked(event){

        console.log("clicked reset")
        //remove all filter selections
        this.refs.gender_checkboxgroup.resetSelections();
        this.refs.education_checkboxgroup.resetSelections();
        this.refs.device_checkboxgroup.resetSelections();
        this.refs.ageranges_checkboxgroup.resetSelections();


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
        let filter_ageranges = []


        if(this.props.filter_genders && filter_genders.length == 0){
            filter_genders = [...this.props.filter_genders]
        }
        if(this.props.filter_educations && filter_educations.length == 0){
            filter_educations = [...this.props.filter_educations]
        }
        if(this.props.filter_devices && filter_devices.length == 0){
            filter_devices = [...this.props.filter_devices]
        }
        if(this.props.filter_ageranges && filter_ageranges.length == 0){
            filter_ageranges = [...this.props.filter_ageranges]
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
            case "ageranges":
                this.props.handleMapPageStateUpdate({
                    filter_ageranges:selected_options
                })
                filter_ageranges = []
                filter_ageranges = [...selected_options]
                break;
            default:
                break;
        }




        var filters = [
            ...filter_genders,
            ...filter_educations,
            ...filter_devices,
            ...filter_ageranges
        ]

        let checkDetails = [
            "gender",
            "education",
            "device",
            "agerange"
        ]

        let bounds = new google.maps.LatLngBounds();

       


        if(filters.length > 0){
            if(this.state.filter_strict){
                bounds =  this.strictFilter(bounds, checkDetails, filters);
            }else{
                this.props.markers.forEach((marker, ind)=>{
                    marker.setVisible(false)
                })
                
                bounds = this.looseFilter(bounds, checkDetails, filters);
            }
        }else{
           this.props.markers.forEach((marker, ind)=>{
                marker.setVisible(true)
                bounds.extend(marker.getPosition());
            })
        }



        this.props.map.fitBounds(bounds);

        this.props.clusterer.setIgnoreHidden(true)
        this.props.clusterer.repaint()

    }

    strictFilter(bounds, checkDetails, filters){

        this.props.markers.forEach((marker, ind)=>{
          
            checkDetails.forEach((detailKey, ind)=>{

                if(_.indexOf(filters, marker.entry[detailKey]) != -1){
                    weight ++;
                }

            })

            if(weight != filters.length){
                marker.setVisible(false)
            }else{
                marker.setVisible(true)
                bounds.extend(marker.getPosition());
            }

        })

        return bounds

    }

    looseFilter(bounds, checkDetails, filters){
        this.props.markers.forEach((marker, ind)=>{

            checkDetails.forEach((detailKey, ind)=>{

                if(_.indexOf(filters, marker.entry[detailKey]) != -1){
                    if(!marker.getVisible()){
                        marker.setVisible(true)
                    }
                    bounds.extend(marker.getPosition());
                }

            })
            

        })

        return bounds

    }

    componentDidMount(){

        
        this.updateShouldScroll()
        
        
    }

    updateShouldScroll(){

        let cHeight = this.refs.filterOptionsContainer.clientHeight;
        let sHeight = this.refs.filterOptionsContainer.scrollHeight;
        let scrollTop = this.refs.filterOptionsContainer.scrollTop;

        if((sHeight > cHeight) && !this.state.shouldScroll){
            this.setState({
                shouldScroll:true
            })
        }

        if(((sHeight-cHeight) == scrollTop) && this.state.shouldScroll){
            this.setState({
                shouldScroll:false
            })
        }

        console.log(cHeight, sHeight, scrollTop, sHeight-cHeight)

    }


    render(){


        



        console.log("should not be rendering")


        





        
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

        let ageOptions = [];
        agesranges.forEach(function(agerange, ind){
            ageOptions.push({
                value:agerange.value,
            })
        });



        var scrollForMore = (<div className="filter-panel-scroll-for-more">
            <Icon name="arrow-down" /> Scroll Down for More

        </div>)
        

        if(!this.state.shouldScroll){
            scrollForMore = ""
        }

        let groupType = "checkbox"

        if(this.state.filter_strict){
            groupType = "radio"
        }

        return(<div className="map-page-filter-panel-container">

            <div className="filter-panel-title-container clearfix">
                Filter Options <button className="resetFilterButton btn btn-sm btn-danger" onClick={this.onResetClicked}>Clear</button>

            </div>
            

            
            <div className="filter-options" ref="filterOptionsContainer" onScroll={this.handleFilterOptionsOnScroll}>
                <div className="filter-container age-filter">
                    <div className="filter-container-title">Age Ranges</div>
                    <div className="age-filter-container clearfix">

                    <CheckBoxGroup
                    ref="ageranges_checkboxgroup"
                    name="ageranges" 
                    options={ageOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} 
                    type={groupType}
                    />
                                            
                    </div>
                </div>
                <div className="filter-container gender-filter">
                    <div className="filter-container-title">Gender</div>
                    <CheckBoxGroup
                    ref="gender_checkboxgroup"
                    name="gender" 
                    options={genderOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} 
                    type={groupType}
                    />
                </div>
                <div className="filter-container education-filter">
                    <div className="filter-container-title">Education</div>
                    <CheckBoxGroup
                    ref="education_checkboxgroup"
                    name="education" 
                    options={educationOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} 
                    type={groupType}
                    />
                </div>
                <div className="filter-container dateofcapture-filter"></div>
                <div className="filter-container device-filter">
                    <div className="filter-container-title">Device</div>
                    <CheckBoxGroup
                    ref="device_checkboxgroup"
                    name="device" 
                    options={deviceOptions} 
                    onCheckBoxChange={this.handleCheckBoxChange} 
                    type={groupType}
                    />
                </div>
            </div>

            {scrollForMore}
            
        </div>)
    }
}

