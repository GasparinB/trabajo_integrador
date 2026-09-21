import React, { Component } from 'react';

class CardDetallePeli extends Component {
  constructor(props) {
    super(props);

    this.state = {
      estaEnFavorito: false
    };
  }

  componentDidMount() {
    let favoritoStorage = localStorage.getItem('favoritosPeliculas')
    let listaFavs = []

    if (favoritoStorage !== null) {
      listaFavs = JSON.parse(favoritoStorage);
    }

    if (listaFavs.includes(this.props.infoPeli.id)) {
      this.setState({
        estaEnFavorito: true
      })
    }
  }
      agregoFavorito(id) {
        let favoritoStorage = localStorage.getItem('favoritosPeliculas')
        let listaFavs = []

        if (favoritoStorage !== null) {
        listaFavs = JSON.parse(favoritoStorage);
        }

        if (!listaFavs.includes(id)) {
            listaFavs.push(id)
            localStorage.setItem('favoritosPeliculas', JSON.stringify(listaFavs))
            this.setState({
                estaEnFavorito: true
            })
        }
    }

    quitoFavorito(id) {
        let favoritoStorage = localStorage.getItem('favoritosPeliculas')
        let listaFavs = []

        if (favoritoStorage !== null) {
            listaFavs = JSON.parse(favoritoStorage);
        }
        listaFavs = listaFavs.filter(idFavorito => idFavorito !== id)
        localStorage.setItem('favoritosPeliculas', JSON.stringify(listaFavs))
        this.setState({
            estaEnFavorito: false
        })
    }
    render() {
        const { infoPeli, userSesion } = this.props
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
                    {userSesion ? ( this.state.estaEnFavorito ? (
                        <button onClick={() => this.quitoFavorito(infoPeli.id) }>
                            Quitar de Favoritos
                        </button>
                    ) :
                    (
                        <button onClick={() => this.agregoFavorito(infoPeli.id) }>
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

export default CardDetallePeli
