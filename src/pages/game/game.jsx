import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { auth } from "../../firebase"; // Assurez-vous que cela est correctement configuré
import style from './game.module.scss';
import quizData from '../../data/quizz.json';

const categories = ["Animaux", "Cinéma", "Culture Mondiale", "Géographie", "Histoire", "Loisirs", "Musique", "Sports"];
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
    const [score, setScore] = useState(0);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [expertUnlocked, setExpertUnlocked] = useState(false);
    const [answered, setAnswered] = useState(false);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserId(user.uid);

            const savedProgress = JSON.parse(localStorage.getItem(`quizProgress_${user.uid}`));
            if (savedProgress) {
                setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
                setScore(savedProgress.score || 0);
                setExpertUnlocked(savedProgress.expertUnlocked || false);
                console.log('Progress loaded from localStorage:', savedProgress);
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
            console.log('Progress saved to localStorage:', progressToSave);
        }
    }, [currentQuestionIndex, score, expertUnlocked, userId]);

    const questions = quizData.quizz[selectedDifficulty?.toLowerCase()] || [];
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
    };

    const handleAnswerClick = (selectedChoice) => {
        if (!answered) {
            const isCorrect = selectedChoice === currentQuestion.reponse;
            setIsAnswerCorrect(isCorrect);
            setSelectedAnswer(selectedChoice);

            if (isCorrect) {
                setScore(score + 1);
                setShowAnecdote(true);
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

        if (currentQuestionIndex === totalQuestions - 1) {
            setShowCongratulations(true);
        }
    };

    const handleRestartButtonClick = () => {
        setShowCategoryPopup(true);
        setShowDifficultyPopup(false);
        setShowQuestionPopup(false);
        setCurrentQuestionIndex(0);
        setShowAnecdote(false);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setScore(0);
        setShowCongratulations(false);
    };

    const handleQuitGame = () => {
        setShowCategoryPopup(true); // Affiche à nouveau le popup des catégories
        setShowDifficultyPopup(false); // Assure que le popup de la difficulté est caché
        setShowQuestionPopup(false); // Assure que le popup des questions est caché
        setShowAnecdote(false); // Assure que l'anecdote est cachée
        setSelectedAnswer(null); // Réinitialise la réponse sélectionnée
        setIsAnswerCorrect(null); // Réinitialise la vérification de la réponse
        setAnswered(false); // Réinitialise l'état de réponse
    };  
    
    const [musicPlaying, setMusicPlaying] = useState(false);

    const toggleMusic = () => {
        setMusicPlaying(prevState => !prevState);
    };
    
    return (
        <main className={style['main-jeu']}>
            <div className={style['top-content']}>
                <div className={clsx(style['game-box'], { [style['shifted']]: showCategoryPopup || showDifficultyPopup || showQuestionPopup })}>
                <div className={style.buttons}>
                    <button title='Lancer la musique' className={style.button} onClick={toggleMusic}>
                        <img className={style.music} src='../../../doc/music.png' />
                    </button>
                    <button title='Relancer le niveau' className={style.button} onClick={handleRestartButtonClick}>
                        <img className={style.refresh} src='../../../doc/refresh.png' />
                    </button>
                    <button title='Retour' className={style.button} onClick={handleQuitGame}>
                        <img className={style.return} src='../../../doc/return.png' />
                    </button>
                </div>
                {musicPlaying && (
                        <audio autoPlay loop>
                            <source src="../../../doc/Joel McNeely-Tinkering.mp3" type="audio/mp3" />
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
                            <h2>Choisis le niveau de difficulté</h2>
                            {showDifficultyPopup && (
                                <div className={style["difficulty-box"]}>
                                    {difficultyLevels.map((difficulty, index) => (
                                        <div className={style.level} key={index} onClick={() => handleDifficultyClick(difficulty)}>
                                            <h2>{difficulty}</h2>
                                            {difficulty === "Expert" && !expertUnlocked && (
                                                <img className={style.lock} src="../../../doc/locked.png" alt="Cadenas" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : showQuestionPopup ? (
                        <div className={clsx("question-title", style.popup)}>
                            <div className={style["question-tag-level"]}>
                                <h2>Catégorie: {selectedCategory} <span>Difficulté: {selectedDifficulty}</span></h2>
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
                                        <p>{currentQuestion.anecdote}</p>
                                        <button title='Suivant' className={style.start} onClick={handleNextQuestionClick}><img className={style.arrow} src='../../../doc/arrow.png' /></button>
                                    </div>
                                )}
                            </div>
                            <div className={style.progress}>
                                <div className={style.progressBar} style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className={style.score}>
                                Score: {score}
                            </div>
                            {expertUnlocked && (
                                <div className={style.unlocked}>
                                    <h2>Niveau Expert</h2>
                                </div>
                            )}
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
                           <img className={style.congrats} src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnFqYnpqM3A4aGJ4Z3N3azZqOXFvb3p6dG9wMWR2ZzV2M3p2dzZ2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Vf8UeyP351aaaVj6wR/giphy.gif" alt="Félicitations" />
                       </div>
                       <button className={style.start} onClick={handleRestartButtonClick}>Retour</button>
                       </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Game;
