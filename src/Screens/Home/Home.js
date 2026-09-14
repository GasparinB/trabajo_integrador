import React, { Component } from 'react';
import BuscadorBarra from '../../Componentes/BuscadorBarra/BuscadorBarra';


function Home() {
    return (
        <div>
            <main>
                <BuscadorBarra />
                <h2 className="texto-presentacion">Películas</h2>
                
            </main>
        </div>
    )
}

export default Home;