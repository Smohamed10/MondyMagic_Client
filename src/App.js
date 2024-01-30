import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './shared/Footer';
import Header from './shared/Header';
import React from 'react';


function App() {
  return (
    <div className="site-wrap">
    <Header/>
    <Outlet/>
    <Footer/>
    </div>

  );
}

export default App;
