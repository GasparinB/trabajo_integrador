import React, { Component } from 'react';
import CardPelicula from '../CardPelicula/CardPelicula';

class Peliculas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peliculas: []
        };
    }

    componentDidMount() {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjgwNDM1YTlmNmY2ODhjYTI2NGE0YmM3ZmM2NjE4NyIsIm5iZiI6MTc4ODc5MTEyNi4yMjMsInN1YiI6IjZhOWVjOTU2MWRmYjExOWJiZTE0NDRkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fNwSmD2dtb7WrrbApwqjIzh_3rP9QsFLDo4sVwxP8nw'
            }
        };

        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                this.setState({ peliculas: data.results });
            })
            .catch(error => console.log(error));
    }

    topPopularMovies() {
        const peliculas = this.state.peliculas;
        const topMovies = peliculas.filter((pelicula, index) => index < 4);

        return topMovies.map(pelicula => (
            <CardPelicula 
                key={pelicula.id} 
                id={pelicula.id} 
                title={pelicula.title}
                image={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                description={pelicula.overview !== '' ? pelicula.overview : 'Descripción no disponible.'}
            />
        ));
    }

    render() {
        return(
            <div className="peliculas-container">{this.topPopularMovies()}</div>
        );
    }
}

export default Peliculas;