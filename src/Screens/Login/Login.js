import React, {Component} from "react";
import LoginForm from "../../Componentes/LoginForm/LoginForm";

class Login extends Component {
    render() {
        return(
            <main className="auth-screen">
                <h2 className="alert alert-primary">Iniciar sesión</h2>
                <LoginForm/>
            </main>
        )

    }
}

export default Login;