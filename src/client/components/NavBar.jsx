import React from 'react';
import '../css/navbar.css';

const NavBar = () => {

  return(
    <div className='nav-bar'>
      <div className='nav-item'>Home</div>
      <div className='nav-item'>Metrics</div>
      <div className='nav-item'>Forecast</div>
    </div>
  );
};

export default NavBar;