import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

function Header() {
    return (
        <header>
            <Link className="logo" to="/">MovieApp</Link>
            <Navbar />
        </header>
    );
}

export default Header;