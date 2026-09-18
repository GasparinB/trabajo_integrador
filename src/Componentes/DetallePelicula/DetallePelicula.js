import React, { Component } from 'react';
import CardDetallePeli from '../CardDetallePeli/CardDetallePeli';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

class DetallePelicula extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pelicula: null,
        }
    }
    componentDidMount() {
        const movieId = this.props.match.params.id
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
                this.setState({ pelicula: data});
            })
            .catch(error => console.log(error));

    }



    render() {
        const { pelicula } = this.state;
        if (!pelicula) {
            return <p>Cargando...</p>;
        }

        return (
            <div>
                <h1 className="alert alert-primary">{pelicula.title}</h1>
                <CardDetallePeli infoPeli = {pelicula}/>
            </div>
        )
    }


}

export default withRouter(DetallePelicula);
