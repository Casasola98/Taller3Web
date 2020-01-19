import React from 'react';
import Cookies from 'universal-cookie';

import Dropdown from 'react-bootstrap/Dropdown'

import './principal.css';


import ReactSearchBox from 'react-search-box';
// Esta funcion se supone que le da el estilo al Toggle del Dropdown

const CustomToggle1 = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
        className="DropFiltro"
    >
        {children}
        &#x25bc;
    </a>
));


class Principal extends React.Component {
    constructor(props) {
	    super(props)
		this.state = {
            rutas : []
        };
	}
    async componentDidMount(){
        let resp = await fetch('/rutas');
        let rutas = await resp.json();
        this.setState({
            rutas : rutas.recetas
        });
      }
    renderRuta = ({id, nombre}) => <Dropdown.Item key={id}>{nombre}</Dropdown.Item>
     
    render() {
        const { userId, recetas, favoritas, categorias, notificaciones} = this.state;
        return (
            <div className="App">
                <div className="App-contenido">
                    <div className="Muro">

                        <div className="CuadroFiltros">
                            <div className="SuperiorFiltros">
                                <label className="Subtitulo">Filtros</label>
                                <button className="ButonGenerar"> Generar Plan </button>
                            </div>
                            <div className="InteriorCuadroFiltros">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        );
    }


}
export default Principal;
