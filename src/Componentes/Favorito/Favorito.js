import React, { Component } from 'react';
import './Favorito.css';
import CardPelicula from '../CardPelicula/CardPelicula';
import CardSeries from '../CardSeries/CardSeries';
import Cookies from 'universal-cookie';

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
      loading: true
    };
  }

  componentDidMount() {
    this.cargarFavoritos();
  }

  obtenerIdsGuardados = (nombreStorage) => {
    const favoritos = JSON.parse(localStorage.getItem(nombreStorage)) || [];

    const idsFavoritos = favoritos
      .filter(favorito => favorito !== null)
      .map(favorito => favorito.id !== undefined ? favorito.id : favorito)
      .filter(id => id !== undefined && id !== null);

    localStorage.setItem(nombreStorage, JSON.stringify(idsFavoritos));

    return idsFavoritos;
  }

  cargarFavoritos = () => {
    const favoritosPeliculas = this.obtenerIdsGuardados('favoritosPeliculas');
    const favoritosSeries = this.obtenerIdsGuardados('favoritosSeries');
    const totalPedidos = favoritosPeliculas.length + favoritosSeries.length;
    let pedidosTerminados = 0;

    this.setState({
      peliculasFavoritas: [],
      seriesFavoritas: [],
      loading: totalPedidos > 0
    });

    if (totalPedidos === 0) {
      return;
    }

    const revisarFinDeCarga = () => {
      pedidosTerminados++;

      if (pedidosTerminados === totalPedidos) {
        this.setState({ loading: false });
      }
    };

    favoritosPeliculas.map(id => {
      fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES`, options)
        .then(response => response.json())
        .then(data => {
          if (data.id !== undefined) {
            this.setState(prevState => ({
              peliculasFavoritas: [...prevState.peliculasFavoritas, data]
            }));
          } else {
            console.log('No se pudo cargar la pelicula favorita', id, data);
          }
          revisarFinDeCarga();
        })
        .catch(error => {
          console.log(error);
          revisarFinDeCarga();
        });

      return null;
    });

    favoritosSeries.map(id => {
      fetch(`https://api.themoviedb.org/3/tv/${id}?language=es-ES`, options)
        .then(response => response.json())
        .then(data => {
          if (data.id !== undefined) {
            this.setState(prevState => ({
              seriesFavoritas: [...prevState.seriesFavoritas, data]
            }));
          } else {
            console.log('No se pudo cargar la serie favorita', id, data);
          }
          revisarFinDeCarga();
        })
        .catch(error => {
          console.log(error);
          revisarFinDeCarga();
        });

      return null;
    });
  }

  quitarPeliculaFavorita = (id) => {
    this.setState({
      peliculasFavoritas: this.state.peliculasFavoritas.filter(pelicula => pelicula.id !== id)
    });
  }

  quitarSerieFavorita = (id) => {
    this.setState({
      seriesFavoritas: this.state.seriesFavoritas.filter(serie => serie.id !== id)
    });
  }

  render() {
    const usuarioLogueado = cookies.get('auth-user');

    if (usuarioLogueado === undefined) {
      return <p>Tenés que iniciar sesión para ver tus favoritos.</p>;
    }

    if (this.state.loading) {
      return <p>Cargando favoritos...</p>;
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
                onRemoveFavorito={this.quitarPeliculaFavorita}
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
                onRemoveFavorito={this.quitarSerieFavorita}
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
