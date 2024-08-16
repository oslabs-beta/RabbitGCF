import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import MetricsPage from './pages/MetricsPage.jsx';
import ForecastPage from './pages/ForecastPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FunctionsPage from './pages/FunctionsPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProjectSetupPage from './pages/ProjectSetupPage.jsx';

const App = () => {
  const [functionName, setFunctionName] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  
  return(
    <div style={{backgroundColor: '#E4EBF7', minHeight: '100vh'}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/functions' element={<FunctionsPage functionName={functionName} setFunctionName={setFunctionName}/>}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/metrics' element={<MetricsPage functionName={functionName} setFunctionName={setFunctionName}/>}/>
          <Route path='/forecast' element={<ForecastPage functionName={functionName} setFunctionName={setFunctionName}/>}/>
          <Route path='/projects' element={<ProjectsPage/>}/>
          <Route path='/projects/setup' element={<ProjectSetupPage/>}/>
          <Route path='/profile' element={<ProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;