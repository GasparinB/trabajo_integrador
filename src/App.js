import { Route, Switch } from 'react-router-dom';

import Home from './Screens/Home/Home';
import CrearCuenta from './Screens/CrearCuenta/CrearCuenta';
import Favoritos from './Screens/Favoritos/Favoritos';
import Login from './Screens/Login/Login';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/register" component={CrearCuenta} />
          <Route path="/login" component={Login} />
          <Route path="/favoritos" component={Favoritos} />
        </Switch>
    </div>

  );
}

export default App;
