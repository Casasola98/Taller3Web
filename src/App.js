
import React from 'react';
import { Map, TileLayer, Marker, Popup } from './react-leaflet/src'
import './App.css';
import Principal from './principal.js';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      rutas: [],
      puntos: []
    };
    this.drawRuta = this.drawRuta.bind(this);
  }

  async componentDidMount() {
    let resp = await fetch('/rutas');
    let rutas = await resp.json();
    this.setState({
      rutas: rutas.rutas
    });
  }
  renderRuta = ({ nombre }) => <option value={nombre}>{nombre}</option>
  renderPuntos = ({ nombre, descripcion, latitud, longitud }) => <Marker position={[latitud, longitud]}><Popup>{nombre}<br />{descripcion}</Popup></Marker>

  async addRuta(event) {
    ReactDOM.render(<Principal />, document.getElementById('root'));
  }

  async drawRuta(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = { rutaS: this.refs.rutaS.value };
    console.log(data.rutaS);
    await fetch('/puntos', {
      method: 'POST',
      body: data
    }).then(res => {
      console.log(res);
      return res.json()
    }).then(resp => {
      this.setState({
        puntos: resp.allPuntos
      });
    });

    const { puntos } = this.state;
    const position = [9.9098391, -84.0004016];
    ReactDOM.render(
      <Map className="Mapa1" center={position} zoom={13}>
        <TileLayer
          attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"></TileLayer>

        {puntos.map(this.renderPuntos)}

      </Map>,
      document.getElementById("ContMapa"));
  }

  render() {
    const position = [9.9098391, -84.0004016];
    const { rutas, puntos } = this.state;
    return (
      <div id="App" className="App">
        <div className="App-header">
          <form noValidate onSubmit={this.drawRuta}>
            <select ref="rutaS" className="SelectRuta">
              {rutas.map(this.renderRuta)}
            </select>
            <button className="BotonRuta" id="boton">Pintar</button>
          </form>
          <div id="ContMapa" className="ContMapa">


          </div>
          <button className="BotonRuta" onClick={this.addRuta}>Crear ruta</button>
        </div>
      </div>
    );
  }
}
export default App;
