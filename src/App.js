import { Route, Switch } from 'react-router-dom';

import Header from './Componentes/Header/Header';
import Footer from './Componentes/Footer/Footer';

import Home from './Screens/Home/Home';
import CrearCuenta from './Screens/CrearCuenta/CrearCuenta';
import Favoritos from './Screens/Favoritos/Favoritos';
import Login from './Screens/Login/Login';
import CategoriaPeliculasScreen from './Screens/CategoriaPeliculas/CategoriaPeliculas';
import CategoriaSeriesScreen from './Screens/CategoriaSeries/CategoriaSeries';
import SearchResults from './Screens/SearchResults/SearchResults';
import DetallePelis from './Screens/DetallePelis/DetallePelis';
import DetalleSeries from './Screens/DetalleSeries/DetalleSeries';
import NotFound from './Screens/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Header />
        <div className="contenido-principal">
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/register" component={CrearCuenta} />
            <Route path="/login" component={Login} />
            <Route path="/favoritos" component={Favoritos} />
            <Route path="/peliculas" component={CategoriaPeliculasScreen} />
            <Route path="/series" component={CategoriaSeriesScreen} />
            <Route path="/search/:busqueda" component={SearchResults} />
            <Route path="/pelicula/:id" component={DetallePelis} />
            <Route path="/serie/:id" component={DetalleSeries} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      <Footer />
    </div>
  );
}

export default App;
