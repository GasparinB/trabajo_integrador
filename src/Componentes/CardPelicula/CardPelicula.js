import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './CardPelicula.css';

const cookies = new Cookies();

class CardPelicula extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mostrarDescripcion: false,
            favorito: false
        };
    }

    componentDidMount() {
        let favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

        if (favoritos !== null) {
            this.setState({
                favorito: favoritos.includes(this.props.id)
            });
        }
    }

    mostrarDescripcion() {
        this.setState({ 
            mostrarDescripcion: !this.state.mostrarDescripcion
        });
    }

    agregarAFavoritos(id) {
        let favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

        if (favoritos !== null) {
            if (!favoritos.includes(id)) {
                favoritos.push(id);
            }
            let guardarFavoritos = JSON.stringify(favoritos);
            localStorage.setItem('favoritosPeliculas', guardarFavoritos);
        } else {
            let primerFavorito = [id];
            let guardarFavoritos = JSON.stringify(primerFavorito);
            localStorage.setItem('favoritosPeliculas', guardarFavoritos);
        }

        this.setState({ 
            favorito: true 
        });
    }

    sacarDeFavoritos(id) {
        let favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

        if (favoritos !== null) {
            let nuevosFavoritos = favoritos.filter(favoritoId => favoritoId !== id
            );
            let guardarFavoritos = JSON.stringify(nuevosFavoritos);
            localStorage.setItem('favoritosPeliculas', guardarFavoritos);
        }
        this.setState({ 
            favorito: false 
        });

        if (this.props.onRemoveFavorito !== undefined) {
            this.props.onRemoveFavorito(id);
        }
    }

    render() {
        let usuarioLogueado = cookies.get('auth-user');

        return (
            <article className='pelicula-card'>
                <img src={this.props.image} alt={this.props.title} />
                <h2>{this.props.title}</h2>
                <button className='verMas' onClick={() => this.mostrarDescripcion()}>
                    {this.state.mostrarDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
                </button>
                <p className={this.state.mostrarDescripcion ? 'mostrar' : 'ocultar'}>{this.props.description}</p>
                <Link className='detail-button' to={`/pelicula/${this.props.id}`}>Ver detalle</Link>
                {usuarioLogueado ? (
                    this.state.favorito ? (
                        <button onClick={() => this.sacarDeFavoritos(this.props.id)}>Sacar de favoritos</button>
                    ) : (
                        <button onClick={() => this.agregarAFavoritos(this.props.id)}>Agregar a favoritos</button>)
                ) : (
                    ''
                )}
            </article>
        );
    }
}

export default CardPelicula;
