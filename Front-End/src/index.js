import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';
import './index.css';
import Login from './pages/login/App';
import listarConsultas from "./pages/listarConsultas/listarConsultas"
import reportWebVitals from './reportWebVitals';

import "../src/assets/css/reset.css"

const routing = (
  <Router>
    <div className='router'>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/listarConsultas" component={listarConsultas} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();