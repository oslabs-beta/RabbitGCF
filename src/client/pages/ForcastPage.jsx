import React, { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ForcastPage = () => {
  const [dataSeries, setDataSeries] = useState({});

  const forecast = () => {
    console.log('forecast button clicked');
    fetch('api/forecast')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setDataSeries(response);
      });
  }

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Forecast Page</h1>
        <button onClick={forecast}>Generate</button>
        <Typography paragraph>
          This is your forecast
        </Typography>
          <LineChart width={730} height={250} data={dataSeries}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="invocations" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="invocationCost" stroke="#8884d8" />
              <Line type="monotone" dataKey="cpuRAMCost" stroke="#82ca9d" />
              <Line type="monotone" dataKey="cpuGHzCost" stroke="#38E4FF" />
              <Line type="monotone" dataKey="networkBandwidthCost" stroke="#900C3F" />
              <Line type="monotone" dataKey="totalCost" stroke="#B138FF" />
            </LineChart>
            <BarChart
              width={500}
              height={300}
              data={dataSeries}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="invocations" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar type="monotone" dataKey="invocationCost" fill="#8884d8" />
              <Bar type="monotone" dataKey="cpuRAMCost" fill="#82ca9d" />
              <Bar type="monotone" dataKey="cpuGHzCost" fill="#38E4FF" />
              <Bar type="monotone" dataKey="networkBandwidthCost" fill="#900C3F" />
            </BarChart>
      </Box>
    </div>
  );
};

export default ForcastPage;