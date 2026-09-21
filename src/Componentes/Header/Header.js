import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Header() {
    return (
        <header>
            <Link className="logo" to="/">
                <img src="/img/cine-daily.png" alt="Cine Daily" />
            </Link>
            <Navbar />
        </header>
    );
}

export default Header;