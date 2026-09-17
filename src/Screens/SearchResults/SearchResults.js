import React, { Component } from 'react';
import Search from '../../Componentes/Search/Search';

class SearchResults extends Component {
    render() {
        return (
            <div>
                <Search busqueda={this.props.match.params.busqueda} />
            </div>
        );
    }
}

export default SearchResults;
