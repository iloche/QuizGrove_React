import style from './support.module.scss'

const Support = () => {

    return (
        <main>
            <div className={style['top-content']}>
                <div className={style['support-box']}>
                    <h1>Aide</h1>
                    <div className={style.wrapper}>
                        <div className={style.tutoriel}>
                            <div className={style['tuto-title']}>
                                <h2>Comment jouer ?</h2>
                                <img src="/doc/howMushy.png" alt="mushy" className={style.howMushy}/>
                            </div>
                            <div className={style['tuto-box']}>
                                <div className="step">
                                    <h2>🔍 Sélectionne la catégorie dans laquelle tu veux tester tes connaissances</h2>
                                </div>
                                <div className="step">
                                    <h2>✨ Des points d'expérience te seront attribués en fonction de la difficulté de la question en cours</h2>
                                </div>
                                <div className="step">
                                    <h2>🆕 Avances dans les niveaux pour débloquer le niveau Expert !</h2>
                                </div>
                                <div className="step">
                                    <h2>À toi de jouer !</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            {/* <div className="cookie">
                <p className="policy">En cliquant sur « Accepter tous les cookies », vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation sur le site, analyser son utilisation et contribuer à nos efforts de marketing.</p>
                <button className="accept">Autoriser tous les cookies</button>
                <button className="refuse">Tout refuser</button>
            </div> */}
            
        </main>
    )
}

export default Support;
