import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import ForcastPage from './pages/ForcastPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

const App = () => {

  return(
    <div style={{backgroundColor: '#E4EBF7', minHeight: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/metrics' element={<MetricsPage />}/>
          <Route path='/forcast' element={<ForcastPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;