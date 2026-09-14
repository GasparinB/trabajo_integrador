import { Route, Switch } from 'react-router-dom';

import CrearCuenta from './Screens/CrearCuenta/CrearCuenta';
import Favoritos from './Screens/Favoritos/Favoritos';
import Home from './Screens/Home/Home';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/register" component={CrearCuenta} />
          <Route path="/favoritos" component={Favoritos} />
        </Switch>
    </div>

  );
}

export default App;
