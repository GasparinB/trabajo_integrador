import React, { Component } from 'react';
import Favorito from '../Favorito/Favorito';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class CardDetalleSerie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            favorito: false
        };
    }

    componentDidMount() {
        let favoritos = JSON.parse(localStorage.getItem('favoritosSeriez'));

        if (favoritos !== null) {
            this.setState({
                favorito: favoritos.includes(this.props.id)
            });
        }
    }

    agregarAFavoritos(id) {
        let favoritos = JSON.parse(localStorage.getItem('favoritosSeries'));

        if (favoritos !== null) {
            if (!favoritos.includes(id)) {
                favoritos.push(id);
            }
            let guardarFavoritos = JSON.stringify(favoritos);
            localStorage.setItem('favoritosSeries', guardarFavoritos);
        } else {
            let primerFavorito = [id];
            let guardarFavoritos = JSON.stringify(primerFavorito);
            localStorage.setItem('favoritosSeries', guardarFavoritos);
        }

        this.setState({ 
            favorito: true 
        });
    }

    quitarFavoritos(id) {
        let favoritos = JSON.parse(localStorage.getItem('favoritosPeliculas'));

        if (favoritos !== null) {
            let nuevosFavoritos = favoritos.filter(favoritoId => favoritoId !== id
            );
            let guardarFavoritos = JSON.stringify(nuevosFavoritos);
            localStorage.setItem('favoritosPeliculas', guardarFavoritos);
        }
        this.setState({ 
            favorito: false 
        });

        if (this.props.onRemoveFavorito !== undefined) {
            this.props.onRemoveFavorito(id);
        }
    }

    render() {
        const { infoSerie} = this.props
        let usuarioLogueado = cookies.get('auth-user')
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
                                <li >{genero.name}</li>
                            ))}
                        </ul> 
                    </div>
                    {usuarioLogueado ? ( this.state.favorito ? (
                        <button onClick={() => this.quitarFavoritos(infoSerie.id) }> 
                            Quitar de Favoritos
                        </button> 
                    ) :
                    (
                        <button onClick={() => this.agregarAFavoritos(infoSerie.id) }> 
                            Agregar a Favoritos
                        </button> 
                    )
                    ): (
                        ''
                    )}
                </section>
            </section>
        )
}


}

export default CardDetalleSerie