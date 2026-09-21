import React from 'react';
import { withRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Logout(props) {

    function cerrarSesion() {
        sessionStorage.removeItem('userSesion');
        cookies.remove('auth-user');
        props.history.push('/login');
    }

    return (
        <button onClick={() => cerrarSesion()}>Cerrar sesión</button>
    );
}

export default withRouter(Logout);