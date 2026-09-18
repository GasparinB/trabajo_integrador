import React, { Component } from 'react';
import Favorito from '../Favorito/Favorito';

class CardDetalleSerie extends Component {
    render() {
        const { infoSerie } = this.props
        return (
            
            <section className="row">
                <img className="col-md-6" src={`https://image.tmdb.org/t/p/w500/${infoSerie.poster_path}`} alt={infoSerie.original_name} />

                <section className="col-md-6 info">
                    <h3>{infoSerie.original_name}</h3>
                    <p className="mt-0" id="votes"><strong>Calificación:</strong> {infoSerie.vote_average}</p>
                    <p className="mt-0" id="votes"><strong>Fecha de estreno:</strong>{infoSerie.first_air_time}</p>
                    <h4>Sinopsis</h4>
                    <p className="description">{infoSerie.overview}</p>
                    <div> 
                        <p>Géneros:</p> 
                        <ul> 
                            {infoSerie.genres.map((genero) => (
                                <li>{genero.name}</li>
                            ))}
                        </ul> 
                    </div>
                </section>
            </section>
        )
}


}

export default CardDetalleSerie