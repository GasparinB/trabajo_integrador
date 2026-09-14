import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BuscadorBarra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: ''
        };
    }

    guardarEstado(event) {
        this.setState({
            busqueda: event.target.value
        });
    }
    ejecutarBusqueda(event) {
        event.preventDefault();
        this.props.history.push('/search/' + this.state.busqueda);
    }

    render() {
        return (
            <div className="contenedor-buscador">
                <form className="search-form" onSubmit={(event) => this.ejecutarBusqueda(event)}>
                    <label>Buscador</label>
                    <input  type="text" placeholder="Ingresá una película/serie..." onChange={(event) => this.guardarEstado(event)}  value={this.state.busqueda}/>
                    <input className="search-button"  type="submit" value="Buscar" onClick={(event) => this.ejecutarBusqueda(event)}/>
                </form>
            </div>
        );
    }
}

export default withRouter(BuscadorBarra);