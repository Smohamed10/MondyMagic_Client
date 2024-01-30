import React from 'react';
import { removeAuthUser,getAuthUser } from '../Helper/Storage';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const Auth=getAuthUser();
  const navigate = useNavigate();

    const Logout = () => { 
    removeAuthUser();
    navigate('/');
    }

    return (
<div>
<header class="site-navbar py-1" role="banner">

<div class="container">
  <div className="row align-items-center">

    <div className="col-6 col-xl-2">

      <h1 className="mb-0"><a href='/' className="text-black h2 mb-0" style={{ cursor: 'pointer' }}>
      Mondy<span className='Ankh' style='color: gold;'>&#9765;</span>Magic
            </a></h1>
    </div>
    <div className="col-10 col-md-8 d-none d-xl-block">
      <nav className="site-navigation position-relative text-right text-lg-center" role="navigation">

        <ul className="site-menu js-clone-nav mx-auto d-none d-lg-block">
          <li className=""><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          {
            !Auth &&
              <li><a href="/Login">Login</a></li>
          }

          {
            !Auth &&
              <li><a href="/Register">Register</a></li>
          }

          <li><a href="/contact">Contact</a></li>

          
          {
           Auth && Auth[0].status===1 && 
          <li><a href="/managetrips">Manage trips</a></li>
          
          }
          {
           Auth && Auth[0].status===1 && 
          <li><a href="/managebookings">Manage Bookings</a></li>
          
          }
        </ul>
      </nav>
    </div>

    <div className="col-6 col-xl-2 text-right">
      <div className="d-none d-xl-inline-block">
        <ul className="site-menu js-clone-nav ml-auto list-unstyled d-flex text-right mb-0" data-classname="social">
          <li>
            <a href="https://www.facebook.com/mondy.rmadan?mibextid=LQQJ4d" className="pl-3 pr-3 text-black"><span className="icon-facebook"></span></a>
          </li>
          <li>
            <a href="https://wa.me/+2001009445487" className="pl-3 pr-3 text-black"><span className="icon-whatsapp"></span></a>
          </li>
          <li>
            <a href="https://www.instagram.com/mondyrmadan?igsh=MTdtOWwwcTJzcjY0eA==" className="pl-3 pr-3 text-black"><span className="icon-instagram"></span></a>
          </li>
          {
            Auth &&
              <button onClick={Logout} className='btn btn-sm btn-danger mx-2'>Logout</button>
            
          }
        
        </ul>
      </div> 

      <div className="d-inline-block d-xl-none ml-md-0 mr-auto py-3" style={{position: "relative", top: "3px"}}><a href=" " className="site-menu-toggle js-menu-toggle text-black"><span className="icon-menu h3"></span></a></div>

    </div>

  </div>
</div>

</header>


</div>
    );
};

export default Header;