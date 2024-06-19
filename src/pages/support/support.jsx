import style from './support.module.scss'
import howMushy from '../../../doc/howMushy.png'

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
                                <img src={howMushy} alt="mushy" className={style.howMushy}/>
                            </div>
                            <div className={style['tuto-box']}>
                                <div className="step">
                                    <h2>🔍 Sélectionne la catégorie dans laquelle tu veux tester tes connaissances</h2>
                                </div>
                                <div className="step">
                                    <h2>✨ Des points te seront attribués en fonction de la difficulté de la question en cours</h2>
                                </div>
                                <div className="step">
                                    <h2>🆕 Avances dans les niveaux pour débloquer le niveau Expert</h2>
                                </div>
                                <div className="step">
                                    <h2>🐸 Une grenouille volante apparait de temps à autre, attrape-la pour gagner un point supplémentaire</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Support;