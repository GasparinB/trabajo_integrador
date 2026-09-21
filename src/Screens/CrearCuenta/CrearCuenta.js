import React, {Component} from "react";
import CrearCuentaForm from "../../Componentes/CrearCuentaForm/CrearCuentaForm";

class CrearCuenta extends Component {
    render() {
        return(
        <main className="auth-screen">
            <div class="row justify-content-center">
                <h2 class="alert alert-primary">Registro</h2>
                <CrearCuentaForm/>
            </div>
        </main>
        )
    }
}

export default CrearCuenta;