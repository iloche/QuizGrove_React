import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import style from '../login/login.module.scss'; 
import openEye from '../../../doc/openEye.png';
import closedEye from '../../../doc/closedEye.png'


const Login = ({ user, setIsLoggedIn }) => { // Ajoutez une prop pour mettre à jour l'état de connexion
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('');
    const [isSignUpActive, setIsSignUpActive] = useState(true);
    const [rememberMe, setRememberMe] = useState(false); // Nouvel état pour se souvenir de l'utilisateur
    const [errorMessage, setErrorMessage] = useState(""); // Nouvel état pour le message d'erreur
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        const storedUserName = localStorage.getItem('username');
        if (savedEmail, storedUserName) {
            setEmail(savedEmail);
            setUserName(storedUserName);
            setRememberMe(true);
        }
    }, []);

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
        setErrorMessage(""); // Réinitialiser le message d'erreur lors du changement de méthode
    }

    const handleSignUp = () => {
        if (!email || !password) return; // Vérification des champs
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
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
                    localStorage.setItem('username', userName);
                } else {
                    localStorage.removeItem('rememberedEmail');
                    setEmail('')
                }
                setIsLoggedIn(true); // Mettre à jour l'état de connexion
                setErrorMessage(""); // Réinitialiser le message d'erreur en cas de succès
            })
            .catch((error) => {
                let errorMessage = "Une erreur s'est produite. Veuillez réessayer plus tard.";
            
                // Vous pouvez personnaliser le message d'erreur en fonction du code d'erreur
                const errorCode = error.code;
                switch (error.code) {
                    case 'auth/weak-password':
                        errorMessage = 'Le mot de passe doit comporter au moins 6 caractères.';
                        break;
                    case 'auth/email-already-in-use':
                        errorMessage = 'L\'adresse e-mail est déjà utilisée par un autre compte.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'L\'adresse e-mail n\'est pas valide.';
                        break;
                    case 'auth/user-not-found':
                        errorMessage = 'Aucun utilisateur ne correspond à cette adresse e-mail.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Le mot de passe est incorrect.';
                        break;
                    default:
                        errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
                        break;
                }
            
                setErrorMessage(errorMessage);
                console.log(errorCode, errorMessage);
            });
    }

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
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
                        <div className={style['password-container']}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                className={style['password-input']}
                            />
                            <img
                                src={showPassword ? openEye : closedEye}
                                alt={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                                onClick={togglePasswordVisibility}
                                className={style['eye-icon']}
                            />
                        </div>

                        {!isSignUpActive && (
                            <div className={style['checkbox-container']}>
                                <input type="checkbox" id="remember" name="remember" checked={rememberMe} onChange={handleRememberMeChange} />
                                <label htmlFor="remember">Se souvenir de moi</label>
                            </div>
                        )}
                        
                        {isSignUpActive && (
                            <>
                                <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                                <div className={style['password-container']}>
                                    <input type={showPassword ? 'text' : 'password'} id="confirm-password" name="confirm-password" placeholder="Confirmer le mot de passe" required className={style['password-input']} />
                                    <img
                                        src={showPassword ? openEye : closedEye}
                                        alt={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                                        onClick={togglePasswordVisibility}
                                        className={style['eye-icon']}
                                    />
                                </div>
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

                        {isSignUpActive && <button type="button" className={style.bold} onClick={handleSignUp}>S'inscrire</button>}
                        {!isSignUpActive && <button type="button" className={style.bold} onClick={handleSignIn}>Se connecter</button>}

                        {isSignUpActive && <button type="button"  onClick={handleMethodChange}>Se connecter</button>}
                        {!isSignUpActive && <button type="button" onClick={handleMethodChange}>Créer un compte</button>}

                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;