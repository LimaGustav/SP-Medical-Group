import { useState, useEffect } from "react";
import axios from 'axios';

import "../../assets/css/login.css"
import "../../assets/css/reset.css"
import "../../assets/css/flexbox.css"

import logo from "../../assets/img/logo_spmedgroup_v1.png"

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [erroMessage, setErroMessage] = useState('');


  // Fuction that calls the API to Login
  function  log (event)  {
    event.preventDefault();

    setErroMessage('')
    setIsLoading(true)

    axios
      .post('https://senai-sp-medical-group.azurewebsites.net/api/Login',{
        email: email,
        senha: senha
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('usuario-login', response.data.token)

          setIsLoading(false)

          let base64 = localStorage.getItem('usuario-login').split('.')[1];
        }
      })

  } 

  return (
      <main>
        <section class="card_login center column">
          <div class="container_login column space_between">
            <img class="logo" src={logo} alt="" />
            <form onSubmit={log} class="column space_between">
              <div class="inputs column space_between">
                <input onChange={(campo) => setEmail(campo.target.value)} value={email} name='email' placeholder="EMAIL" type="email" />
                <input onChange={(campo) => setSenha(campo.target.value)} value={senha} name='senha' placeholder="SENHA" type="password" />
              </div>
              <button class="btn_login" type="submit">Login</button>
            </form>
          </div>
        </section>
      </main>
  );
}

export default App;
