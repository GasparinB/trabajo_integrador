import React, { Component } from 'react';

class Peliculas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculas: []
        };
    }

    componentDidMount() {
        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=es-ES&page=1';
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
        const { peliculas } = this.state;
        const topMovies = peliculas.filter((pelicula, index) => index < 5);
        return topMovies.map((pelicula) => (
            <div key={pelicula.id} className="card">
                <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                <h3>{pelicula.title}</h3>
                <p>{pelicula.overview}</p>
            </div>
        ));
    }
}

export default Peliculas;