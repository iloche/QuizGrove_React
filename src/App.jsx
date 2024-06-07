import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import './App.css'; 

import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';
import Login from './pages/login/login';
import Profil from './pages/profil/profil';
import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";
import Game from './pages/game/game';
import Support from "./pages/support/support";

const App = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return (
      <div id="loading-screen">
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzd2b3YxbzdlbmNua25nb21wbmtjamZlYXR2dzN1MmloN3FhM3hnYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/0u3sGL8rZ6c5qACmkv/giphy.gif" alt="Chargement en cours..." className="spinner"/>
        <p>Chargement en cours...</p>
      </div>
    );
  }

  return (
    <div className="chakra-petch-light">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index path="/" element={<Login user={user} />} />
          <Route path="/game" element={
            <ProtectedRoute user={user}>
              <Game />
            </ProtectedRoute>
          } />
          <Route path="/profil" element={
            <ProtectedRoute user={user}>
              <Profil />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute user={user}>
              <Support />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
