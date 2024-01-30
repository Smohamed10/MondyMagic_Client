import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './shared/Footer';
import Header from './shared/Header';
import React from 'react';


function App() {
  return (
    <div className="site-wrap">

    <div className="App">

    <Header/>
    <Outlet/>
    <Footer/>
    </div>
    </div>

  );
}

export default App;
