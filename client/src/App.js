// src/App.js
import React from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';

import axios from './axios';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <h1>Authentication App</h1>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/signin">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
