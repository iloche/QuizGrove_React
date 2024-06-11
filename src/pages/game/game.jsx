import React, { useState } from 'react';
import clsx from 'clsx';
import style from './game.module.scss';
import quizData from '../../data/quizz.json';

const categories = ["Animaux", "Cinéma", "Culture", "Géographie", "Histoire", "Loisirs", "Musique", "Sports"];
const difficultyLevels = ["Débutant", "Confirmé", "Expert"];

const Game = () => {
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showDifficultyPopup, setShowDifficultyPopup] = useState(false);
    const [showQuestionPopup, setShowQuestionPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // État pour suivre l'index de la question actuelle

    const handleStartButtonClick = () => {
        setShowCategoryPopup(true);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setShowCategoryPopup(false);
        setShowDifficultyPopup(true);
    };

    const handleDifficultyClick = (difficulty) => {
        setSelectedDifficulty(difficulty);
        setShowDifficultyPopup(false);
        setShowQuestionPopup(true); 
    };

    const handleAnswerClick = (selectedChoice) => {
        // Vérifie si la réponse sélectionnée correspond à la réponse correcte de la question actuelle
        if (selectedChoice === currentQuestion.reponse) {
            // Incrémente l'index de la question actuelle une fois que l'utilisateur a cliqué sur la bonne réponse
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    

    // Obtient les questions en fonction de la difficulté sélectionnée
    const questions = quizData.quizz[selectedDifficulty?.toLowerCase()] || [];

    // Obtient la question actuelle en fonction de l'index
    const currentQuestion = questions[currentQuestionIndex];

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
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : showQuestionPopup ? (
                        <div className={clsx("question-title", style.popup)}>
                            <h2>Catégorie: {selectedCategory} <span>Difficulté: {selectedDifficulty}</span></h2>
                            <div className={style.question}>
                                <h2>Question</h2>
                                {currentQuestion && (
                                  <div>
                                    <h3>{currentQuestion.question}</h3>
                                    <ul>
                                    {currentQuestion.propositions.map((choice, index) => (
                                        <li key={index} onClick={() => handleAnswerClick(choice)}>{choice}</li>
                                    ))}
                                    </ul>
                                  </div>
                                )}
                                <p>{currentQuestion.anecdote}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h1>Prêt à tester tes connaissances ?</h1>
                            <button className={style.start} onClick={handleStartButtonClick}>Commencez !</button>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Game;