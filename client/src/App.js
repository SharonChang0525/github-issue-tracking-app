import './App.css';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import WelcomePage from './components/WelcomePage';
import { useSelector } from 'react-redux';

import React from 'react';

function App() {

  const isLogged = useSelector(state => state.isLogged);

  return (
    <div className="App">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>   
      </head>
      <body>
      
        <Navbar></Navbar>
        { isLogged ?
        <HomePage />
        :
        <WelcomePage />
        }
      </body>
    </div>
  );
}

export default App;
