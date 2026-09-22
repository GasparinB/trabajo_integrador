import React from 'react';
import { Link } from 'react-router-dom';
import './ElementosNav.css';

function ElementosNav(props) {
    return (
        <li>
            <Link to={props.ruta}>{props.nombre}</Link>
        </li>
    );
}

export default ElementosNav;