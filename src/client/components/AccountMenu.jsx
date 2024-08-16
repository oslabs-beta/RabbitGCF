import React, { useEffect, useState } from 'react';
import { Button, Box, Link } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { login, setProfile, logout } from "../slicers/userSlice.js";
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'

const AccountMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector( state => state.user );
  const [ anchorEl, setAnchorEl ] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  useEffect(
    () => {
      if (user.authCredentials) {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.authCredentials.access_token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )
          .then(res => res.json())
          .then(res => {
            dispatch(setProfile(res));
          })
          .catch(err => console.log(err));
      }
    }, [user.authCredentials]
  )


  const loginRequest = () => {
    if (user.profile) {
      console.log('userProfile useEffect ==>', user.profile);
      // Fetch request to backend to store login info
      fetch('/api/user/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.profile.name,
          email: user.profile.email,
          profile_id: user.profile.id,
        })
      })
    }
  }

  function openMenu(e) {
    setAnchorEl(e.target);
  }

  function closeMenu() {
    setAnchorEl(null);
  }
  
  function profileClick() {
    navigate('/profile');
  }

  const loginClick = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      dispatch(login(codeResponse));
      loginRequest();
      closeMenu();
    },
    onError: (error) => {
      alert('Login failed');
      console.log('Login failed | Error:', error);
    }
  })

  const logoutClick = () => {
    googleLogout();
    dispatch(logout());
    console.log('logged Out');
  }

  return(
    <div style={{marginLeft: 'auto'}}>
      { user.isLoggedIn && user.profile ? 
        <Box>
          {user.profile.name}
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
        </Box> :
        <Box>
          <Button 
            variant='filled'
            onClick={openMenu}
          >
            Login
          </Button>
          <Menu 
              anchorEl={anchorEl}
              open={open}
              onClick={closeMenu}
              onClose={closeMenu}
            >
              <MenuItem onClick={loginClick}>
                Sign In with Google
              </MenuItem>
            </Menu>
        </Box>
        
      }       
    </div>
  );
}

export default AccountMenu;