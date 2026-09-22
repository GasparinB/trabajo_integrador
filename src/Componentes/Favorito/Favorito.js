import React, { Component } from 'react';
import CardPelicula from '../CardPelicula/CardPelicula';
import CardSeries from '../CardSeries/CardSeries';
import Cookies from 'universal-cookie';
import Loader from '../Loader/Loader';
import './Favorito.css';

const cookies = new Cookies();
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjgwNDM1YTlmNmY2ODhjYTI2NGE0YmM3ZmM2NjE4NyIsIm5iZiI6MTc4ODc5MTEyNi4yMjMsInN1YiI6IjZhOWVjOTU2MWRmYjExOWJiZTE0NDRkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fNwSmD2dtb7WrrbApwqjIzh_3rP9QsFLDo4sVwxP8nw';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + token
  }
};

class Favorito extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peliculasFavoritas: [],
      seriesFavoritas: [],
      cargando: true
    };
  }

  componentDidMount() {
    const favoritosPeliculas = JSON.parse(localStorage.getItem('favoritosPeliculas')) || [];
    const favoritosSeries = JSON.parse(localStorage.getItem('favoritosSeries')) || [];
    let peliculasCargadas = [];
    let seriesCargadas = [];

    let cantidadFavoritos = favoritosPeliculas.length + favoritosSeries.length;
    let favoritosCargados = 0;

    if (cantidadFavoritos === 0) {
        this.setState({
            cargando: false
        });
    }

    favoritosPeliculas.map(id => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
        .then(response => response.json())
        .then(data => {
          if (data.id !== undefined) {
            peliculasCargadas = peliculasCargadas.concat(data);
            this.setState({
              peliculasFavoritas: peliculasCargadas
            });
          }
          favoritosCargados = favoritosCargados + 1;
          
          if (favoritosCargados === cantidadFavoritos) {
            this.setState({
              cargando: false
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    });

    favoritosSeries.map(id => {
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, options)
        .then(response => response.json())
        .then(data => {
          if (data.id !== undefined) {
            seriesCargadas = seriesCargadas.concat(data);
            this.setState({
              seriesFavoritas: seriesCargadas
            });
          } 
          favoritosCargados = favoritosCargados + 1;
          
          if (favoritosCargados === cantidadFavoritos) {
            this.setState({
              cargando: false
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  quitarPeliculaFavorita(id){
    this.setState({
      peliculasFavoritas: this.state.peliculasFavoritas.filter(pelicula => pelicula.id !== id)
    });
  }

  quitarSerieFavorita(id){
    this.setState({
      seriesFavoritas: this.state.seriesFavoritas.filter(serie => serie.id !== id)
    });
  }

  render() {
    const usuarioLogueado = cookies.get('auth-user');

    if (!usuarioLogueado) {
      return <p>Tenés que iniciar sesión para ver tus favoritos.</p>;
    }

    if (this.state.cargando) {
      return <Loader />;
    }

    return (
      <div className="ListadoFavoritos">
        <h2>Películas favoritas</h2>
        <section className="favoritosContainer">
          {this.state.peliculasFavoritas.length > 0 ? (
            this.state.peliculasFavoritas.map(pelicula => (
              <CardPelicula
                key={pelicula.id}
                id={pelicula.id}
                title={pelicula.title}
                image={pelicula.poster_path !== null ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : ''}
                description={pelicula.overview !== '' ? pelicula.overview : 'Descripción no disponible.'}
                onRemoveFavorito={(id) => this.quitarPeliculaFavorita(id)}
              />
            ))
          ) : (
            <p>No tenés películas favoritas.</p>
          )}
        </section>

        <h2>Series favoritas</h2>
        <section className="favoritosContainer">
          {this.state.seriesFavoritas.length > 0 ? (
            this.state.seriesFavoritas.map(serie => (
              <CardSeries
                key={serie.id}
                id={serie.id}
                title={serie.name}
                image={serie.poster_path !== null ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''}
                description={serie.overview !== '' ? serie.overview : 'Descripción no disponible.'}
                onRemoveFavorito={(id) => this.quitarSerieFavorita(id)}
              />
            ))
          ) : (
            <p>No tenés series favoritas.</p>
          )}
        </section>
      </div>
    );
  }
}

export default Favorito;
