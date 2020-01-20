import React, { Component } from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Principal from './components/principal.js';
import LeafletMap from './components/LeafletMap';
import ReactDOM from 'react-dom';

import './components/App.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      rutas: [],
      puntos: [],
      dots: []
    };
    this.cargarPuntos = this.cargarPuntos.bind(this);
  }

  async componentDidMount() {
    let resp = await fetch('/rutas');
    let rutas = await resp.json();
    this.setState({
      rutas: rutas.rutas
    });
    console.log(rutas.rutas);
  }

  renderRuta = ({ nombre }) => <option value={nombre}>{nombre}</option>
  renderPuntos = ({ nombre, descripcion, latitud, longitud }) => <Marker position={[latitud, longitud]}><Popup>{nombre}<br />{descripcion}</Popup></Marker>
  renderPuntos2 = ({ latitud, longitud }) => {
    this.state.dots.push(L.latLng(latitud, longitud));
  }
  renderPuntos3 = ({ nombre, descripcion, latitud, longitud }) => <p className="DatoPunto">{nombre} / {descripcion} / {latitud} / {longitud}</p>

  async cargarPuntos(event) {
    event.preventDefault();

    // form is valid! We can parse and submit data
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);
    await fetch('/getPuntos', {
      method: 'POST',
      body: data
    }).then(res => {
      return res.json()
    }).then(resp => {
      if (resp.result) {
        this.setState({
          puntos: resp.puntos.puntos
        });
      }
    });


    this.setState(
      {
        dots: []
      }
    );
    const { rutas, puntos, dots } = this.state;
    console.log("ALLA");
    console.log(this.state.dots);
    ReactDOM.render(<LeafletMap puntos={puntos} dots={dots}></LeafletMap>, document.getElementById('ContMapa'));
  }

  agregarRuta() {
    ReactDOM.render(<Principal />, document.getElementById('root'));
  }

  render() {
    const position = [9.9098391, -84.0004016];
    const { rutas, puntos, dots } = this.state;
    return (
      <div id="App" className="App">
        <div className="App-header">
          <p className="Subtitulo">Presentación de Rutas</p>
          <form noValidate onSubmit={this.cargarPuntos}>
            <select ref="rutaS" id="rutaS" name="rutaS" className="SelectRuta">
              {rutas.map(this.renderRuta)}
            </select>
            <button className="BotonRuta" id="boton">Pintar</button>
          </form>
          {puntos.map(this.renderPuntos2)}
          <div id="ContMapa" className="ContMapa">

          </div>
          {puntos.map(this.renderPuntos3)}
          <button className="BotonRuta" onClick={this.agregarRuta}>Agregar Ruta</button>
        </div>
      </div >
    );
  }
}

export default App;
