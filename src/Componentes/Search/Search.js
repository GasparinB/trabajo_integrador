import React, { Component } from 'react';
import Loader from '../Loader/Loader';
import CardSeries from '../CardSeries/CardSeries';
import CardPelicula from '../CardPelicula/CardPelicula';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            busqueda: '',
            resultados: [],
            cargando: true
        };
    }

    componentDidMount() {
        const url = `https://api.themoviedb.org/3/search/multi?query=${this.props.busqueda}&page=1`;
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
                this.setState({
                    busqueda: this.props.busqueda,
                    resultados: data.results,
                    cargando: false
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        if (this.state.cargando) {
            return <Loader />;
        }

        return (
            <div className="search-results">
                <h1>Resultados para: {this.state.busqueda}</h1>

                <section className="grupo-resultados">
                    <h2>Películas</h2>
                    <div className="peliculas-container">
                        {this.state.resultados.map((resultado, index) => {
                            if (resultado.media_type === 'movie') {
                                return (
                                    <CardPelicula
                                        key={index}
                                        id={resultado.id}
                                        title={resultado.title}
                                        image={`https://image.tmdb.org/t/p/w500${resultado.poster_path}`}
                                        description={
                                            resultado.overview !== ''
                                                ? resultado.overview
                                                : 'Descripción no disponible.'
                                        }
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </section>

                <section className="grupo-resultados">
                    <h2>Series</h2>
                    <div className="peliculas-container">
                        {this.state.resultados.map((resultado, index) => {
                            if (resultado.media_type === 'tv') {
                                return (
                                    <CardSeries
                                        key={resultado.id+index}
                                        id={resultado.id}
                                        title={resultado.name}
                                        image={`https://image.tmdb.org/t/p/w500${resultado.poster_path}`}
                                        description={
                                            resultado.overview !== ''
                                                ? resultado.overview
                                                : 'Descripción no disponible.'
                                        }
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </section>
            </div>
        );
    }
}

export default Search;
