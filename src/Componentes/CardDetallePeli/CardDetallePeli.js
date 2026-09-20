import React, { Component } from 'react';

class CardDetallePeli extends Component {
    render() {
        const { infoPeli, esFav, agregarFav, quitarFav, userSesion } = this.props
        return (
            
            <section className="row">
                <img className="col-md-6" src={`https://image.tmdb.org/t/p/w500/${infoPeli.poster_path}`} alt={infoPeli.title} />

                <section className="col-md-6 info">
                    <h3>{infoPeli.title}</h3>
                    <p className="mt-0" id="votes"><strong>Calificación:</strong> {infoPeli.vote_average}</p>
                    <p className="mt-0" id="votes"><strong>Fecha de estreno:</strong>{infoPeli.release_date}</p>
                    <p className="mt-0 mb-0 length"><strong>Duración:</strong>{infoPeli.runtime} min</p>
                    <h4>Sinopsis</h4>
                    <p className="description">{infoPeli.overview}</p>
                    <div> 
                        <p>Géneros:</p> 
                        <ul> 
                            {infoPeli.genres.map((genero) => (
                                <li >{genero.name}</li>
                            ))}
                        </ul> 
                    </div>
                    {userSesion && ( esFav ? (
                        <button onClick={() => quitarFav(infoPeli.id) }> 
                            Quitar de Favoritos
                        </button> 
                    ) :
                    (
                        <button onClick={() => agregarFav(infoPeli.id) }> 
                            Agregar a Favoritos
                        </button> 
                    )
                    )}
                </section>
            </section>
        )
}


}

export default CardDetallePeli