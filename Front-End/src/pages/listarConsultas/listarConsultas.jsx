
import * as React from 'react';
import {usuarioAutenticado, parseJwt} from "../../services/auth"

import "../../assets/css/reset.css"
import "../../assets/css/flexbox.css"
import "../../assets/css/style.css"
import HeaderJS from "../../components/header"
import CardVerde from "../../components/cardVerde"
import ListarAdm from "../../components/consultasAdm"
import Listar from "../../components/consultas"


export default function ListarConsultas() {

    return (
        <div>
            <HeaderJS />
            <main className='column space_around'>
                <CardVerde />

                {parseJwt().role === '2' ? <ListarAdm/> : <Listar/>}

                {/* <section className="grid">
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
                </section> */}
            </main>
        </div>
    )
}