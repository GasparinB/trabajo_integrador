import React, { Component } from 'react';


/*
Para cada grupo de contenido de la Home se debe generar una página que debe mostrar todos los contenidos de la sección clickeada y tener las siguientes funcionalidades:
Cargar más: el endpoint entrega una cantidad fija de resultados. Esta funcionalidad debe mostrar más contenidos al usuario con cada interacción.
Un formulario de un campo que permita filtrar contenido cargado.
*/

class PeliculasySeries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      series: [],
      filtro: '',
      pagina: 1,
    };
  }

  componentDidMount() {
    this.cargarPeliculas();
    this.cargarSeries();
  }

  cargarPeliculas = () => {
    // Lógica para cargar películas desde el endpoint
  };

  cargarSeries = () => {
    // Lógica para cargar series desde el endpoint
  };

  manejarFiltro = (event) => {
    this.setState({ filtro: event.target.value });
  };

  renderPeliculasFiltradas = () => {
    const { peliculas, filtro } = this.state;
    return peliculas.filter(pelicula => pelicula.titulo.includes(filtro));
  };

  renderSeriesFiltradas = () => {
    const { series, filtro } = this.state;
    return series.filter(serie => serie.titulo.includes(filtro));
  };

  cargarMas = () => {
    this.setState(prevState => ({ pagina: prevState.pagina + 1 }), () => {
      this.cargarPeliculas();
      this.cargarSeries();
    });
  };
  render() {
    return (
      <div>
        <h1>Peliculas y Series</h1>
      </div>
    );
  }
}

export default PeliculasySeries;
