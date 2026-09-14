import React, { Component } from 'react';
import './Favorito.css';

class Favorito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
      loading: true
    };
  }
  componentDidMount() {
    const storage = JSON.parse(localStorage.getItem('favoritos'));
    if (storage === null || storage.length === 0) {
      this.setState({
        loading: false
      });
    } else {
      let cargados = 0;
      storage.forEach((favorito) => {
        let url = "";
        if (favorito.tipo === "pelicula") {
          url = `URL_DE_TU_API_DE_PELICULAS/${favorito.id}`;
        } else if (favorito.tipo === "serie") {
          url = `URL_DE_TU_API_DE_SERIES/${favorito.id}`;
        }
        if (url !== "") {
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              data.tipo = favorito.tipo;
              this.setState((prevState) => ({
                favoritos: [
                  ...prevState.favoritos,
                  data
                ]
              }));
            })
            .catch((error) => {
              console.error(
                "Error al cargar favorito:",
                error
              );
            })
            .then(() => {
              cargados++;
              if (cargados === storage.length) {
                this.setState({
                  loading: false
                });
              }
            });
        } else {
          cargados++;
          if (cargados === storage.length) {
            this.setState({
              loading: false
            });
          }
        }
      });
    }
  }

  eliminarFavorito = (id, tipo) => {
    this.setState((prevState) => ({
      favoritos: prevState.favoritos.filter(
        (favorito) =>
          !(favorito.id === id && favorito.tipo === tipo)
      )
    }));

    const storage = JSON.parse(
      localStorage.getItem('favoritos')
    );

    if (storage !== null) {
      const favoritosActualizados = storage.filter(
        (favorito) =>
          !(favorito.id === id && favorito.tipo === tipo)
      );
      localStorage.setItem(
        'favoritos',
        JSON.stringify(favoritosActualizados)
      );

    }

  };

  render() {
    const peliculas = this.state.favoritos.filter(
      (favorito) => favorito.tipo === "pelicula"
    );

    const series = this.state.favoritos.filter(
      (favorito) => favorito.tipo === "serie"
    );

    return (
      <div className="container">
        {this.state.loading ? (
          <p>Cargando favoritos...</p>
        ) : (
          <div className="favoritosContainer">
            {/* PELÍCULAS */}
            <div className="ListadoFavoritos">
            <h2 className="alert alert-primary">
              Películas favoritas
            </h2>
            <section className="row cards">
              {peliculas.length === 0 ? (
                <p>No hay películas favoritas.</p>
              ) : (
                peliculas.map((pelicula) => (
                  <article
                    className="single-card-movie"
                    key={pelicula.id}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" +
                        pelicula.poster_path
                      }
                      className="card-img-top"
                      alt={pelicula.title}
                    />
                    <div className="cardBody">
                      <h5 className="card-title">
                        {pelicula.title}
                      </h5>
                      <p className="card-text">
                        {pelicula.overview}
                      </p>
                      <a
                        href={`/movie/${pelicula.id}`}
                        className="btn btn-primary"
                      >
                        Ver más
                      </a>
                      <button
                        className="btn alert-info"
                        onClick={() =>
                          this.eliminarFavorito(
                            pelicula.id,
                            "pelicula"
                          )
                        }
                      >
                        Eliminar ♥️
                      </button>
                    </div>
                  </article>
                ))
              )}
            </section>
            </div>
            {/* SERIES */}
            <div className="ListadoFavoritos">
            <h2 className="alert alert-warning">
              Series favoritas
            </h2>
            <section className="row cards">
              {series.length === 0 ? (
                <p>No hay series favoritas.</p>
              ) : (
                series.map((serie) => (
                  <article
                    className="single-card-tv"
                    key={serie.id}
                  >
                    <img
                      src={
                        "https://image.tmdb.org/t/p/w500" +
                        serie.poster_path
                      }
                      className="card-img-top"
                      alt={serie.name}
                    />
                    <div className="cardBody">
                      <h5 className="card-title">
                        {serie.name}
                      </h5>
                      <p className="card-text">
                        {serie.overview}
                      </p>
                      <a
                        href={`/serie/${serie.id}`}
                        className="btn btn-primary"
                      >
                        Ver más
                      </a>
                      <button
                        className="btn alert-warning"
                        onClick={() =>
                          this.eliminarFavorito(
                            serie.id,
                            "serie"
                          )
                        }
                      >
                        Eliminar ♥️
                      </button>
                    </div>
                  </article>
                ))
              )}
            </section>
          </div>
          </div>
        )}
      </div>
    );
  }
}

export default Favorito;
