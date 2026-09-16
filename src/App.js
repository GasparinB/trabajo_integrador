import { Route, Switch } from 'react-router-dom';

import Home from './Screens/Home/Home';
import CrearCuenta from './Screens/CrearCuenta/CrearCuenta';
import Favoritos from './Screens/Favoritos/Favoritos';
import Login from './Screens/Login/Login';
import CategoriaPeliculasScreen from './Screens/CategoriaPeliculas/CategoriaPeliculas';
import CategoriaSeriesScreen from './Screens/CategoriaSeries/CategoriaSeries';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/register" component={CrearCuenta} />
          <Route path="/login" component={Login} />
          <Route path="/favoritos" component={Favoritos} />
          <Route path="/peliculas" component={CategoriaPeliculasScreen} />
          <Route path="/series" component={CategoriaSeriesScreen} />

        </Switch>
    </div>

  );
}

export default App;
