import { Route } from 'react-router-dom/cjs/react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import CrearCuenta from './Screens/CrearCuenta/CrearCuenta';

function App() {
  return (
    <div className="App">
        <Switch>
          <Route path="/register" component={CrearCuenta} />
        </Switch>
    </div>

  );
}

export default App;
