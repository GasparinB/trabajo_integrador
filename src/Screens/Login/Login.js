import React, {Component} from "react";
import LoginForm from "../../Componentes/LoginForm/LoginForm";

class Login extends Component {
    render() {
        return(
            <div >
                <h2 class="alert alert-primary">Iniciar sesión</h2>
                <LoginForm/>
            </div>
        )

    }
}

export default Login;