import React, { useState } from 'react';
import clsx from 'clsx';
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
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // État pour suivre l'index de la question actuelle
    const [showAnecdote, setShowAnecdote] = useState(false); // État pour afficher l'anecdote
    const [selectedAnswer, setSelectedAnswer] = useState(null); // État pour la réponse sélectionnée
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // État pour savoir si la réponse est correcte ou non
    const [score, setScore] = useState(0); // État pour le score de l'utilisateur
    const [showCongratulations, setShowCongratulations] = useState(false); 
    const [expertUnlocked, setExpertUnlocked] = useState(false); // État pour vérifier si le niveau expert est déverrouillé
    const [answered, setAnswered] = useState(false); // État pour suivre si l'utilisateur a répondu à la question

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
            return; // Empêche le changement de difficulté si le niveau Expert n'est pas déverrouillé
        }

        setSelectedDifficulty(difficulty);
        setShowDifficultyPopup(false);
        setShowQuestionPopup(true); 
    };
    
    const handleAnswerClick = (selectedChoice) => {
        // Vérifie si la question a déjà été répondue
        if (!answered) {
          // Vérifie si la réponse sélectionnée correspond à la réponse correcte de la question actuelle
          const isCorrect = selectedChoice === currentQuestion.reponse;
          setIsAnswerCorrect(isCorrect);
          setSelectedAnswer(selectedChoice);
    
          if (isCorrect) {
            setScore(score + 1);
            setShowAnecdote(true);
          }
          setAnswered(true); // Marque la question comme ayant été répondue
        }
      };

    const handleNextQuestionClick = () => {
        // Passe à la question suivante et réinitialise les états
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnecdote(false);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        setAnswered(false); 

        // Vérifie si l'utilisateur a terminé toutes les questions du niveau
        if (currentQuestionIndex === totalQuestions - 1) {
            setShowCongratulations(true); // Affiche les félicitations
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

    return (
        <main className={style['main-jeu']}>
            <div className={style['top-content']}>
                <div className={clsx(style['game-box'], { [style['shifted']]: showCategoryPopup || showDifficultyPopup || showQuestionPopup })}>

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
                                            {difficulty === "Expert" && !expertUnlocked && ( // Affiche le cadenas si le niveau expert est verrouillé
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
                                        <button className={style.start} onClick={handleNextQuestionClick}><img className={style.arrow} src='../../../doc/arrow.png' /></button>
                                    </div>
                                )}
                            </div>
                            <div className={style.progress}>
                                <div className={style.progressBar} style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className={style.score}>
                                Score: {score}
                            </div>
                            {expertUnlocked && ( // Affiche le niveau expert déverrouillé si déverrouillé
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
