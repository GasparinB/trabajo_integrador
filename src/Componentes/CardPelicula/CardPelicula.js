import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class CardPelicula extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostrarDescripcion: false,
            favorito: false
        };
    }

    componentDidMount() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos'));

        if (favoritos !== null) {
            this.setState({ favorito: favoritos.includes(this.props.pelicula.id) });
        }
    }

    mostrarDescripcion = () => {
        this.setState({ mostrarDescripcion: !this.state.mostrarDescripcion });
    }

    agregarAFavoritos = (id) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos'));

        if (favoritos !== null) {
            if (!favoritos.includes(id)) {
                favoritos.push(id);
            }
            const guardarFavoritos = JSON.stringify(favoritos);
            localStorage.setItem('favoritos', guardarFavoritos);
        } else {
            const primerFavorito = [id];
            const guardarFavoritos = JSON.stringify(primerFavorito);
            localStorage.setItem('favoritos', guardarFavoritos);
        }

        this.setState({ favorito: true });
    }

    sacarDeFavoritos = (id) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos'));

        if (favoritos !== null) {
            const nuevosFavoritos = favoritos.filter(favoritoId => favoritoId !== id);
            const guardarFavoritos = JSON.stringify(nuevosFavoritos);
            localStorage.setItem('favoritos', guardarFavoritos);
        }
        this.setState({ favorito: false });
    }

    render() {
        return (
            <article className='pelicula-card'>
                <img src={this.props.image} alt={this.props.title} />
                <h2>{this.props.title}</h2>
                <button className='verMas' onClick={this.mostrarDescripcion}>
                    {this.state.mostrarDescripcion ? 'Ver Menos' : 'Ver Más'}
                </button>
                <p className={this.state.mostrarDescripcion ? 'mostrar' : 'ocultar'}>{this.props.description}</p>
                <Link className='detail-button' to={`/detalle/${this.props.id}`}>Ver detalle</Link>
                {this.state.favorito ? (
                    <button onClick={() => this.sacarDeFavoritos(this.props.id)}>Sacar de favoritos</button>
                ) : (
                    <button onClick={() => this.agregarAFavoritos(this.props.id)}>Agregar a favoritos</button>
                )
                }

            </article>
        )
    }

}
