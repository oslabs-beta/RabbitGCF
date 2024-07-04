import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/base/Button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ForcastPage = () => {
  const [dataSeries, setDataSeries] = useState({});
  const [filteredDataSeries, setFilteredDataSeries] = useState({});
  const [filters, setFilters] = useState({
    invocationCost: true,
    cpuRAMCost: true,
    cpuGHzCost: true,
    networkBandwidthCost: true,
    totalCost: true,
  });
  const [loaded, setLoaded] = useState(false);
  const [funcList, setfuncList] = useState([]);

  const projectId = 'refined-engine-424416-p7';

  const getFunctionList = async () => {
    try {
      const response = await fetch(`/api/metrics/funcs/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
      const funcsComponent = data['funcNames'].map((func, index) => {
        return(<option key={func.concat(index)} value={func}>{func}</option>)
      });
      setfuncList(funcsComponent);
      setLoaded(true);
    } catch (error) {
      console.log('Error in getFunctionList: ', error);
    }
  }

  useEffect(() => {
    getFunctionList()
  }, []);

  const forecastSubmit = () => {
    console.log('forecast button clicked');
    const forecastArgs = {
      projectId: 'retrieve from State - placeholder',
      functionName: document.getElementById('functionNameInput').value,
      type: document.getElementById('typeInput').value,
      region: document.getElementById('regionInput').value,
      generation: document.getElementById('generationInput').value,
      increments: Number(document.getElementById('incrementsInput').value),
      maxIncrements: Number(document.getElementById('maxIncrementsInput').value),
    }

    // console.log(forecastArgs);
    try {
      fetch('api/forecast',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ forecastArgs: forecastArgs }),
      })
        .then(response => response.json())
        .then(response => {
          setDataSeries(response);
          setFilteredDataSeries(response);
        });
    } catch (err) {
      console.log('Error in forecast fetch: ', err);
    }
  }

  const filterForecast = () => {
    const newFilters = filters;
  }

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Forecast Page</h1>
        <div>
          <div>
            <label for='functionName'>Function: </label>
            <select name="functionName" id="functionNameInput">
              {funcList}
            </select>
          </div>
          <div>
            <label for='type'>Type: </label>
            <select name="type" id="typeInput">
              <option value="Memory: 128MB / CPU: 200MHz">Memory: 128MB / CPU: 200MHz</option>
              <option value="Memory: 256MB / CPU: 400MHz">Memory: 256MB / CPU: 400MHz</option>
              <option value="Memory: 512MB / CPU: 800MHz">Memory: 512MB / CPU: 800MHz</option>
              <option value="Memory: 1024MB / CPU: 1.4GHz">Memory: 1024MB / CPU: 1.4GHz</option>
              <option value="Memory: 2048MB / CPU: 2.8GHz">Memory: 2048MB / CPU: 2.8GHz</option>
              <option value="Memory: 4096MB / CPU: 4.8GHz">Memory: 4096MB / CPU: 4.8GHz</option>
              <option value="Memory: 8192MB / CPU: 4.8MHz">Memory: 8192MB / CPU: 4.8MHz</option>
              <option value="Memory: 16384MB / CPU: 4.8MHz">Memory: 16384MB / CPU: 4.8MHz</option>
              <option value="Memory: 32768MB / CPU: 4.8MHz">Memory: 32768MB / CPU: 4.8MHz</option>
            </select>
            <label for='region'>Region: </label>
            <select name='region' id='regionInput'>
              <option value="asia-east1">asia-east1</option>
              <option value="asia-east2">asia-east2</option>
              <option value="asia-northeast1">asia-northeast1</option>
              <option value="asia-northeast2">asia-northeast2</option>
              <option value="asia-northeast3">asia-northeast3</option>
              <option value="asia-south1">asia-south1</option>
              <option value="asia-south2">asia-south2</option>
              <option value="asia-southeast1">asia-southeast1</option>
              <option value="asia-southeast2">asia-southeast2</option>
              <option value="australia-southeast1">australia-southeast1</option>
              <option value="australia-southeast2">australia-southeast2</option>
              <option value="europe-central2">europe-central2</option>
              <option value="europe-north1">europe-north1</option>
              <option value="europe-southwest1">europe-southwest1</option>
              <option value="europe-west1">europe-west1</option>
              <option value="europe-west10">europe-west10</option>
              <option value="europe-west12">europe-west12</option>
              <option value="europe-west2">europe-west2</option>
              <option value="europe-west3">europe-west3</option>
              <option value="europe-west4">europe-west4</option>
              <option value="europe-west6">europe-west6</option>
              <option value="europe-west8">europe-west8</option>
              <option value="europe-west9">europe-west9</option>
              <option value="me-central1">me-central1</option>
              <option value="me-central2">me-central2</option>
              <option value="me-west1">me-west1</option>
              <option value="northamerica-northeast1">northamerica-northeast1</option>
              <option value="northamerica-northeast2">northamerica-northeast2</option>
              <option value="southamerica-east1">southamerica-east1</option>
              <option value="southamerica-west1">southamerica-west1</option>
              <option value="us-central1">us-central1</option>
              <option value="us-east1">us-east1</option>
              <option value="us-east4">us-east4</option>
              <option value="us-east5">us-east5</option>
              <option value="us-south1">us-south1</option>
              <option value="us-west1">us-west1</option>
              <option value="us-west2">us-west2</option>
              <option value="us-west3">us-west3</option>
              <option value="us-west4">us-west4</option>
            </select>
            <label for='generation'>GCF Generation: </label>
            <select name='generation' id='generationInput'>
              <option value='1'>1</option>
              <option value='2'>2</option>
            </select>
          </div>
          <div>
            <label for='increments'>Invocation Increments: </label>
            <input type='number' id='incrementsInput' name='increments' defaultValue={500000}/>
            <label for='maxIncrements'>Max Increments: </label>
            <input type='number' id='maxIncrementsInput' name='maxIncrements' defaultValue={12}/>
          </div>
          <button onClick={forecastSubmit}>Generate</button>
        </div>
        <Typography paragraph>
          This is your forecast
        </Typography>
          <div id='legendCheckbox'>
            <input type="checkbox" id="" name="invocationCosts" value="invocationCosts"></input>
            <label for="invocationCosts"> Invocation Costs</label>
          </div>
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
              data={filteredDataSeries}
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