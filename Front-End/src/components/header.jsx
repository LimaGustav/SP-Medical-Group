
import { Link, useHistory } from 'react-router-dom';

import "../assets/css/reset.css"
import "../assets/css/flexbox.css"
import "../assets/css/style.css"

import logo from "../assets/img/logo_spmedgroup_v1.png"

export default function header() {

    return (
        <div>
            <header id="header" className="grid">
                <nav className="flex align_center space_around">
                    <Link to='/'><img className="logo_header" src={logo} alt="" /></Link>
                    <ul className="ul_header flex align_center space_between">
                        <li>especialidades</li>
                        <li>unidades</li>
                        <Link to='/listarConsultas'>
                            <li>consultas</li>
                        </Link>
                        <li>medicos</li>
                        <li>pacientes</li>
                        <Link to='/'>
                            <li>sair</li>
                        </Link>
                    </ul>
                </nav>
            </header>
        </div>
    )
}