import { useState, useEffect } from "react";
import axios from 'axios';

import "../../assets/css/reset.css"
import "../../assets/css/flexbox.css"
import "../../assets/css/style.css"

import logo from "../../assets/img/logo_spmedgroup_v1.png"

import HeaderJS from "../../components/header"
import CardVerde from "../../components/cardVerde"

export default function ListarConsultas() {

    const [listaConsultas, setListaConsultas] = useState([]);

    function buscarConsultas(event) {
        axios('http://localhost:5000/api/consultas', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setListaConsultas(response.data)
                    
                }
            })
            .catch(erro => console.log(erro))
    }

    useEffect(buscarConsultas, [])


    return (
        <div>
            <main className='column space_around'>
                <HeaderJS />
                <CardVerde />

                <section className="grid">
                    <div className="flex wrap space_between">
                        {listaConsultas.map(consulta => {
                            return (
                                <div className="card_consulta column space_around align_center">
                                    <p>Paciente: {consulta.idPacienteNavigation.nomePaciente}</p>
                                    <p>Médico: {consulta.idMedicoNavigation.nomeMedico}</p>
                                    <p>Data: {consulta.dataConsulta}</p>
                                    <button>Ver detalhes</button>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </div>
    )
}