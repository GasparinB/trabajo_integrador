import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import './CrearCuentaForm.css';

class CrearCuentaForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    controlEmail(e) {
        this.setState({
            email: e.target.value,

        });
    };

    controlPass(e) {
        this.setState({
            password: e.target.value

        });
    }

    submit(e) {
        e.preventDefault()

        const crearUser = {
            email: this.state.email,
            password: this.state.password,
            createdAt: Date.now()
        }

        if (crearUser.password.length < 6) {
            this.setState({ error: "La extensión del password debe ser de minimo 6 caracteres" });
            return
        }

        let usersStorage = localStorage.getItem('users');

        if (usersStorage !== null) {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter((user) => user.email === crearUser.email);

            if (usersFiltrado.length > 0) {
                this.setState({ error: "Ya existe un usuario con el email ingresado" });
                return;
            }
            usersParseado.push(crearUser);
            let usersEnJson = JSON.stringify(usersParseado);
            localStorage.setItem('users', usersEnJson);

        } else {
            let usersInicial = [crearUser];
            let usersEnJson = JSON.stringify(usersInicial);
            localStorage.setItem('users', usersEnJson);


        }
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(e) => this.submit(e)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="name" value={this.state.email} onChange={(e) => this.controlEmail(e)} className="form-control" id="email" placeholder="Ingresá tu email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" name="password" value={this.state.password} onChange={(e) => this.controlPass(e)} className="form-control" id="password" placeholder="Ingresá tu contraseña" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Registrarse</button>
                        <p>{this.state.error}</p>
                    </form>
                    <p className="mt-3 text-center">¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link></p>
                </div>
            </div>
        )
    }
}

export default withRouter(CrearCuentaForm);