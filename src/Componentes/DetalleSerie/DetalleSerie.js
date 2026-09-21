import React, { Component } from 'react';
import CardDetalleSerie from '../CardDetalleSerie/CardDetalleSerie';
import { withRouter } from 'react-router-dom';
import Loader from '../Loader/Loader';

class DetalleSerie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            serie: null
        }
    }

    componentDidMount() {
        const serieId = this.props.match.params.id
        const url = 'https://api.themoviedb.org/3/tv/' + serieId;
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
                this.setState({ serie: data});
            })
            .catch(error => console.log(error));
    }

    render() {
        const { serie } = this.state;

        if (!serie) {
            return <Loader />;
        }

        return (
            <div>
                <h1 className="alert alert-primary">{serie.original_name}</h1>
                <CardDetalleSerie 
                    infoSerie = {serie}
                />
            </div>
        )
    }
}

export default withRouter(DetalleSerie);