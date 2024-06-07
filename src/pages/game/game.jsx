import React, { useState } from 'react';
import clsx from 'clsx';
import style from './game.module.scss';

const categories = ["Animaux", "Cinéma", "Culture", "Géographie", "Histoire", "Internet", "Loisirs", "Musique", "Sports"];
const difficultyLevels = ["Débutant", "Confirmé", "Expert"];

const Game = () => {
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [showDifficultyPopup, setShowDifficultyPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

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
    };

    return (
        <main className={style['main-jeu']}>
            <div className={style['top-content']}>
                <div className={style['game-box']}>
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
                    ) : (
                        <>
                            <h1>Prêt à tester tes connaissances ?</h1>
                            <button className={style.start} onClick={handleStartButtonClick}>Commencez !</button>
                        </>
                    )}

                </div>
            </div>
            {/* <div className="cookie">
                <p className="policy">En cliquant sur « Accepter tous les cookies », vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation sur le site, analyser son utilisation et contribuer à nos efforts de marketing.</p>
                <button className="accept">Autoriser tous les cookies</button>
                <button className="refuse">Tout refuser</button>
            </div> */}
        </main>
    );
};

export default Game;
