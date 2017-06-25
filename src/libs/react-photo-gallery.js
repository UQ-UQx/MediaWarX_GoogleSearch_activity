// The MIT License (MIT)

// Copyright (c) 2015-2017 Sandra Gonzales 
// https://github.com/neptunian/react-photo-gallery/

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from "react-fa"

class Gallery extends React.Component{
    constructor(){
	super();
	this.state = {
	    containerWidth: 0
	};
	this.handleResize = this.handleResize.bind(this);
    }
    componentDidMount(){
	this.setState({containerWidth: Math.floor(this._gallery.clientWidth)})
        window.addEventListener('resize', this.handleResize);
    }
    componentDidUpdate(){
	if (this._gallery.clientWidth !== this.state.containerWidth){
	    this.setState({containerWidth: Math.floor(this._gallery.clientWidth)});
	}
    }
    componentWillUnmount(){
	 window.removeEventListener('resize', this.handleResize, false);
    }
    handleResize(e){
        this.setState({containerWidth: Math.floor(this._gallery.clientWidth)});
    }
    render(){
        let self = this
        let cols = this.props.cols,
            photoPreviewNodes = [],
	    contWidth = this.state.containerWidth - (cols * (this.props.margin * 2)); 

        contWidth = Math.floor(contWidth); // add some padding to prevent layout prob
        var remainder = this.props.photos.length % cols;
        if (remainder) { // there are fewer photos than cols num in last row
          var lastRowWidth = Math.floor( ((this.state.containerWidth / cols) * remainder) - (remainder * (this.props.margin * 2)) );
          var lastRowIndex = this.props.photos.length - remainder;
        }
        // loop thru each set of  cols num
        // eg. if cols is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
        for (var i=0;i<this.props.photos.length;i+=cols){
            var totalAr=0,
            commonHeight = 0;

	    // get the total aspect ratio of the row
            for (var j=i; j<i+cols; j++){
                if (j == this.props.photos.length){
                    break;
                }
		        this.props.photos[j].aspectRatio = this.props.photos[j].width / this.props.photos[j].height;	
		        totalAr += this.props.photos[j].aspectRatio;
            }
            if (i === lastRowIndex) {
              commonHeight = lastRowWidth / totalAr;
            } else {
              commonHeight = contWidth / totalAr;
            }
            // run thru the same set of items again to give the width and common height
            for (let k=i; k<i+cols; k++){
                if (k == this.props.photos.length){
                    break;
                }

                let src = this.props.photos[k].src, srcset, sizes;
                let activeClassName = "";
                let expandButton = "";
                if (this.props.photos[k].srcset){
                    srcset = this.props.photos[k].srcset.join();
                }
                if (this.props.photos[k].sizes){
                    sizes = this.props.photos[k].sizes.join();
                }
                if (this.props.photos[k].activeClassName){
                    activeClassName = this.props.photos[k].activeClassName;
                }
                if (this.props.photos[k].expandButton){
                    expandButton = (<div className="image-buttons-container">
                            <button className="btn btn-sm btn-primary image-buttons"
                                onClick={this.props.handleEnlarge}
                            ><Icon name="arrows-alt"/> Enlarge</button>
                            <button className="btn btn-sm btn-primary image-buttons"
                                onClick={self.props.handleDetails}
                                
                            ><Icon name="info"/> Details</button>

                    </div>);
                }
                console.log(expandButton)

                style.margin = this.props.margin;
                photoPreviewNodes.push(
                    (<div className={"react-photo-gallery-photo-container "+activeClassName} key={k} style={style} 
                        onMouseOver={(e) => this.props.onPhotoMouseOver(k,e)}
                        onMouseOut={(e) => this.props.onPhotoMouseOut(k,e)}
                        onFocus={(e) => this.props.onPhotoMouseOver(k,e)}
                        onBlur={(e) => this.props.onPhotoMouseOut(k,e)}
                        height={commonHeight} width={commonHeight * this.props.photos[k].aspectRatio}
                        
                        >
                        {expandButton}

                    <a href="#" className={k} 
                    
                        onClick={(e) => this.props.onClickPhoto(k, e)}
                        
                    >

                        <img src={src} srcSet={srcset} sizes={sizes} style={{display:'block', border:0}} 
                            height={commonHeight} 
                            width={commonHeight * this.props.photos[k].aspectRatio} 
                            alt={this.props.photos[k].alt} />
                    </a>
                    </div>)
                );
            }
        }
	return(
        
            <div id="Gallery" className="clearfix" ref={(c) => this._gallery = c}>

                {photoPreviewNodes}
            </div>

        );
    }

    renderGallery(photoPreviewNodes){
	// return(
	// 	{photoPreviewNodes}
	// );
    }
};
Gallery.displayName = 'Gallery';
Gallery.propTypes = {
    photos: function(props, propName, componentName){
	return PropTypes.arrayOf(
	    PropTypes.shape({
		src: PropTypes.string.isRequired,
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		alt: PropTypes.string,
		srcset: PropTypes.array,
		sizes: PropTypes.array
	    })
	).isRequired.apply(this,arguments);
    },
    onClickPhoto: PropTypes.func,
    onPhotoMouseOver: PropTypes.func,    
    onPhotoMouseOut: PropTypes.func,
    cols: PropTypes.number,
    margin: PropTypes.number
};
Gallery.defaultProps = {
    cols: 3, 
    onClickPhoto: function(k,e){
	e.preventDefault();
    },
    onPhotoMouseOver: function(k,e){
	e.preventDefault();
    },
    onPhotoMouseOut: function(k,e){
	e.preventDefault();
    },
    margin: 4
}
// Gallery image style
const style = {
   display: 'block',
   backgroundColor:'#e3e3e3',
   float: 'left'
}

export default Gallery;
