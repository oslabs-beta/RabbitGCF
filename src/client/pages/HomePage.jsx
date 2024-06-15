import React from 'react';
import NavBar from '../components/NavBar.jsx';
// import DummyGraph from '../components/DummyGraph.jsx';
// import ZoomGraph from '../components/ZoomGraph.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import RabbitLogo from '../images/rabbit_hop.png';

const HomePage = () => {

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <DrawerHeader />
        {/* <h1>Home Page</h1> */}
        <Typography variant='h3' style={{marginTop: '20px'}}>
          Welcome to RabbitGCF!
        </Typography>
        <Typography variant='h5' style={{marginTop: '20px'}}>
          Optimizing Google Cloud Functions one <span style={{fontWeight: 'bold'}}>hop</span> at a time
        </Typography>
        <img src={RabbitLogo} width='400px' style={{marginTop: '50px'}}/>
      </Box>
    </div>
  );
};

export default HomePage;
