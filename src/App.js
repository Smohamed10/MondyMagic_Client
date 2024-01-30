import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './shared/Footer';
import Header from './shared/Header';
import React from 'react';


function App() {
  return (
    <div>
          <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,700,900|Display+Playfair:200,300,400,700"/> 
    <link rel="stylesheet" href="Assets/fonts/icomoon/style.css"/>
    <link rel="stylesheet" href="Assets/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="Assets/css/magnific-popup.css"/>
    <link rel="stylesheet" href="Assets/css/jquery-ui.css"/>
    <link rel="stylesheet" href="Assets/css/owl.carousel.min.css"/>
    <link rel="stylesheet" href="Assets/css/owl.theme.default.min.css"/>
    <link rel="stylesheet" href="Assets/css/bootstrap-datepicker.css"/>
    <link rel="stylesheet" href="Assets/fonts/flaticon/font/flaticon.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/mediaelement@4.2.7/build/mediaelementplayer.min.css"/>
    <link rel="stylesheet" href="Assets/css/aos.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
    <link rel="stylesheet" href="Assets/css/style.css"/>
    <link rel="stylesheet" href="Assets/css/avatar.css"/>

    <div className="site-wrap">


    <div className="App">
              <div className="site-mobile-menu">
          <div className="site-mobile-menu-header">
            <div className="site-mobile-menu-close mt-3">
              <span className="icon-close2 js-menu-toggle"></span>
            </div>
          </div>
          <div className="site-mobile-menu-body"></div>
        </div>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
    </div>
    <script src="./Assets/js/jquery-3.3.1.min.js"></script>
  <script src="./Assets/js/jquery-migrate-3.0.1.min.js"></script>
  <script src="./Assets/js/jquery-ui.js"></script>
  <script src="./Assets/js/popper.min.js"></script>
  <script src="./Assets/js/bootstrap.min.js"></script>
  <script src="./Assets/js/owl.carousel.min.js"></script>
  <script src="./Assets/js/jquery.stellar.min.js"></script>
  <script src="./Assets/js/jquery.countdown.min.js"></script>
  <script src="./Assets/js/jquery.magnific-popup.min.js"></script>
  <script src="./Assets/js/bootstrap-datepicker.min.js"></script>
  <script src="./Assets/js/aos.js"></script>
  <script src="./Assets/js/main.js"></script>
    </div>

  );
}

export default App;
