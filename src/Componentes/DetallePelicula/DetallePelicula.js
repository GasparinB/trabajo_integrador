import React, { Component } from 'react';
import CardDetallePeli from '../CardDetallePeli/CardDetallePeli';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Loader from '../Loader/Loader';
import './DetallePelicula.css';

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
        let movieId = this.props.match.params.id;

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

    render() {
        const { pelicula, usuarioLogueado } = this.state;

        if (!pelicula) {
            return <Loader />;
        }

        return (
            <div>
                <h1 className="alert alert-primary">{pelicula.title}</h1>
                <CardDetallePeli
                infoPeli={pelicula}
                userSesion={usuarioLogueado} />
            </div>
        )
    }

}

export default withRouter(DetallePelicula);
