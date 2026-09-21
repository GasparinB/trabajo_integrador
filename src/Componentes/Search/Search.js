import React, { Component } from 'react';
import Loader from '../Loader/Loader';

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
        this.setState({ busqueda: this.props.busqueda });
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
                    resultados: data.results || [],
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
            <div>
                <h2>Resultados de búsqueda</h2>
                <ul>
                    {this.state.resultados.map((resultado, index) => (
                        <li key={index}>{resultado.title || resultado.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Search;
