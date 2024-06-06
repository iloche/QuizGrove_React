import React from 'react';
import logo from '../../../doc/logo.png'

const Header = () => (
  <header className="jeu">
    <div className="topBar">
      <div className="logo">
        <a href="index.html"><img src={logo} alt="mushy" className="mushy" /></a>
        <h1 className="title"><a href="index.html">QuizGrove</a></h1>
        <small className="slogan">Fais éclore ton savoir</small>
      </div>
      <div className="right-topBar">
        <div className="game"><a href="/">Le jeu</a></div>
        <div className="login"><a href="/">Créer un compte</a></div>
        <div className="account"><a href="/">Mon compte</a></div>
        <div className="support"><a href="/">Aide</a></div>
      </div>
      <div className="burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </header>
);

export default Header;
