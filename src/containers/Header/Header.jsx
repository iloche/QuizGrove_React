import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../doc/logo.png';
import clsx from 'clsx';
import style from '../Header/Header.module.scss';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [headerClass, setHeaderClass] = useState(style.jeu); // État pour la classe du header
  const [burgerActive, setBurgerActive] = useState(false); // État pour le menu burger
  const location = useLocation(); // Obtenez l'objet location

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Ajoutez ici le code pour activer/désactiver le mode sombre dans votre application
  };

  const toggleBurgerMenu = () => {
    setBurgerActive(!burgerActive);
  };

  useEffect(() => {
    // Mettre à jour la classe du header en fonction de la route actuelle
    const currentPath = location.pathname;
    if (currentPath === '/profil') {
      setHeaderClass(style.profil);
    } else if (currentPath === '/login') {
      setHeaderClass(style.login);
    } else {
      setHeaderClass(style.jeu);
    }
  }, [location.pathname]); // Exécutez cet effet à chaque changement de location.pathname

  return (
    <header className={clsx(headerClass, { [style['dark-mode']]: darkMode })}>
      <div className={style.topBar}>
        <div className={style.logo}>
          <Link to="/"><img src={logo} alt="mushy" className={style.mushy} /></Link>
          <h1 className={style.title}><Link to="/">QuizGrove</Link></h1>
          <small className={style.slogan}>Fais éclore ton savoir</small>
        </div>
        <div className={clsx(style['right-topBar'], { [style.active]: burgerActive })}>
          <div className={clsx(style.game, { [style.active]: location.pathname === '/game' })}>
            <Link to="/game">Le jeu</Link>
          </div>
          <div className={clsx(style.login, { [style.active]: location.pathname === '/profil' })}>
            <Link to="/profil">Mon compte</Link>
          </div>
          <div className={clsx(style.support, { [style.active]: location.pathname === '/support' })}>
            <Link to="/support">Aide</Link>
          </div>
        </div>
        <div className={clsx(style.burger, { [style.active]: burgerActive })} onClick={toggleBurgerMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
