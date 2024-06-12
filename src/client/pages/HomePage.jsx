import React from 'react';
import NavBar from '../components/NavBar.jsx';
// import DummyGraph from '../components/DummyGraph.jsx';
import ZoomGraph from '../components/ZoomGraph.jsx';

const HomePage = () => {

  return(
    <div>
      <NavBar />
      <h1>Homepage</h1>
      {/* <DummyGraph /> */}
      <ZoomGraph />
    </div>
  );
};

export default HomePage;