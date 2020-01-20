import React, { Component } from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Routing from "./RoutingMachine";
import Principal from './principal.js';
import ReactDOM from 'react-dom';

import './App.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default class LeafletMap extends Component {
  constructor() {
    super()
    this.state = {
      isMapInit: false
    };
    this.saveMap = this.saveMap.bind(this);
  }

  saveMap(map) {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  }

  renderPuntos = ({ nombre, descripcion, latitud, longitud }) => <Marker position={[latitud, longitud]}><Popup>{nombre}<br />{descripcion}</Popup></Marker>

  render() {
    const position = [9.9098391, -84.0004016];
    const { dots, puntos } = this.props;
    return (
      <Map className="Mapa1" center={position} zoom={13} ref={this.saveMap}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {puntos.map(this.renderPuntos)}
        {this.state.isMapInit && <Routing map={this.map} dots={dots} />}
      </Map>
    );
  }
}
