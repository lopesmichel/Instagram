import React from "react";
import "./App.css"

import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//Hooks
import { useAuth } from "./hooks/useAuth";

//pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";



function App() {

  const {auth, loading} = useAuth()

  if(loading) {
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
