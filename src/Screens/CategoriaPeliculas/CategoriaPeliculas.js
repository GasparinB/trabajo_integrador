import React, { Component } from "react";
import { Link } from "react-router-dom";
import CategoriaPeliculas from "../../Componentes/CategoriaPeliculas/CategoriaPeliculas";

class CategoriaPeliculasScreen extends Component {
  render() {
    return (
      <div>
        <h1>Películas</h1>
        <CategoriaPeliculas />
      </div>
    );
  }
}

export default CategoriaPeliculasScreen;
