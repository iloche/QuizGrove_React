import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ user }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(true);

    const handleMethodChange = () => {
        setIsSignUpActive(!isSignUpActive);
    }

    const handleSignUp = () => {
        if (!email || !password || !username) return; // Vérification des champs
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleSignIn = () => {
        if (!email || !password) return; // Vérification des champs
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    if (user) {
        return <Navigate to="/profil"></Navigate>;
    }

    return (
        <main>
            <div className="top-content">
                <div className="form-container">
                    <form action="/jeu.html" method="post" id="signup-form">

                        {isSignUpActive && <h1>S'inscrire</h1>}
                        {!isSignUpActive && <h1>Se connecter</h1>}

                        <label htmlFor="email">Adresse e-mail</label>
                        <input type="email" id="email" name="email" placeholder="mushy@quizgrove.com" required onChange={handleEmailChange} />
                        
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" placeholder="Mot de passe" required onChange={handlePasswordChange} />
                            
                        <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirmer le mot de passe" required />
                        
                        <div className="checkbox-container">
                            <input type="checkbox" id="terms" name="terms" required />
                            <label htmlFor="terms">J'accepte les <a href="#">Conditions d'utilisation</a> et <a href="#">Avis de confidentialité</a>.</label>
                        </div>
                        
                        <div className="checkbox-container">
                            <input type="checkbox" id="newsletter" name="newsletter" />
                            <label htmlFor="newsletter">Coche cette case pour recevoir des e-mails d’informations sur QuizGrove !</label>
                        </div>

                        {isSignUpActive && <button type="button" onClick={handleSignUp}>S'inscrire</button>}
                        {!isSignUpActive && <button type="button" onClick={handleSignIn}>Se connecter</button>}

                        {isSignUpActive && <button onClick={handleMethodChange}>Se connecter</button>}
                        {!isSignUpActive && <button onClick={handleMethodChange}>Créer un compte</button>}
                        
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Login;
