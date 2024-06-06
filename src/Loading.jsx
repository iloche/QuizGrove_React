// Loading.jsx

import React, { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    console.log('Loading component mounted'); // Console log lorsque le composant est monté

    const hideLoading = setTimeout(() => {
      document.getElementById('loading-screen').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      document.body.style.overflow = 'auto'; // Réactive le défilement une fois le chargement terminé
      console.log('Loading component unmounted'); // Console log lorsque le composant est démonté
    }, 3000); // Cache le chargement après 3 secondes

    return () => {
      clearTimeout(hideLoading); // Nettoie le timer quand le composant est démonté
    };
  }, []);

  return (
    <div id="loading-screen">
      <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzd2b3YxbzdlbmNua25nb21wbmtjamZlYXR2dzN1MmloN3FhM3hnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/0u3sGL8rZ6c5qACmkv/giphy.gif" alt="Chargement en cours..." className="spinner" />
      <p>Chargement en cours...</p>
    </div>
  );
}

export default Loading;
