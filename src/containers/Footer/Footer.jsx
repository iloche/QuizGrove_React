import React from 'react';
import sleepingMushy from '../../../doc/sleeping-mushy.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faDiscord, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer>
    <div className="footer-stickers">
      <img src={sleepingMushy} alt="Mushy" className="sleepingMushy" />
    </div>
    <div className="socials">
      <h1>Restez connecté</h1>
      <ul>
        <li><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faDiscord} /></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faYoutube} /></a></li>
      </ul>
    </div>
    <nav className="footer-nav">
      <a href="#">Contactez-nous</a>
      <a href="#">Qui sommes-nous ?</a> 
      <a href="#">Politique de confidentialité</a> 
      <a href="#">Mentions légales</a>
    </nav>
    <div className="credits">
      <h1>© 2024 QuizGrove. Tous droits réservés. Mushy et tous stickers associés sont des marques, des marques de service ou des marques déposées de @Rihnlin.</h1>
    </div>
  </footer>
);

export default Footer;
