import React, { Component } from 'react';
import CardSeries from '../CardSeries/CardSeries';
import Loader from '../Loader/Loader';

class CategoriaSeries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      filtro: '',
      pagina: 1,
      cargando: true
    };
  }

  componentDidMount() {
    this.cargarSeries();
  }

  cargarSeries() {
    
    this.setState({
      cargando: true
    });

    const url = 'https://api.themoviedb.org/3/tv/popular?language=es-ES&page=' + this.state.pagina;
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
        this.setState(({
          series: this.state.series.concat(data.results),
          cargando: false
        }));
      })
      .catch(error => console.log(error));
  }

  cargarMasSeries() {
    this.setState(
      ({ pagina: this.state.pagina + 1 }),
      () => {
        this.cargarSeries();
      }
    );
  }

  filtrarContenido(event) {
    this.setState({ filtro: event.target.value });
  }

  getSeriesFiltradas() {
    const { series, filtro } = this.state;
    return series.filter(serie =>
      serie.name.toLowerCase().includes(filtro.toLowerCase())
    );
  }

  handleCargarMas() {
    this.cargarMasSeries();
  }

  handleFiltrar(event) {
    this.filtrarContenido(event);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="filter-input"
          placeholder="Filtrar contenido"
          value={this.state.filtro}
          onChange={(event) => this.handleFiltrar(event)}
        />
        <div>
          <div className="peliculas-container">
            {this.getSeriesFiltradas().map((serie, index) => (
              <CardSeries
                key={serie.id}
                id={serie.id}
                title={serie.name}
                image={serie.poster_path !== null ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''}
                description={serie.overview !== '' ? serie.overview : 'Descripción no disponible.'}
              />
            ))}
          </div>
        </div>
        {this.state.cargando ? (
          <Loader />
        ) : (
          ''
        )}
        <button className="cargar-mas" onClick={() => this.handleCargarMas()}>Cargar más</button>
      </div>
    );
  }
}

export default CategoriaSeries;
