
import { Link } from 'react-router-dom';
import { parseJwt } from "../services/auth"

import "../assets/css/reset.css"
import "../assets/css/flexbox.css"
import "../assets/css/style.css"

import logo from "../assets/img/logo_spmedgroup_v1.png"

export default function header() {

    function Logout() {
        localStorage.removeItem('usuario-login')
    }

    return (
        <div>
            <header id="header" className="grid">
                <nav className="nav_header flex align_center space_around">
                    <Link to='/'><img className="logo_header" src={logo} alt="" /></Link>
                    <ul className="ul_header flex align_center space_between">
                        <li>especialidades</li>
                        <li>unidades</li>
                        <li>medicos</li>
                        <Link to='/listarConsultas'>
                            <li>consultas</li>
                        </Link>
                        {parseJwt().role === '2' && <Link to='/agendarConsulta'>
                            <li>cadastrar</li>
                        </Link>}
                        <Link onClick={() => Logout()} to='/'>
                            <li>sair</li>
                        </Link>
                    </ul>
                </nav>
            </header>
        </div>
    )
}