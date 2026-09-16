import React, { Component } from 'react';
import CardSeries from '../CardSeries/CardSeries';


/*
Para cada grupo de contenido de la Home se debe generar una página que debe mostrar todos los contenidos de la sección clickeada y tener las siguientes funcionalidades:
Cargar más: el endpoint entrega una cantidad fija de resultados. Esta funcionalidad debe mostrar más contenidos al usuario con cada interacción.
Un formulario de un campo que permita filtrar contenido cargado.
*/

class CategoriaSeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      filtro: '',
      pagina: 1,
    };
  }

  componentDidMount() {
    this.cargarSeries();
  }

  cargarSeries = () => {
      const url ='https://api.themoviedb.org/3/tv/popular?language=es-ES&page=' + this.state.pagina;
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
                this.setState(prevState => ({
                    series: [...prevState.series, ...data.results]
                }));
            })
            .catch(error => console.log(error));
  };

  cargarMasSeries = () => {
    this.setState(
      prevState => ({ pagina: prevState.pagina + 1 }),
      () => {
        this.cargarSeries();
      }
    );
  };

  filtrarContenido = (event) => {
    this.setState({ filtro: event.target.value });
  };
  getSeriesFiltradas = () => {
    const { series, filtro } = this.state;
    return series.filter(serie =>
      serie.name.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  handleCargarMas = () => {
    this.cargarMasSeries();
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
        <div>
          <h2>Series</h2>
          <div className="peliculas-container">
            {this.getSeriesFiltradas().map((serie,index) => (
                <CardSeries
                  id={serie.id}
                  name={serie.name}
                  image={serie.poster_path !== null ? `https://image.tmdb.org/t/p/w500${serie.poster_path}` : ''}
                  description={serie.overview !== '' ? serie.overview : 'Descripción no disponible.'}
                />
            ))}
            </div>
        </div>
        <button onClick={this.handleCargarMas}>Cargar más</button>
      </div>
    );
  }
}

export default CategoriaSeries;
