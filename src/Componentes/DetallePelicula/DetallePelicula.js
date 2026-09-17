import React, { Component } from 'react';
import CardDetallePeli from '../CardDetallePeli/CardDetallePeli';

class DetallePelicula extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pelicula: null,
        }
    }
    componentDidMount() {
        const movieId = this.props.id
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
                this.setState({ pelicula: data.results });
            })
            .catch(error => console.log(error));

    }



    render() {
        <div>
             <h2 class="alert alert-primary">{this.state.pelicula.title}</h2>
            <CardDetallePeli infoPeli = {this.state.pelicula}/>
        </div>
    }


}

export default DetallePelicula;
