import React from 'react';
import { Link } from 'react-router-dom';

import BuscadorBarra from '../../Componentes/BuscadorBarra/BuscadorBarra';
import Peliculas from '../../Componentes/Peliculas/Peliculas';
import Series from '../../Componentes/Series/Series';

function Home() {
    return (
        <main>
            <BuscadorBarra />
            <section className="home-grupo">
                <h2 className="titulo-seccion">Películas más populares</h2>
                <Peliculas />
                <Link className="ver-todas" to="/peliculas">Ver todas</Link>
            </section>
            <section className="home-grupo">
                <h2 className="titulo-seccion">Series más populares</h2>
                <Series />
                <Link className="ver-todas" to="/series">Ver todas</Link>
            </section>
        </main>
    );
}

export default Home;