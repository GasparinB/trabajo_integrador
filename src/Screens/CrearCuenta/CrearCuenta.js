import React, {Component} from "react";
import CrearCuentaForm from "../../Componentes/CrearCuentaForm/CrearCuentaForm";

class CrearCuenta extends Component {
    render() {
        return(
        <div class="container mt-5">
            <div class="row justify-content-center">
        <h2 class="alert alert-primary">Registro</h2>
        <CrearCuentaForm/>
        </div>
        </div>
        )

    }
}

export default CrearCuenta;