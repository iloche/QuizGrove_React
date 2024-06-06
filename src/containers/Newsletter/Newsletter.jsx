import React from "react"

const Newsletter = () => {
    return (
        <div className="newsletter">
      <h2>Abonne-toi à notre newsletter pour recevoir les nouveautés</h2>
      <div className="news-box">
        <input type="email" className="email-box" placeholder="Saisis ton adresse e-mail " />
        <button className="submit-box">Envoyer</button>
      </div>
    </div>
    )
    
};

export default Newsletter;