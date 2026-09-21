import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

import ElementosNav from '../ElementosNav/ElementosNav';

const cookies = new Cookies();

function Navbar() {
    let usuarioLogueado = cookies.get('auth-user');
    let elementos = [
        {
            nombre: 'Home',
            ruta: '/'
        },
        {
            nombre: 'Películas',
            ruta: '/peliculas'
        },
        {
            nombre: 'Series',
            ruta: '/series'
        }
    ];

    if (usuarioLogueado) {
        elementos.push({
            nombre: 'Favoritos',
            ruta: '/favoritos'
        });
    } else {
        elementos.push({
            nombre: 'Iniciar Sesión',
            ruta: '/login'
        });
        elementos.push({
            nombre: 'Crear Cuenta',
            ruta: '/register'
        });
    }

    return (
        <nav>
            <ul className="main-nav">
                {elementos.map((elemento, index) => (
                    <ElementosNav
                        key={index}
                        nombre={elemento.nombre}
                        ruta={elemento.ruta}
                    />
                ))}
            </ul>
        </nav>
    );
}

export default withRouter(Navbar);