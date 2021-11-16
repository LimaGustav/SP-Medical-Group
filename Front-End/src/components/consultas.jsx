import { useState, useEffect } from "react";
import axios from 'axios';
import * as React from 'react';
import {usuarioAutenticado, parseJwt} from "../services/auth"

import "../assets/css/reset.css"
import "../assets/css/flexbox.css"
import "../assets/css/style.css"

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

    


export default function ListarConsultasAdm(){
    const [listaConsultas, setListaConsultas] = useState([]);
    const [consultaClicada, setConsultaClicada] = useState(0);
    const [consultaBuscada, setConsultaBuscada] = useState({});
    const [descricaoAlterada, setDescricaoAlterada] = useState('');

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 400,
        borderRadius: 5,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    function buscarPorId () {
        axios('http://localhost:5000/api/consultas/' + consultaClicada, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    setConsultaBuscada(response.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = async (event) => {
        await setConsultaClicada(event.target.name)
        await setOpen(true)         
    };
    buscarPorId()
    const handleClose = () => setOpen(false);

    function buscarConsultas() {
        axios('http://localhost:5000/api/Consultas/minhas', {
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
    function AlterarDescricao(event) {
        event.preventDefault();
        axios.patch('http://localhost:5000/api/Consultas/alterar/descricao/'+consultaClicada,{
            descricao: descricaoAlterada
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(setDescricaoAlterada(''))
        .catch(erro => {
            console.log(erro)
            setDescricaoAlterada('')
        })
    }

    useEffect(buscarConsultas, [])

    return (
        <section className="grid">
                    <div className="flex wrap space_between">
                        {listaConsultas.map(consulta => {
                            return (
                                <div className="card_consulta column space_around align_center">
                                    <p>Paciente: {consulta.idPacienteNavigation.nomePaciente}</p>
                                    <p>Médico: {consulta.idMedicoNavigation.nomeMedico}</p>
                                    <p>Data: {Intl.DateTimeFormat("pt-BR", {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    }).format(new Date(consulta.dataConsulta))}</p>
                                    <button name={consulta.idConsulta} onClick={handleOpen}>Ver detalhes</button>
                                </div>
                            )
                        })}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                {
                                    consultaBuscada.idPacienteNavigation !== undefined && 
                                    
                                    <div>
                                        <p>Paciente: {consultaBuscada.idPacienteNavigation.nomePaciente}</p>

                                        <p>Data Nascimento: {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        }).format(new Date(consultaBuscada.idPacienteNavigation.dataNascimento))}</p>

                                        <p>Médico: {consultaBuscada.idMedicoNavigation.nomeMedico}</p>

                                        <p>Especialidade: {consultaBuscada.idMedicoNavigation.idEspecialidadeNavigation.nomeEspecialidade}</p>

                                        <p>Data: {Intl.DateTimeFormat("pt-BR", {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        }).format(new Date(consultaBuscada.dataConsulta))}</p>

                                        <p>Situação: <span>{consultaBuscada.idSituacaoNavigation.nomeSituacao}</span></p>

                                        <p>Descricao: {consultaBuscada.descricao}</p>

                                        {parseJwt().role === '3' &&
                                        <form onSubmit={AlterarDescricao}>
                                            <input onChange={(campo) => {setDescricaoAlterada(campo.target.value)}} type="text" />
                                            <button type='submit'>Alterar descrição</button>
                                        </form>
                                         }          
                                    </div>
                                }
                                
                            </Box>
                        </Modal>
                    </div>
                </section>
    )
}