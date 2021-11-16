import { useState, useEffect } from "react";
import axios from 'axios';

import "../../assets/css/reset.css"
import "../../assets/css/flexbox.css"
import "../../assets/css/style.css"
import HeaderJS from "../../components/header"

export default function CadastrarConsultas() {

    const [listaMedicos, setListaMedicos] = useState( [] );
    const [listaPacientes, setListaPacientes] = useState( [] );
    const [listaClinicas, setListaClinicas] = useState( [] );
    const [_idPaciente, setIdPaciente] = useState(0);
    const [_idMedico, setIdMedico] = useState(0);
    const [_data, setData] = useState(new Date())

    function BuscarMedicos() {
        axios('http://localhost:5000/api/Medicos', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('medicos buscados')
                setListaMedicos(response.data)
            }
        }).catch( erro => {
            console.log(erro)
        })
    }

    function BuscarPacientes() {
        axios('http://localhost:5000/api/pacientes', {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('paciente buscados')
                setListaPacientes(response.data)
            }
        }).catch( erro => {
            console.log(erro)
        })
    }

    function BuscarClinica() {
        axios('http://localhost:5000/api/clinicas')
        .then(response => {
            if (response.status === 200) {
                console.log('clinica buscados')
                setListaClinicas(response.data)
            }
        }).catch( erro => {
            console.log(erro)
        })
    }
    
    let consulta = {
        idPaciente : _idPaciente,
        idMedico : _idMedico,
        dataConsulta : _data
    }

    // let consulta = {
    //     idPaciente : document.getElementById('select_medico'),
    //     idMedico : document.getElementById('select_paciente'),
    //     dataConsulta : document.getElementById('input_data')
    // }

    function CadastrarConsutla(event) {
        event.preventDefault();
        axios.post('http://localhost:5000/api/consultas', consulta,{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(response => {
            if (response.status === 201) {
                console.log('Consulta agendada')
            }
        }).catch(erro => {console.log(erro)})
    }

    useEffect(BuscarMedicos, [])
    useEffect(BuscarPacientes, [])
    useEffect(BuscarClinica, [])



    return (
        <div>
            <HeaderJS />
            <main className="column space_around">
                <section id="agendar_card" class="grid section_agendar">
                    <div className="container_form justify_center">
                        <form onSubmit={CadastrarConsutla} class="column align_center space_evenly">

                            <div className="container_inputs column space_between align_center">

                                <select onChange={(campo) => setIdMedico(campo.target.value)} id='select_medico' name="medico">
                                    <option value="0">Selecione o médico</option>

                                    {listaMedicos.map(medico => {
                                        return (
                                            <option key={medico.idMedico} value={medico.idMedico}>{medico.nomeMedico}</option>
                                        )
                                    })}
                                </select>


                                <select onChange={(campo) => setIdPaciente(campo.target.value)} id='select_paciente' name="paciente">
                                    <option value="0">Selecione o paciente</option>
                                    {listaPacientes.map(paciente => {
                                        return (
                                            <option value={paciente.idPaciente}>{paciente.nomePaciente}</option>
                                        )
                                    })}
                                </select>


                                <input onChange={(campo) => setData(campo.target.value)} id='input_data' placeholder='Escolha da data' type="date" name=""/>
                            </div>

                            <button type="submit">Agendar</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}