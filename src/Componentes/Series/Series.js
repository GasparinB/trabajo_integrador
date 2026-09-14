import React, { Component } from 'react';
import CardSeries from '../CardSeries/CardSeries';

class Series extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: []
        };
    }

    componentDidMount() {
        const url ='https://api.themoviedb.org/3/tv/popular?language=es-ES&page=1';
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
                    series: data.results
                });
            })
            .catch(error => console.log(error));
    }

    topPopularSeries() {
        const series = this.state.series;
        const topSeries = series.filter((serie, index) => index < 4);

        return topSeries.map(serie => (
            <CardSeries
                key={serie.id}
                id={serie.id}
                title={serie.name}
                image={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                description={serie.overview !== '' ? serie.overview : 'Descripción no disponible.'}
            />
        ));
    }

    render() {
        return (
            <div className="peliculas-container">
                {this.topPopularSeries()}
            </div>
        );
    }
}

export default Series;