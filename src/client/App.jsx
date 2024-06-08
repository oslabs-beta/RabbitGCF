import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import ForcastPage from './pages/ForcastPage.jsx';

const App = () => {

  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/metrics' element={<MetricsPage />}/>
          <Route path='/forcast' element={<ForcastPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;