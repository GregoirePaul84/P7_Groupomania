// Création des routes

import React from 'react';

// Importation des components de react-router-dom
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

// Importation des pages
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Settings from '../../pages/Settings';

const index = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/profil/:id" element={<Profil/>} />
                <Route path="/settings" element={<Settings/>} />

                {/* Redirection vers /home si paramètres inconnus */}
                <Route path="*" element={<Navigate to="/home"/>} />

            </Routes>
        </Router>
        
    )
};

export default index;