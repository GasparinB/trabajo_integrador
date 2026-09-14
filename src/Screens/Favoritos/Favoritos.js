import React, { Component } from 'react';
import Favorito from '../../Componentes/Favorito/Favorito';

class Favoritos extends Component {
  render() {
    return (
      <div>
        <h1>Favoritos</h1>
        <Favorito />
      </div>
    );
  }
}

export default Favoritos;
