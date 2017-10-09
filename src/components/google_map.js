import React, {Component} from 'react';
/*global google*/

class GoogleMap extends Component { 
    componentDidMount(){
        new google.maps.Map(this.refs.map, //embedded google map - renders map into input
            //second argument is options object
            {
            zoom: 12,   //level of map zoom
            center: {   //latitude and longitude
                lat: 52.5200066,
                lng: 13.404954
            }
        });
    }
    
    render(){
        // this.refs.map is a direct reference to this element
        return <div className='map' ref="map" />;
    }
}

export default GoogleMap;