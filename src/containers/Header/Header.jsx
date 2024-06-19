import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../doc/logo.png';
import mushroom from '../../../doc/theme_mushroom.png'; // Image for light mode
import frog from '../../../doc/theme_frog.png'; // Image for dark mode
import clsx from 'clsx';
import style from '../Header/Header.module.scss';

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Vérifie si une préférence est stockée dans localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const [headerClass, setHeaderClass] = useState(style.jeu);
  const [burgerActive, setBurgerActive] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode)); // Stocke la préférence
      return newMode;
    });
  };

  const toggleBurgerMenu = () => {
    setBurgerActive(!burgerActive);
  };

  const closeBurgerMenu = () => {
    setBurgerActive(false);
  };

  useEffect(() => {
    // Mettre à jour la classe du header en fonction de la route actuelle
    const currentPath = location.pathname;
    if (currentPath === '/profil') {
      setHeaderClass(style.profil);
    } else if (currentPath === '/login') {
      setHeaderClass(style.login);
    } else if (currentPath === '/support') {
      setHeaderClass(style.aide);
    } else if (currentPath === '/game') {
      setHeaderClass(style.jeu);
    } else {
      setHeaderClass(style.connexion);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Applique ou retire la classe dark-mode sur le body
    if (darkMode) {
      document.body.classList.add(style['dark-mode']);
    } else {
      document.body.classList.remove(style['dark-mode']);
    }
  }, [darkMode]);

  return (
    <header className={clsx(headerClass, { [style['dark-mode']]: darkMode })}>
      <div className={style.topBar}>
        <div className={style.logo}>
          <Link to="/"><img src={logo} alt="mushy" className={style.mushy} /></Link>
          <h1 className={style.title}><Link to="/">QuizGrove</Link></h1>
          <small className={style.slogan}>Fais éclore ton savoir</small>
        </div>
        <div className={clsx(style['right-topBar'], { [style.active]: burgerActive })}>
          <div className={clsx(style.game, { [style.active]: location.pathname === '/game' })} onClick={closeBurgerMenu}>
            <Link to="/game">Le jeu</Link>
          </div>
          <div className={clsx(style.login, { [style.active]: location.pathname === '/profil' })} onClick={closeBurgerMenu}>
            <Link to="/profil">Mon compte</Link>
          </div>
          <div className={clsx(style.support, { [style.active]: location.pathname === '/support' })} onClick={closeBurgerMenu}>
            <Link to="/support">Aide</Link>
          </div>
          <div className={style.darkModeToggle} onClick={toggleDarkMode}>
            <img src={darkMode ? frog : mushroom} alt={darkMode ? "Mode sombre" : "Mode clair"} />
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