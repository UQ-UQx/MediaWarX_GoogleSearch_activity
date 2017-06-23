import "../stylesheets/MapPageFilterPanelStyles.scss"

import React from "react"
import educationlevels from "../data/educationlevels.json"
import devices from "../data/devices.json"
import genders from "../data/genders.json"
import agesranges from "../data/ageranges.json"
import DatePicker from 'react-datepicker';
import { TagCloud } from "react-tagcloud";
import moment from "moment"

import {Icon} from 'react-fa'

import ReactBootstrapSlider from 'react-bootstrap-slider';


import CheckBoxGroup from "./CheckBoxGroup"

import uuid from "uuid"

const data = [
  { value: "jQuery", count: 25 }, { value: "MongoDB", count: 18 },
  { value: "JavaScript", count: 38 }, { value: "React", count: 30 },
  { value: "Nodejs", count: 28 }, { value: "Express.js", count: 25 },
  { value: "HTML5", count: 33 }, { value: "CSS3", count: 20 },
  { value: "Webpack", count: 22 }, { value: "Babel.js", count: 7 },
  { value: "ECMAScript", count: 25 }, { value: "Jest", count: 15 },
  { value: "Mocha", count: 17 }, { value: "React Native", count: 27 },
  { value: "Angular.js", count: 30 }, { value: "TypeScript", count: 15 },
  { value: "Flow", count: 30 }, { value: "NPM", count: 11 },
];
const options = {
  luminosity: 'dark',
  hue: 'black'
};

export default class MapPageFilterPanel extends React.Component {
     constructor(props){
        super(props)

        this.state = {
            shouldScroll:false,
            filter_strict:$LTI_CUSTOM_filter_strict,
        }

        this.onResetClicked = this.onResetClicked.bind(this)
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this)
        this.handleFilterOptionsOnScroll = this.handleFilterOptionsOnScroll.bind(this)
        this.updateShouldScroll = this.updateShouldScroll.bind(this)


        this.strictFilter = this.strictFilter.bind(this)
        this.looseFilter = this.looseFilter.bind(this)

        this.handleDatePickerStartChange = this.handleDatePickerStartChange.bind(this)
        this.handleDatePickerEndChange = this.handleDatePickerEndChange.bind(this)

