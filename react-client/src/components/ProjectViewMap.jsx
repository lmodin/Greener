import React from 'react';
import map from '../../../keys.js';
import Geocode from 'react-geocode';
import { Map, GoogleApiWrapper } from 'google-maps-react';


function ProjectViewMap (props) {
  let source = `https://maps.googleapis.com/maps/api/js?key=${map.map}&callback=initMap`

  //Geocode.setApiKey(map.map);
  var address = props.project.location.street + ", " + props.project.location.city + ", " + props.project.location.state + ", " + props.project.location.zip
  console.log('address: ', address)
  let getCoords = function() {
    Geocode.fromAddress(address)
      .then(response => {
        const { lat, lng } = response.results[0].geometry.lcoation;
        console.log(lat, lng);
        return { address: address, lat: lat, lng: lng}
      })
      error => {
        console.error(error);
      }
  }
  let location = getCoords();
  console.log('location: ',location);
  return (
    <div className="project_view_map">
      <Map
        google={props.google}
        zoom={7}
        style={{width: '500px', height: '400px'}}
        initialCenter={{lat: 47.444, lng: -122.176}}
      />
    </div>
  )
}


export default GoogleApiWrapper({
  apiKey: map.map
})(ProjectViewMap);