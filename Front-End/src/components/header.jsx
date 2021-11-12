import { useEffect } from "react";
import axios from 'axios';

import "../assets/css/reset.css"
import "../assets/css/flexbox.css"
import "../assets/css/style.css"

import logo from "../assets/img/logo_spmedgroup_v1.png"

export default function header() {

    return (
        <div>
            <header id="header" className="grid">
                <nav className="flex align_center space_around">
                    <img className="logo_header" src={logo} alt="" />
                    <ul className="ul_header flex align_center space_between">
                        <li>especialidades</li>
                        <li>unidades</li>
                        <li>consultas</li>
                        <li>medicos</li>
                        <li>pacientes</li>
                        <li>sair</li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}