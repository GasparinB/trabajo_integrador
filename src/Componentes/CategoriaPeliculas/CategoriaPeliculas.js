import React, { Component } from "react";
import "./CategoriaPeliculas.css";
import CardPelicula from "../CardPelicula/CardPelicula";

class CategoriaPeliculas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      filtro: '',
      pagina: 1,
    };
  }

componentDidMount() {
    this.cargarPeliculas();
  }

  cargarPeliculas = () => {
        const url = 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=' + this.state.pagina;
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
                if (data.results !== undefined) {
                    this.setState(prevState => ({
                        peliculas: [...prevState.peliculas, ...data.results]
                    }));
                } else {
                    console.log('No se pudieron cargar peliculas', data);
                }
            })
            .catch(error => console.log(error));
  };

  cargarMasPeliculas = () => {
    this.setState(
      prevState => ({ pagina: prevState.pagina + 1 }),
      () => {
        this.cargarPeliculas();
      }
    );
  };

  filtrarContenido = (event) => {
    this.setState({ filtro: event.target.value });
  };

  getPeliculasFiltradas = () => {
    const { peliculas, filtro } = this.state;
    return peliculas.filter(pelicula =>
      pelicula.title.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  handleCargarMas = () => {
    this.cargarMasPeliculas();
  };

  handleFiltrar = (event) => {
    this.filtrarContenido(event);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Filtrar contenido"
          value={this.state.filtro}
          onChange={this.handleFiltrar}
        />
        <div className="peliculas-container">
            {this.getPeliculasFiltradas().map(pelicula => (
              <CardPelicula
                key={pelicula.id}
                id={pelicula.id}
                title={pelicula.title}
                image={pelicula.poster_path !== null ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}` : ''}
                description={pelicula.overview !== '' ? pelicula.overview : 'Descripción no disponible.'}
              />
            ))}
        </div>
        <button onClick={this.handleCargarMas}>Cargar más</button>
      </div>
    );
  }
}

export default CategoriaPeliculas;
