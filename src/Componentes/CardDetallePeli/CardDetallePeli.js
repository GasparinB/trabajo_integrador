import React, { Component } from 'react';
import Favorito from '../Favorito/Favorito';

class CardDetallePeli extends Component {
    constructor(props) {
        super(props)
        this.state = {
            peli: '',
            favorito: false
        }
    
    }
    componentDidMount() {
        const favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

        if (favoritos !== null) {
            let idsFavoritos = favoritos.map(favorito => favorito !== null && favorito.id !== undefined ? favorito.id : favorito);
            this.setState({
                favorito: idsFavoritos.includes(this.props.infoPeli.id) || idsFavoritos.includes(String(this.props.infoPeli.id))
            });
        }
    }
    agregarAFavoritos(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

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

        this.setState({ favorito: true });
    }

    sacarDeFavoritos(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

        if (favoritos !== null) {
            let nuevosFavoritos = favoritos.filter(favorito => {
                let favoritoId = favorito !== null && favorito.id !== undefined ? favorito.id : favorito;
                return favoritoId !== id && favoritoId !== String(id);
            });
            let guardarFavoritos = JSON.stringify(nuevosFavoritos);
            localStorage.setItem('favoritosPeliculas', guardarFavoritos);
        }
        this.setState({ favorito: false });
        if (this.props.onRemoveFavorito !== undefined) {
            this.props.onRemoveFavorito(id);
        }
    }

    render() {
        return (
            <section class="row">
                <img class="col-md-6" src="https://image.tmdb.org/t/p/w500/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg" alt=""/>
                <section class="col-md-6 info">
                    <h3>Descripción</h3>
                    <p class="description">Superman, a journalist in Metropolis, embarks on a journey to reconcile his
                        Kryptonian heritage with his human upbringing as Clark Kent.</p>
                    <p class="mt-0 mb-0" id="release-date"><strong>Fecha de estreno:</strong> 2025-07-09</p>
                    <p class="mt-0 mb-0 length"><strong>Duración:</strong> 130</p>
                    <p class="mt-0" id="votes"><strong>Puntuación:</strong> 7.534</p>
                </section>
            </section>
        )
}


}

export default CardDetallePeli