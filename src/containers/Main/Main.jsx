// Main.jsx
import React, { useState } from 'react';

const categories = ["Animaux", "Cinéma", "Culture", "Géographie", "Histoire", "Internet", "Loisirs", "Musique", "Sports"];
const difficultyLevels = ["Débutant", "Confirmé", "Expert"];

const Main = () => {
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
        <main className="main-jeu">
            <div className="top-content">
                <div className="box">
                    {showCategoryPopup ? (
                        <div className="categories-title popup">
                            <h2>Choisis la catégorie dans laquelle tu veux jouer</h2>
                            {showCategoryPopup && (
                    <div className="categories-box">
                        <ul className="categories-content">
                            {categories.map((category, index) => (
                                <li className="tag" key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
                            ))}
                        </ul>
                    </div>
                )}
                        </div>
                    ) : showDifficultyPopup ? (
                        <div className="difficulty-title popup">
                            <h2>Choisis le niveau de difficulté</h2>
                            {showDifficultyPopup && (
                    <div className="difficulty-box">
                        {difficultyLevels.map((difficulty, index) => (
                            <div className="level" key={index} onClick={() => handleDifficultyClick(difficulty)}>
                                <h2>{difficulty}</h2>
                            </div>
                        ))}
                    </div>
                )}
                        </div>
                    ) : (
                        <>
                            <h1>Prêt à tester tes connaissances ?</h1>
                            <button className='start' onClick={handleStartButtonClick}>Commencez !</button>
                        </>
                    )}
                    
                </div>
            </div>
            <hr />
            {/* <div className="cookie">
                <p className="policy">En cliquant sur « Accepter tous les cookies », vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation sur le site, analyser son utilisation et contribuer à nos efforts de marketing.</p>
                <button className="accept">Autoriser tous les cookies</button>
                <button className="refuse">Tout refuser</button>
            </div> */}
        </main>
    );
};

export default Main;
