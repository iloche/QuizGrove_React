import React, { useState, useEffect } from 'react';
import { signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import style from "../profil/profil.module.scss";
import avatar0 from '../../../doc/profil-default.png'
import avatar1 from "../../../doc/avatar1.png"
import avatar2 from "../../../doc/avatar2.png"
import avatar3 from "../../../doc/avatar3.png"

const AVATAR_STORAGE_KEY = 'selectedAvatar'; // Clé pour le localStorage

const Profil = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [isChangePseudoModalOpen, setIsChangePseudoModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      // Récupérer l'avatar depuis le localStorage au chargement de la page
      const storedAvatar = localStorage.getItem(AVATAR_STORAGE_KEY);
      if (storedAvatar) {
        setSelectedAvatar(storedAvatar);
      }

      const storedUserName = localStorage.getItem('username');
      if (storedUserName) {
          setUserName(storedUserName);
      }
      setUserEmail(user.email);
      const creationTimestamp = user.metadata.creationTime;
      const creationDate = new Date(creationTimestamp).toLocaleDateString('fr-FR');
      setCreationDate(creationDate);
    }
  }, []);

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    // Enregistrer l'avatar sélectionné dans le localStorage
    localStorage.setItem(AVATAR_STORAGE_KEY, avatar);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error));
  };

  const toggleChangePseudoModal = () => {
    setIsChangePseudoModalOpen(!isChangePseudoModalOpen);
  };

  const handleNewUserNameChange = (e) => {
    setNewUserName(e.target.value);
  };

  const handleUpdateProfile = () => {
    // Mettre à jour le nom d'utilisateur
    const user = auth.currentUser;
    if (user && newUserName) {
      updateProfile(user, { displayName: newUserName })
        .then(() => {
          setUserName(newUserName);
          setUpdateMessage('Le profil a été mis à jour avec succès.');
          setTimeout(() => {
            setUpdateMessage('');
          }, 3000); // Cache le message après 3 secondes
        })
        .catch((error) => {
          console.log(error);
          setUpdateMessage('Erreur lors de la mise à jour du profil.');
        });
    }
    // Fermer le modal
    toggleChangePseudoModal();
  };

  return (
    <main>
      <div className={style['top-content']}>
        <div className={style['profil-box']}>
          <h1>Profil</h1>
          <div className={style['profile-container']}>
            <div className={style['profile-header']}>
              <img id="avatar" src={selectedAvatar || avatar0} alt="Avatar" />
              <h2 id="username">{userName} </h2>
                <span onClick={toggleChangePseudoModal}>
                    <svg className={style.wrench} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                    </svg>
                </span>
            </div>
            {isChangePseudoModalOpen && (
  <div id="changePseudoModal" className={style['modal']}>
    <div className={style['modal-content']}>
      <span className={style['close']} onClick={toggleChangePseudoModal}>&times;</span>
      <h2>Changer de Pseudo</h2>
      <input
        type="text"
        className={style.newPseudoInput}
        placeholder="Entrez votre nouveau pseudo..."
        value={newUserName}
        onChange={handleNewUserNameChange}
      />
      <div className={style['avatar-options']}>
        <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarChange(avatar1)} />
        <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarChange(avatar2)} />
        <img src={avatar3} alt="Avatar 3" onClick={() => handleAvatarChange(avatar3)} />
      </div>
      <button onClick={handleUpdateProfile} className={style.validate}>Valider</button>
    </div>
  </div>
)}
{updateMessage && (
  <div className={style['update-message']}>{updateMessage}</div>
)}
<div className={style['profile-details']}>
  <h2>Informations personnelles</h2>
  <p>Email : <span id="email">{userEmail}</span></p>
  <p>Date d'inscription : <span id="registration-date">{creationDate}</span></p>
</div>
{/* <div className={style['profile-stats']}>
  <h2>Statistiques de jeu</h2>
  <p>Niveau : <span id="level">42</span></p>
  <p>XP : <span id="xp">12345</span></p>
</div> */}
<div className={style['profile-settings']}>
  <button onClick={handleSignOut}>Se déconnecter</button>
</div>
</div>
</div>
</div>
</main>
);
};

export default Profil;
