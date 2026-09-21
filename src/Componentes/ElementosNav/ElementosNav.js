import React from 'react';
import { Link } from 'react-router-dom';

function ElementosNav(props) {
    return (
        <li>
            <Link to={props.ruta}>{props.nombre}</Link>
        </li>
    );
}

export default ElementosNav;