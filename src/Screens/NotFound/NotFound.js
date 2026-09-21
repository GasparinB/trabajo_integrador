import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <main>
            <section className="not-found">
                <h1>404 - Página no encontrada</h1>
                <p>La dirección ingresada no existe.</p>
                <Link to="/">Volver al inicio</Link>
            </section>
        </main>
    );
}

export default NotFound;