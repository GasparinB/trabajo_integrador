import React, { Component } from 'react';
import CardDetallePeli from '../CardDetallePeli/CardDetallePeli';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loader from '../Loader/Loader';

const cookies = new Cookies();

class DetallePelicula extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pelicula: null,
            estaEnFavorito: false,
            usuarioLogueado: false
        }
    }

    componentDidMount() {
        let movieId = parseInt(this.props.match.params.id);

        const cookieSesion = cookies.get('auth-user')
        if (cookieSesion) {
            this.setState({
                usuarioLogueado: true
            })
        }

        let favoritoStorage = localStorage.getItem('favoritosPeliculas')
        if (favoritoStorage !== null) {
            const listaFavs = JSON.parse(favoritoStorage)
            if (listaFavs.includes(movieId)) {
                this.setState({
                    estaEnFavorito: true
                })
            }
        }

        const url = 'https://api.themoviedb.org/3/movie/' + movieId;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjgwNDM1YTlmNmY2ODhjYTI2NGE0YmM3ZmM2NjE4NyIsIm5iZiI6MTc4ODc5MTEyNi4yMjMsInN1YiI6IjZhOWVjOTU2MWRmYjExOWJiZTE0NDRkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fNwSmD2dtb7WrrbApwqjIzh_3rP9QsFLDo4sVwxP8nw'
            }
        }

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.setState({ pelicula: data });
            })
            .catch(error => console.log(error));
    }

    agregoFavorito(id) {
        let favoritoStorage = localStorage.getItem('favoritosPeliculas')
        let listaFavs = []

        if (favoritoStorage !== null) {
        listaFavs = JSON.parse(favoritoStorage);
        }

        if (!listaFavs.includes(id)) {
            listaFavs.push(id)
            localStorage.setItem('favoritosPeliculas', JSON.stringify(listaFavs))
            this.setState({
                estaEnFavorito: true
            })
        }
    };

    quitoFavorito(id) {
        let favoritoStorage = localStorage.getItem('favoritosPeliculas')
        let listaFavs = []

        if (favoritoStorage !== null) {
            listaFavs = JSON.parse(favoritoStorage);
        }
        listaFavs = listaFavs.filter(idFavorito => idFavorito !== id)
        localStorage.setItem('favoritosPeliculas', JSON.stringify(listaFavs))
        this.setState({
            estaEnFavorito: false
        })
    }

    render() {
        const { pelicula, estaEnFavorito, usuarioLogueado } = this.state;
        
        if (!pelicula) {
            return <Loader />;
        }

        return (
            <div>
                <h1 className="alert alert-primary">{pelicula.title}</h1>
                <CardDetallePeli 
                infoPeli={pelicula} 
                esFav={estaEnFavorito} 
                agregarFav={(id) => this.agregoFavorito(id)} 
                quitarFav={(id) => this.quitoFavorito(id)} 
                userSesion={usuarioLogueado} />
            </div>
        )
    }

}

export default withRouter(DetallePelicula);
