import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies()

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    controlarEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    controlarPass(e) {
        this.setState({
            password: e.target.value
        });
    }

    submit(e) {
        e.preventDefault()

        const usersStorage = localStorage.getItem('users')
        if (usersStorage == null) {
            this.setState({ error: 'Credenciales incorrectas' })
        } else {
            let usersParseado = JSON.parse(usersStorage);
            let usersFiltrado = usersParseado.filter((user) => user.email === this.state.email)

            if (usersFiltrado.length === 0) {
                this.setState({ error: 'Credenciales incorrectas' });
                return;
            } else {
                if (usersFiltrado[0].password !== this.state.password) {
                    this.setState({ error: 'Credenciales incorrectas' });
                    return;
                } else {
                    let usuarioEnSesion = JSON.stringify({ sesionActiva: true })
                    sessionStorage.setItem('userSesion', usuarioEnSesion)

                    cookies.set('auth-user', this.state.email)

                    this.props.history.push('/')

                }
            }
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={(e) => this.submit(e)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Ingresá tu email" value={this.state.email} onChange={(e) => this.controlarEmail(e)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password" className="form-control" id="password" placeholder="Ingresá tu contraseña" value={this.state.password} onChange={(e) => this.controlarPass(e)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Iniciar sesión</button>
                        <p>{this.state.error}</p>
                    </form>
                    <p className="mt-3 text-center">¿No tenés cuenta? <Link to="/register">Registrarse</Link></p>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm)
