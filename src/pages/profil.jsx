import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";



export const Profil = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [creationDate, setCreationDate] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
      setUserName(user.displayName || 'Nom d\'utilisateur'); // Par défaut, 'Nom d'utilisateur' si displayName n'est pas défini
      // Convertir la timestamp de création de compte en une date lisible
      const creationTimestamp = user.metadata.creationTime;
      const creationDate = new Date(creationTimestamp).toLocaleDateString('fr-FR');
      setCreationDate(creationDate);
    }
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  return (
    <main>
      <div className="top-content">
        <div className="box">
          <h1>Profil</h1>
        </div>
        <div className="profile-container">
          <div className="profile-header">
            <img id="avatar" src="images/a88d5f5e5b2561c09669ca333cc6e76f-removebg-preview.png" alt="Avatar" />
            <h1 id="username">{userName}</h1>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
            </span>
          </div>
          <div id="changePseudoModal" className="modal">
            <div className="modal-content">
              <span className="close">&times;</span>
              <h2>Changer de Pseudo</h2>
              <input type="text" id="newPseudoInput" placeholder="Entrez votre nouveau pseudo..." />
              <button>Valider</button>
            </div>
          </div>
          
          <div id="message"></div>
          <div className="profile-details">
            <h2>Informations Personnelles</h2>
            <p>Email : <span id="email">{userEmail}</span></p>
            <p>Date d'inscription : <span id="registration-date">{creationDate}</span></p>
          </div>
          <div className="profile-stats">
            <h2>Statistiques de Jeu</h2>
            <p>Niveau : <span id="level">42</span></p>
            <p>XP : <span id="xp">12345</span></p>
          </div>
          <div className="profile-settings">
            <h2>Paramètres de Compte</h2>
            <button onClick={handleSignOut}>Se déconnecter</button>
            <button>Réinitialiser le compte</button>
          </div>
        </div>
      </div>
    </main>
  );
};
