import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import '../../App.css';


export default class HeatMap extends Component {
  constructor(props) {
  super(props);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    }
  }

  render() {
    const position = this.props.latlng;
    
    if (position) {
      console.log(position, [this.props.lat, this.props.lng]);
      return (
        <Map className="heatmap" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map> 
    );
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  } 
}