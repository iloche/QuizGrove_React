import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import style from '../login/login.module.scss'; 

const Login = ({ user, setIsLoggedIn }) => { // Ajoutez une prop pour mettre à jour l'état de connexion
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // Nouvel état pour le nom d'utilisateur
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [rememberMe, setRememberMe] = useState(false); // Nouvel état pour se souvenir de l'utilisateur
    const [errorMessage, setErrorMessage] = useState(""); // Nouvel état pour le message d'erreur

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) {
            setEmail(savedEmail);
            setRememberMe(true);
        }
    }, []);

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
        setErrorMessage(""); // Réinitialiser le message d'erreur lors du changement de méthode
    }

    const handleSignUp = () => {
        if (!email || !password || !username) return; // Vérification des champs
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                user.updateProfile({ displayName: username }); // Mettre à jour le nom d'utilisateur
                console.log(user);
                setIsLoggedIn(true); // Mettre à jour l'état de connexion
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    setErrorMessage("L'adresse e-mail est déjà utilisée.");
                } else {
                    setErrorMessage(errorMessage);
                }
                console.log(errorCode, errorMessage);
            });
    }

    const handleSignIn = () => {
        if (!email || !password) return; // Vérification des champs
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                    setEmail('')
                }
                setIsLoggedIn(true); // Mettre à jour l'état de connexion
                setErrorMessage(""); // Réinitialiser le message d'erreur en cas de succès
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
                console.log(errorCode, errorMessage);
            });
    }

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleUsernameChange = (event) => setUsername(event.target.value); // Gérer le changement de nom d'utilisateur
    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
        if (rememberMe) {
            setEmail('');
        }
    };
    
    if (user) {
        return <Navigate to="/game" />;
    }

    return (
        <main className={style['main']}>
            <div className={style['top-content']}>
                <div className={style['form-container']}>
                    <form method="post" id="signup-form" className={style['signup-form']}>

                        {isSignUpActive && <h1>S'inscrire</h1>}
                        {!isSignUpActive && <h1>Se connecter</h1>}

                        <label htmlFor="email">Adresse e-mail</label>
                        <input type="email" id="email" name="email" placeholder="mushy@quizgrove.com" required onChange={handleEmailChange} value={email} />
                        
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" placeholder="Mot de passe" required onChange={handlePasswordChange} />

                        {!isSignUpActive && (
                            <div className={style['checkbox-container']}>
                                <input type="checkbox" id="remember" name="remember" checked={rememberMe} onChange={handleRememberMeChange} />
                                <label htmlFor="remember">Se souvenir de moi</label>
                            </div>
                        )}
                        
                        {isSignUpActive && (
                            <>
                                <label htmlFor="username">Nom d'utilisateur</label>
                                <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" required onChange={handleUsernameChange} />
                            </>
                        )}

                        {isSignUpActive && (
                            <>
                                <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmer le mot de passe" required />
                            </>
                        )}
                        
                        {isSignUpActive && (
                            <div className={style['checkbox-container']}>
                                <input type="checkbox" id="terms" name="terms" required />
                                <label htmlFor="terms">J'accepte les <a href="#">Conditions d'utilisation</a> et <a href="#">Avis de confidentialité</a>.</label>
                            </div>
                        )}
                        
                        {isSignUpActive && (
                            <div className={style['checkbox-container']}>
                                <input type="checkbox" id="newsletter" name="newsletter" />
                                <label htmlFor="newsletter">Coche cette case pour recevoir des e-mails d’informations sur QuizGrove !</label>
                            </div>
                        )}

                        {errorMessage && <p className={style['error-message']}>{errorMessage}</p>}

                        {isSignUpActive && <button type="button" onClick={handleSignUp}>S'inscrire</button>}
                        {!isSignUpActive && <button type="button" onClick={handleSignIn}>Se connecter</button>}

                        {isSignUpActive && <button type="button" onClick={handleMethodChange}>Se connecter</button>}
                        {!isSignUpActive && <button type="button" onClick={handleMethodChange}>Créer un compte</button>}

                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
