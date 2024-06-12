import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';

const AccountMenu = () => {
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  function openMenu(e) {
    setAnchorEl(e.target);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  function profileClick() {
    navigate('/profile');
  }

  function logoutClick() {
    console.log('logged Out');
  }

  return(
    <div style={{marginLeft: 'auto'}}>
      <IconButton
        color="inherit"
        onClick={openMenu}
      >
        <AccountCircleIcon fontSize='large'/>
      </IconButton>
      <Menu 
        anchorEl={anchorEl}
        open={open}
        onClick={closeMenu}
        onClose={closeMenu}
      >
        <MenuItem onClick={profileClick}>
          <ManageAccountsIcon />
          My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutClick}>
          <LogoutIcon />
          Log out
        </MenuItem> 
      </Menu>
    </div>
  );
}

export default AccountMenu;