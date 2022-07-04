// Création des routes

import React from 'react';

// Importation des components de react-router-dom
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

// Importation des pages
import Register from '../../pages/Register';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Parameters from '../../pages/Parameters';

const index = () => {


    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/profil/:id" element={<Profil/>} />
                <Route path="/settings" element={<Parameters/>} />
                <Route path="/logout" element={<Register/>} />

                {/* Redirection vers /register si paramètres inconnus */}
                <Route path="*" element={<Navigate to="/register"/>} />

            </Routes>
        </Router>
        
    )
};

export default index;