import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import './App.css'; 

import { ScoreProvider } from './contexts/scoreContext';
import Header from './containers/Header/Header';
import Footer from './containers/Footer/Footer';
import Login from './pages/login/login';
import Profil from './pages/profil/profil';
import { ProtectedRoute } from "./components/protectedRoute/protectedRoute";
import Game from './pages/game/game';
import Support from "./pages/support/support";
import LoadingScreen from './components/loadingScreen/loadingScreen';

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
    return <LoadingScreen />;
  }

  return (
    <ScoreProvider>
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
    </ScoreProvider>
  );
}

export default App;
