import React, { Component } from "react";

class CrearCuentaForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errores: ''
        }
    }

    controlEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    controlPass = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return(
            <>
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <form>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="Ingresá tu email"/>
                            </div>
                            <div class="form-group">
                                <label for="password">Contraseña</label>
                                <input type="password" class="form-control" id="password" placeholder="Ingresá tu contraseña"/>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Registrarse</button>
                        </form>
                        <p class="mt-3 text-center">¿Ya tenés cuenta? <a href="login.html">Iniciar sesión</a></p>
                    </div>
                </div>
            </>
        )
    }
}

export default CrearCuentaForm;