import React from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import ReactDOM from 'react-dom';

import App from '../App.js';

import './principal.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

class Principal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            puntos: [],
            indices: 0
        };
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.agregarPunto = this.agregarPunto.bind(this);
    }

    renderPuntosM = ({ nombre, descripP, latitud, longitud }) => <Marker position={[latitud, longitud]}><Popup>{nombre}<br />{descripP}</Popup></Marker>

    handleClick(e) {
        var lat = document.getElementById('latitud');
        lat.value = e.latlng.lat;
        var long = document.getElementById('longitud');
        long.value = e.latlng.lng;
    }

    async iniciarSesion(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log(event.target);
        console.log(formData);
        const data = new URLSearchParams(formData);
        data.append("elJSON", JSON.stringify(this.state.puntos))
        await fetch('/addRuta', {
            method: 'POST',
            body: data
        }).then(res => {
            return res.json()
        }).then(resp => {
            //   if (resp.result) {
            //     this.setState({
            //       puntos: resp.puntos.puntos
            //     });
            //   }
        });

        // const puntosP = this.state.puntos;
        // puntosP.map(this.renderPuntos);
        // const position = [9.9098391, -84.0004016];
        // ReactDOM.render(
        //   <Map className="Mapa1" center={position} zoom={13} onClick={this.handleClick}>
        //     <TileLayer
        //       attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //       url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"></TileLayer>

        //     {puntosP.map(this.renderPuntos)}

        //   </Map>,
        //   document.getElementById("ContMapa"));
    }

    async agregarPunto(event) {
        event.preventDefault();
        var indice = this.state.indices;
        var newIndice = indice + 1;
        this.setState({
            indices: newIndice
        });
        var nombP = document.getElementById('nombreP').value;
        var descP = document.getElementById('descripP').value;
        var lat = parseFloat(document.getElementById('latitud').value);
        var long = parseFloat(document.getElementById('longitud').value);
        var datos = {
            indice: this.state.indices,
            nombre: nombP,
            descripP: descP,
            latitud: lat,
            longitud: long
        };
        this.state.puntos.push(datos);

        document.getElementById('nombreP').value = "";
        document.getElementById('descripP').value = "";
        document.getElementById('latitud').value = "";
        document.getElementById('longitud').value = "";
    }


    verRuta() {
        ReactDOM.render(<App />, document.getElementById('root'));
    }

    render() {
        const position = [9.9098391, -84.0004016];
        const { puntos } = this.state;
        return (
            <div id="App" className="App">
                <div className="App-header">
                    <div className="Contenedor1">
                        <div className="ContDatos">
                            <p className="Subtitulo">Nueva Ruta</p>
                            <form noValidate onSubmit={this.iniciarSesion}>
                                <input className="Campo" type="text" name="nombre" id="nombre" placeholder="Nombre de Ruta" required></input>
                                <br />
                                <input className="Campo" type="text" name="descripcion" id="descripcion" placeholder="Descripcion de Ruta" required></input>
                                <br />
                                <div className="AddRoute">
                                    <input className="Campo" type="text" name="nombreP" id="nombreP" placeholder="Nombre de Punto" required></input>
                                    <input className="Campo" type="text" name="descripP" id="descripP" placeholder="Detalle de Punto" required></input>
                                    <input readOnly className="Campo" type="number" name="latitud" id="latitud" placeholder="Latitud" required></input>
                                    <input readOnly className="Campo" type="number" name="longitud" id="longitud" placeholder="Longitud" required></input>
                                    <button className="BotonRuta" id="botonPunto" onClick={this.agregarPunto}>Agregar Punto</button>
                                </div>
                                <button className="BotonRuta" id="boton">Agregar Ruta</button>
                            </form>
                        </div>
                        <div id="ContMapa" className="ContMapaP">
                            <Map className="Mapa1" id="Mapa1" ref="map" center={position} zoom={13} onClick={this.handleClick}>
                                <TileLayer
                                    attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"></TileLayer>

                                {puntos.map(this.renderPuntosM)}
                            </Map>
                        </div>
                    </div>
                    <button className="BotonRuta" onClick={this.verRuta}>Ir a Rutas</button>
                </div>
            </div>
        );
    }
}
export default Principal;
