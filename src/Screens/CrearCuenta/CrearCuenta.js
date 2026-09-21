import React, {Component} from "react";
import CrearCuentaForm from "../../Componentes/CrearCuentaForm/CrearCuentaForm";

class CrearCuenta extends Component {
    render() {
        return(
        <main className="auth-screen">
            <h2 className="alert alert-primary">Registro</h2>
            <CrearCuentaForm/>
        </main>
        )
    }
}

export default CrearCuenta;