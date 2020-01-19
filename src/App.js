
import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from './react-leaflet/src'
import 'leaflet/dist/leaflet.css';
import logoEF from './images/logo.png';
import './App.css';
import Principal from './principal.js';
import ReactDOM from 'react-dom';

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
      puntos: []
    };
    this.iniciarSesion = this.iniciarSesion.bind(this);
  }

  async componentDidMount() {
    let resp = await fetch('/categorias');
    let rutas = await resp.json();
    this.setState({
      rutas: rutas.categorias
    });
  }
  renderRuta = ({ nombre }) => <option value={nombre}>{nombre}</option>
  renderPuntos = ({ nombre, descripcion, latitud, longitud }) => <Marker position={[latitud, longitud]}><Popup>{nombre}<br />{descripcion}</Popup></Marker>


  async iniciarSesion(event) {
    event.preventDefault();

    // form is valid! We can parse and submit data
    const formData = new FormData(event.target);
    const data = new URLSearchParams(formData);
    await fetch('/login', {
      method: 'POST',
      body: data
    }).then(res => {
      console.log(res);
      return res.json()
    }).then(resp => {
      console.log(resp);
      if (resp.result) {
        this.setState({
          puntos: resp.puntos.puntos
        });
      }
    });

    const puntosP = this.state.puntos;
    puntosP.map(this.renderPuntos);
    const position = [9.9098391, -84.0004016];
    ReactDOM.render(
      <Map className="Mapa1" center={position} zoom={13}>
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"></TileLayer>

        {puntosP.map(this.renderPuntos)}

      </Map>,
      document.getElementById("ContMapa"));
  }

  render() {
    const { rutas, puntos } = this.state;
    return (
      <div id="App" className="App">
        <div className="App-header">
          <div className="Superior">
            <label className="Subtitulo">Inicio de Sesión</label>
          </div>
          <div className="InteriorCuadro">
            <form noValidate onSubmit={this.iniciarSesion}>
              <select ref="rutaS" id="rutaS" name="rutaS" className="SelectRuta">
                {rutas.map(this.renderRuta)}
              </select>
              <button className="BotonRuta" id="boton">Pintar</button>
            </form>
          </div>
          <div id="ContMapa" className="ContMapa">


          </div>
        </div>
      </div>
    );
  }
}
export default App;
