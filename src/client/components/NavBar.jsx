import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const NavBar = () => {
  const [user, setUser] = useState({
    email: null,
    firstName: null,
    lastName: null,
    picture: null,
  });

  // useEffect(() => {
  //   // fetch user info
  //   fetch('/user/info')
  //     .then(response => response.json())
  //     .then(response => {
  //       setUser({
  //         email: response.email,
  //         firstName: response.firstName,
  //         lastName: response.lastName,
  //         picture: response.picture,
  //       })
  //     })
  // }, [])
  
  return(
    <div className='nav-bar'>
      <div className='nav-item'>Home</div>
      <div className='nav-item'>Metrics</div>
      <div className='nav-item'>Forcast</div>
      <div className='nav-item'>
        <Link to="http://localhost:3000/auth/google">
          Continue with Google
        </Link>
      </div>
    </div>
  );
};

export default NavBar;