import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CardSeries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mostrarDescripcion: false,
            favorito: false
        };
    }

    componentDidMount() {
        const favoritos = JSON.parse(localStorage.getItem('favoritosSeries'));

        if (favoritos !== null) {
            let idsFavoritos = favoritos.map(favorito => favorito !== null && favorito.id !== undefined ? favorito.id : favorito);
            this.setState({
                favorito: idsFavoritos.includes(this.props.id) || idsFavoritos.includes(String(this.props.id))
            });
        }
    }

    mostrarDescripcion = () => {
        this.setState({
            mostrarDescripcion: !this.state.mostrarDescripcion
        });
    }

    agregarAFavoritos = (id) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritosSeries'));

        if (favoritos !== null) {
            if (!favoritos.includes(id)) {
                favoritos.push(id);
            }
            let guardarFavoritos = JSON.stringify(favoritos);
            localStorage.setItem('favoritosSeries',guardarFavoritos);
        } else {
            let primerFavorito = [id];
            let guardarFavoritos =JSON.stringify(primerFavorito);
            localStorage.setItem('favoritosSeries',guardarFavoritos);
        }

        this.setState({
            favorito: true
        });
    }

    sacarDeFavoritos = (id) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritosSeries')
        );

        if (favoritos !== null) {
            let nuevosFavoritos = favoritos.filter(favorito => {
                let favoritoId = favorito !== null && favorito.id !== undefined ? favorito.id : favorito;
                return favoritoId !== id && favoritoId !== String(id);
            });
            let guardarFavoritos =JSON.stringify(nuevosFavoritos);
            localStorage.setItem('favoritosSeries',guardarFavoritos);
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
                <img src={this.props.image} alt={this.props.title}/>
                <h2>{this.props.title}</h2>
                <button className='verMas' onClick={this.mostrarDescripcion}>
                    {this.state.mostrarDescripcion ? 'Ocultar descripción' : 'Ver descripción'}
                </button>
                <p className={this.state.mostrarDescripcion ? 'mostrar' : 'ocultar'}>
                    {this.props.description}
                </p>
                <Link className='detail-button' to={`/serie/${this.props.id}`}>Ver detalle</Link>
                {usuarioLogueado !== undefined && (this.state.favorito ? (
                    <button onClick={() => this.sacarDeFavoritos(this.props.id)}>Sacar de favoritos</button>
                    ) : (
                    <button onClick={() => this.agregarAFavoritos(this.props.id)}>Agregar a favoritos</button>
                    )
                )}
            </article>
        );
    }
}

export default CardSeries;
