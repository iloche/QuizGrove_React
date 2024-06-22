import React, { useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import style from './game.module.scss';
import { auth } from "../../firebase";
import quizData from '../../data/quizz.json';
import { ScoreContext } from '../../contexts/scoreContext';
import song1 from  '../../../doc/bossin over.mp3';
import song2 from'../../../doc/happy tears.mp3';
import song3 from'../../../doc/nobonoko - My Heart is a Machine.mp3';
import song4 from'../../../doc/Orange Lounge - MOBO MOGA (HQ).mp3';
import song5 from'../../../doc/Stargaze.mp3';
import song6 from '../../../doc/Joel McNeely-Tinkering.mp3';
import song7 from '../../../doc/Storybook.mp3';
import song8 from '../../../doc/Kingdom Dance (From TangledScore).mp3';
import song9 from '../../../doc/Night At The Museum.mp3';
import silent from '../../../doc/volume-silent-line-icon.png';
import volume from '../../../doc/volume-medium-line-icon.png';
import refresh from '../../../doc/refresh.png';
import back from '../../../doc/return.png'
import locked from '../../../doc/locked.png';
import Tippy from '@tippyjs/react';

const categories = ["Animaux", "Culture", "Dessins animés", "Géographie", "Histoire", "Littérature", "Monde", "Musique", "Sports"];
const difficultyLevels = ["Débutant", "Confirmé", "Expert"];

const Game = () => {
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showDifficultyPopup, setShowDifficultyPopup] = useState(false);
    const [showQuestionPopup, setShowQuestionPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnecdote, setShowAnecdote] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [expertUnlocked, setExpertUnlocked] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [canRetry, setCanRetry] = useState(false);
    const [showExpertUnlockedMessage, setShowExpertUnlockedMessage] = useState(false);
    const [userId, setUserId] = useState(null);
    const [showButtons, setShowButtons] = useState(false);
    const [expertUnlockedMessageShown, setExpertUnlockedMessageShown] = useState(false);
    const { score, setScore } = useContext(ScoreContext);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);
    
            // Vérifiez et initialisez le score à zéro pour un nouvel utilisateur
            const savedProgress = JSON.parse(localStorage.getItem(`quizProgress_${user.uid}`));
            if (savedProgress) {
                setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
                setScore(savedProgress.score || 0);
                setExpertUnlocked(savedProgress.expertUnlocked || false);
            } else {
                setCurrentQuestionIndex(0);
                setScore(0);
                setExpertUnlocked(false); // Assurez-vous que le niveau Expert est défini à false pour les nouveaux utilisateurs
            }
    
            // Vérifiez si le niveau Expert est déjà débloqué dans le localStorage
            const expertUnlockedInLocalStorage = JSON.parse(localStorage.getItem(`expertUnlocked_${user.uid}`));
            if (expertUnlockedInLocalStorage) {
                setExpertUnlocked(true);
            } else {
                setExpertUnlocked(false); // Assurez-vous que le niveau Expert est défini à false pour les nouveaux utilisateurs
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const progressToSave = {
                currentQuestionIndex,
                score,
                expertUnlocked
            };
            localStorage.setItem(`quizProgress_${userId}`, JSON.stringify(progressToSave));
            localStorage.setItem(`expertUnlocked_${userId}`, JSON.stringify(expertUnlocked));
        }
    }, [currentQuestionIndex, score, expertUnlocked, userId]);

    useEffect(() => {
        if (showExpertUnlockedMessage) {
            const timer = setTimeout(() => {
                setShowExpertUnlockedMessage(false);
                setExpertUnlockedMessageShown(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showExpertUnlockedMessage]);

    const category = selectedCategory ? selectedCategory.toLowerCase() : "";
    const difficulty = selectedDifficulty ? selectedDifficulty.toLowerCase() : "";
    
    // Assurez-vous que les clés existent dans quizData avant d'y accéder
    const questions = (quizData[category] && quizData[category][0].quizz[difficulty]) || [];

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;

    const progress = (currentQuestionIndex / totalQuestions) * 100;

    const handleStartButtonClick = () => {
        if (!expertUnlocked && selectedDifficulty === "Expert") {
            alert("Terminez les niveaux débutant et confirmé pour déverrouiller le niveau expert.");
            return;
        }
        setShowCategoryPopup(true);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setShowCategoryPopup(false);
        setShowDifficultyPopup(true);
    };

    const handleDifficultyClick = (difficulty) => {
        if (difficulty === "Expert" && !expertUnlocked) {
            return;
        }
        setSelectedDifficulty(difficulty);
        setShowDifficultyPopup(false);
        setShowQuestionPopup(true);
        setShowButtons(true);
    };

    const difficultyPoints = {
        "Débutant": 1,
        "Confirmé": 2,
        "Expert": 3
    };

    const handleAnswerClick = (selectedChoice) => {
        if (!answered || canRetry) {
            const isCorrect = selectedChoice === currentQuestion.reponse;
            setIsAnswerCorrect(isCorrect);
            setSelectedAnswer(selectedChoice);
    
            if (isCorrect) {
                const points = difficultyPoints[selectedDifficulty];
                const newScore = score + points;
                setScore(newScore);
                setShowAnecdote(true);
                setCanRetry(false);
    
                if (newScore >= 100 && !expertUnlockedMessageShown) {
                    setExpertUnlocked(true);
                    setShowExpertUnlockedMessage(true);
                    setExpertUnlockedMessageShown(true);
                    localStorage.setItem(`expertUnlocked_${userId}`, JSON.stringify(true));
                }
            } else {
                setCanRetry(true);
            }
            setAnswered(true);
        }
    };

    const handleNextQuestionClick = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnecdote(false);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setAnswered(false);
        setCanRetry(false); // Réinitialise l'état de réessai

        if (currentQuestionIndex === totalQuestions - 1) {
            setShowCongratulations(true);
        }
    };

    const handleRestartButtonClick = () => {
        const userConfirmed = window.confirm("Êtes-vous sûr de vouloir réinitialiser toute votre progression ?");
        
        if (userConfirmed) {
            setShowCategoryPopup(true);
            setShowDifficultyPopup(false);
            setShowQuestionPopup(true);
            setCurrentQuestionIndex(0);
            setShowAnecdote(false);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
            setScore(0);
            setShowCongratulations(false);
            setShowButtons(true);
            setExpertUnlockedMessageShown(false);
            setShowExpertUnlockedMessage(false);
            showNotification('success', 'Votre progression a été réinitialisée.');
        } else {
            showNotification('info', 'La réinitialisation a été annulée.');
        }
    };

    const showNotification = (type, message) => {
        console.log(`Notification: ${type} - ${message}`);
    };

    const handleBackToCategorySelection = () => {
        setShowCategoryPopup(true);
        setShowDifficultyPopup(false);
        setShowQuestionPopup(false);
        setCurrentQuestionIndex(0); // Réinitialise l'index des questions, mais garde le score
        setShowAnecdote(false);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setShowCongratulations(false);
        setAnswered(false);
        setShowButtons(false);
    };

    const audioFiles = [song1, song2, song3, song4, song5, song6, song7, song8, song9];
    
    const [musicPlaying, setMusicPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState(null);
    const [buttonImage, setButtonImage] = useState(null); // Initialisez avec null ou volume/silent par défaut
    
    const toggleMusic = () => {
        if (!musicPlaying) {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        setCurrentAudio(audioFiles[randomIndex]);
        setButtonImage(volume); // Met à jour avec la variable directe, pas un objet
        } else {
        setCurrentAudio(null);
        setButtonImage(silent); // Met à jour avec la variable directe, pas un objet
        }
        setMusicPlaying(prevState => !prevState);
    }; 

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false); // Définissez initialement à false

    useEffect(() => {
        const moveFrog = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const frogWidth = 40; // Ajustez cette valeur selon la taille de votre gif
            const frogHeight = 40; // Ajustez cette valeur selon la taille de votre gif

            const x = Math.random() * (windowWidth - frogWidth);
            const y = Math.random() * (windowHeight - frogHeight);

            setPosition({ x, y });
            setVisible(true);

            const randomDisappearTime = Math.random() * (60000 - 15000) + 15000; // entre 15 et 60 secondes
            setTimeout(() => {
                setVisible(false);
            }, randomDisappearTime);
        };

        if (showQuestionPopup) {
            const delay = Math.random() * 15000; // entre 1 et 15 secondes
            setTimeout(moveFrog, delay);
        } else {
            setVisible(false);
        }
    }, [showQuestionPopup]);

    const handleClick = () => {
        const newScore = score + 1;
        setScore(newScore);
        setVisible(false);
    };

    const TippyContentExpert = (
        <div className="info-box chakra-petch-light" style={{ backgroundColor: '#bc8f8f', borderRadius: '5px', padding: "5px", border: "2px solid #967373" }}>
            <p>🍄 Obtiens un score total de 100 points pour débloquer le niveau Expert !</p>
        </div>
    );

    const TippyContentFrog = (
        <div className="info-box chakra-petch-light" style={{ backgroundColor: '#bc8f8f', borderRadius: '5px', padding: "5px", border: "2px solid #967373" }}>
            <p>🍄 Clique sur la grenouille volante rapidement pour gagner un point !</p>
            <p>🍄 Les points te sont attribués en fonction de la difficulté de la question</p>
            <p>🍄 Attention ! Si tu réinitialises la progression totale, tu repars à 0 mais pas d'inquiétude, le niveau Expert reste débloqué</p>
        </div>
    );

    return (
        <main className={style['main-jeu']}>
            <div className={style['top-content']}>
                <div className={clsx(style['game-box'], { [style['shifted']]: showCategoryPopup || showDifficultyPopup || showQuestionPopup })}>
                    {showButtons && (
                        <div className={style.buttons}>
                            <button title='Lancer la musique' className={style.button} onClick={toggleMusic}>
                                <img className={style.music} src={buttonImage ? buttonImage : silent} />
                            </button>
                            <button title='Réinitialiser la progression totale' className={style.button} onClick={handleRestartButtonClick}>
                                <img className={style.refresh} src={refresh} />
                            </button>
                            <button title='Retour' className={style.button} onClick={handleBackToCategorySelection}>
                                <img className={style.return} src={back} />
                            </button>
                        </div>
                    )}
                   {musicPlaying && currentAudio && (
                        <audio autoPlay loop>
                            <source src={currentAudio} type="audio/mp3" />
                        </audio>
                    )}
                    {showCategoryPopup ? (
                        <div className={clsx("categories-title", style.popup)}>
                            <h2>Choisis la catégorie dans laquelle tu veux jouer</h2>
                            {showCategoryPopup && (
                                <div className={style['categories-box']}>
                                    <ul className={style["categories-content"]}>
                                        {categories.map((category, index) => (
                                            <li className={style.tag} key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : showDifficultyPopup ? (
                        <div className={clsx("difficulty-title", style.popup)}>
                            <Tippy
                                content={TippyContentExpert}
                                animation="scale"
                                allowHTML={true}
                                placement='bottom'
                            >
                                <p className="question-mark" style={{ backgroundColor: '#bc8f8f', borderRadius: '15px', padding: "3px", border: "2px solid #967373", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)", width:"5%", margin:"0 auto", fontWeight:"bold", position:'absolute', bottom:"-5%", right:"1%" }}>?</p>
                            </Tippy>
                            <h2>Choisis le niveau de difficulté</h2>
                            {showDifficultyPopup && (
                                <div className={style["difficulty-box"]}>
                                    {difficultyLevels.map((difficulty, index) => (
                                        <div className={style.level} key={index} onClick={() => handleDifficultyClick(difficulty)}>
                                            <h2 title={difficulty === "Expert" && !expertUnlocked ? "Obtiens un score total de 100 points pour débloquer le niveau" : ""}>
                                                {difficulty}
                                            </h2>
                                            {difficulty === "Expert" && !expertUnlocked && (
                                                <img
                                                    className={style.lock}
                                                    src={locked}
                                                    alt="Cadenas"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : showQuestionPopup ? (
                        <div className={clsx("question-title", style.popup)}>
                            <div className={style["question-tag-level"]}>
                                <h2 className={style.tagName}>Catégorie: {selectedCategory}</h2>
                                <h2 className={style.lvlName}>Difficulté: {selectedDifficulty}</h2>
                            </div>
                            <div className={style.question}>
                                {currentQuestion && (
                                    <div>
                                        <h3>{currentQuestion.question}</h3>
                                        <ul>
                                            {currentQuestion.propositions.map((choice, index) => (
                                                <li
                                                    key={index}
                                                    className={clsx({
                                                        [style.correct]: selectedAnswer === choice && isAnswerCorrect,
                                                        [style.incorrect]: selectedAnswer === choice && !isAnswerCorrect
                                                    })}
                                                    onClick={() => handleAnswerClick(choice)}
                                                >
                                                    {choice}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {showAnecdote && isAnswerCorrect && (
                                    <div>
                                        <p className={style.anecdote}>{currentQuestion.anecdote}</p>
                                        <button title='Suivant' className={style.start} onClick={handleNextQuestionClick}>Question suivante</button>
                                    </div>
                                )}
                            </div>
                            <div className={style.progress}>
                                <div className={style.progressBar} style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className={style.score}>
                                Score total: {score}
                            </div>
                            <Tippy
                                content={TippyContentFrog}
                                animation="scale"
                                allowHTML={true}
                                placement='bottom'
                            >
                                <p className="question-mark" style={{ backgroundColor: '#bc8f8f', borderRadius: '15px', padding: "3px", border: "4px solid #967373", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)", width:"7%", fontWeight:"bold", position:'absolute', bottom:"-5%", right:"5%" }}>?</p>
                            </Tippy>
                        </div>
                    ) : (
                        <>
                            <h1>Prêt à tester tes connaissances ?</h1>
                            <button className={style.start} onClick={handleStartButtonClick}>Commencez !</button>
                        </>
                    )}
                    {showCongratulations && (
                        <>
                            <div className={style.congratulations}>
                                <h2>Félicitations!</h2>
                                <p>Vous avez terminé le niveau avec succès.</p>
                                <img className={style['corner-image']} src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHZ6ZzdpbTlob2hvMzV6NHZ6enJ1NHl6emplY3lmNG4yN3dkMXp4MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZVZTD5kaMZ2d7EEfRn/giphy.gif" alt="Happy Frog" />
                            </div>
                            <button className={style.start} onClick={handleBackToCategorySelection}>Retour</button>
                        </>
                    )}
                    {showExpertUnlockedMessage && (
                        <div className={style.notification}>
                            <h2>Niveau Expert Débloqué!</h2>
                            <img className={style.congrats} src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnFqYnpqM3A4aGJ4Z3N3azZqOXFvb3p6dG9wMWR2ZzV2M3p2dzZ2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vf8UeyP351aaaVj6wR/giphy.gif" alt="Félicitations" />
                        </div>
                    )}
                </div>
            </div>
            {visible && (
                <img
                    src='https://media1.giphy.com/media/l9bpYbmiaAtwJ7HK09/200.webp?cid=ecf05e47li6m59xuqyfwqlbu36t6q9icqxlk8qpmywyva6wh&ep=v1_gifs_related&rid=200.webp&ct=s'
                    alt="Grenouille"
                    style={{
                        position: 'absolute',
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                    }}
                    onClick={handleClick}
                />
            )}
        </main>
    );
};

export default Game;