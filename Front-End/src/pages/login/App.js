import { useState, useEffect } from "react";
import axios from 'axios';
import {usuarioAutenticado, parseJwt} from "../../services/auth"

import { Link, useHistory } from 'react-router-dom';

import "../../assets/css/login.css"
import "../../assets/css/reset.css"
import "../../assets/css/flexbox.css"

import logo from "../../assets/img/logo_spmedgroup_v1.png"

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [erroMessage, setErroMessage] = useState('');


  let history = useHistory();

  // Fuction that calls the API to Login
  function log(event) {
    event.preventDefault();

    setErroMessage('')
    setIsLoading(true)

    axios
      .post('http://localhost:5000/api/login', {
        email: email,
        senha: senha
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('usuario-login', response.data.token)

          setIsLoading(false)

          let base64 = localStorage.getItem('usuario-login').split('.')[1];

          setSenha('')

          setEmail('')

          history.push('/listarConsultas')
        }
      }).catch(erro => {
        console.log(erro)

        setSenha('')

        setEmail('')
      })

  }

  return (
    <main className='main_login flex center'>
      <section className="card_login center column">
        <div className="container_login column space_between">
          <img className="logo" src={logo} alt="" />
          <form onSubmit={log} class="column space_between">
            <div className="inputs column space_between">
              <input onChange={(campo) => setEmail(campo.target.value)} value={email} name='email' placeholder="EMAIL" type="email" />
              <input onChange={(campo) => setSenha(campo.target.value)} value={senha} name='senha' placeholder="SENHA" type="password" />
            </div>
            <button className="btn_login" type="submit">Login</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