       // this.handleDatePickerOnBlur = this.handleDatePickerOnBlur.bind(this)
        
    }


    handleDatePickerStartChange(date){
        //console.log("HANDLE CHAMHE", date)
        
        this.handleCheckBoxChange("date_start_changed", date);
    }

    handleDatePickerEndChange(date){
       
        this.handleCheckBoxChange("date_end_changed", date);

    }

    handleFilterOptionsOnScroll(event){

        this.updateShouldScroll();
    }

    onResetClicked(event){

        ////console.log("clicked reset")
        //remove all filter selections
        this.refs.gender_checkboxgroup.resetSelections();
        this.refs.education_checkboxgroup.resetSelections();
        this.refs.device_checkboxgroup.resetSelections();
        this.refs.ageranges_checkboxgroup.resetSelections();
        this.refs.tags_checkboxgroup.resetSelections();

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
        //console.log(name, selected_options)
        let filter_genders = []
        let filter_educations = []
        let filter_devices = []
        let filter_ageranges = []
        let filter_tags = []
        let date_start = null
        let date_end = null

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
        if(this.props.filter_tags && filter_tags.length == 0){
            filter_tags = [...this.props.filter_tags]
        }
        if(this.props.filter_date_start && !date_start){
            date_start = this.props.filter_date_start
        }
        if(this.props.filter_date_end && !date_end){
            date_end = this.props.filter_date_end
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
            case "tags":
                this.props.handleMapPageStateUpdate({
                    filter_tags:selected_options
                })
                filter_tags = []
                filter_tags = [...selected_options]
                break;
            case "date_start_changed":
                this.props.handleMapPageStateUpdate({
                    filter_date_start:selected_options
                })
                date_start = selected_options
                break;
            case "date_end_changed":
                this.props.handleMapPageStateUpdate({
                    filter_date_end:selected_options
                })
                date_end = selected_options
            default:
                break;
        }




        var filters = [
            ...filter_genders,
            ...filter_educations,
            ...filter_devices,
            ...filter_ageranges,
            ...filter_tags
        ]

        //console.log("filers",filters);

        let checkDetails = [
            "gender",
            "education",
            "device",
            "agerange",
            "tags"
        ]

        let bounds = new google.maps.LatLngBounds();

       

        if(filters.length > 0 || date_start || date_end){
            if(this.state.filter_strict){
                //!!!IMPORTANT!!! TAGS and DATES filtering isn't supported in strict filtering yet, once implimented remove this comment.
                bounds =  this.strictFilter(bounds, checkDetails, filters);
            }else{
                this.props.markers.forEach((marker, ind)=>{
                    marker.setVisible(false)
                })
                
                bounds = this.looseFilter(bounds, checkDetails, filters, date_start, date_end);
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

    looseFilter(bounds, checkDetails, filters, date_start, date_end){
        this.props.markers.forEach((marker, ind)=>{

            checkDetails.forEach((detailKey, ind)=>{
                ////console.log("CHECK!!!")
                let compareDate = moment(marker.entry.date_of_capture)
                let start_date = moment(date_start)
                let end_date = moment(date_end)
                let fitsWithDate = false

                 ////console.log("start date", date_start)
                // //console.log("end date", date_end)
                // //console.log("compare: ", compareDate, compareDate.isBetween(date_start, date_end, 'days', '[]'))

                if(date_start && date_end){

                    if(compareDate.isBetween(date_start, date_end, null, '[]')){
                        if(!fitsWithDate){
                            fitsWithDate = true;
                        }
                    }

                }else if(date_start){

                    if(compareDate.isSameOrAfter(date_start)){
                        if(!fitsWithDate){
                            fitsWithDate = true;
                        }
                    }

                }else if(date_end){
                    //console.log(compareDate, date_end, compareDate.isSame(date_end))
                    if(compareDate.isSameOrBefore(date_end)){
                        if(!fitsWithDate){
                            fitsWithDate = true;
                        }
                    }

                }else{
                    //console.log("No date provided for filerting")
                }



                let tagMatched = false;
                if(detailKey == "tags"){
                    marker.entry.tags.forEach((tag, ind)=>{
                        if(_.indexOf(filters, tag) != -1){
                            if(!tagMatched){
                                tagMatched = true
                            }
                        }
                    })
                }

                if((_.indexOf(filters, marker.entry[detailKey]) != -1) || tagMatched || fitsWithDate){
                    if(!marker.getVisible()){
                        marker.setVisible(true)
                    }
                    bounds.extend(marker.getPosition());
                }

            })
            

        })

        return bounds

    }

    componentWillReceiveProps(){
        ////console.log(this.props.filter_date_start)
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

        ////console.log(cHeight, sHeight, scrollTop, sHeight-cHeight)

    }


    render(){


        



        ////console.log("should not be rendering")


        





        
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

        let tagOptions = [];
        ////console.log(this.props)
        let counts = _.countBy(this.props.allTags);

        for (var tag in counts) {
            if (counts.hasOwnProperty(tag)) {
                tagOptions.push({
                    value:tag,
                    count:counts[tag]
                })
            }
        }



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
                <div className="filter-container tag-filter">
                    <div className="filter-container-title">Tags</div>
                    <div className="tag-filter-container clearfix">
                    {
                        // <TagCloud minSize={8}
                        //         maxSize={30}
                        //         tags={data}
                        //         className="simple-cloud"
                        //         colorOptions={options}
                        //         onClick={tag => alert(`'${tag.value}' was selected!`)} />
                                    
                        <CheckBoxGroup
                            ref="tags_checkboxgroup"
                            name="tags" 
                            options={tagOptions} 
                            onOptionChange={this.handleCheckBoxChange} 
                            type={groupType}
                            counts={true}
                        />
                    }                    
                    </div>
                </div>
                 <div className="filter-container dater-filter">
                    <div className="filter-container-title">Date Range</div>
                    <div className="date-filter-container clearfix">

                        <DatePicker
                            selectsStart
                            selected={this.props.filter_date_start}
                            onChange={this.handleDatePickerStartChange}
                            startDate={this.props.filter_date_start}
                            endDate={this.props.filter_date_end}
                            placeholderText="Select start date"
                            popoverAttachment="top right"
                            popoverTargetAttachment="bottom right"
                            popoverTargetOffset="10px 0px"
                            isClearable={true}

                        />

                        <DatePicker
                            selectsEnd
                            selected={this.props.filter_date_end}
                            onChange={this.handleDatePickerEndChange}
                            startDate={this.props.filter_date_start}                            
                            endDate={this.props.filter_date_end}
                            placeholderText="Select end date"
                            popoverAttachment="top right"
                            popoverTargetAttachment="bottom right"
                            popoverTargetOffset="10px 0px"
                            isClearable={true}

                        />
                                            
                    </div>
                </div> 
                <div className="filter-container age-filter">
                    <div className="filter-container-title">Age Range</div>
                    <div className="age-filter-container clearfix">

                    <CheckBoxGroup
                    ref="ageranges_checkboxgroup"
                    name="ageranges" 
                    options={ageOptions} 
                    onOptionChange={this.handleCheckBoxChange} 
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
                    onOptionChange={this.handleCheckBoxChange} 
                    type={groupType}
                    />
                </div>
                <div className="filter-container education-filter">
                    <div className="filter-container-title">Education</div>
                    <CheckBoxGroup
                    ref="education_checkboxgroup"
                    name="education" 
                    options={educationOptions} 
                    onOptionChange={this.handleCheckBoxChange} 
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
                    onOptionChange={this.handleCheckBoxChange} 
                    type={groupType}
                    />
                </div>
               
            </div>

            {scrollForMore}
            
        </div>)
    }
}

// filter_date_start={this.props.filter_date_start}
// filter_date_end={this.props.filter_date_end}