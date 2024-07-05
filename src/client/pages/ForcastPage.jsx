import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/base/Button';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import gcfPricingStructure from '../../../gcfPricingStructure';


const ForcastPage = () => {
  const [dataSeries, setDataSeries] = useState({});
  const [filteredDataSeries, setFilteredDataSeries] = useState({});
  const [generationOptions, setGenerationOptions] = useState(['1','2']);
  
  const [funcList, setfuncList] = useState([]);
  const [configurations, setConfigurations] = useState({});
  const [selectedFunc, setSelectedFunc] = useState({});

  const projectId = 'refined-engine-424416-p7';

  const getFunctionList = async () => {
    try {
      const response = await fetch(`/api/metrics/funcs/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      console.log(data);
      
      setfuncList(data.funcList);
      setConfigurations(data.configurations);
      setSelectedFunc(data.funcList[0]);

      const funcNameInput = document.getElementById('functionNameInput');
      funcNameInput.value = data.funcList[0];
      console.log('getFunc first selected ==>', funcNameInput.value);
      updateFields();
      
    } catch (error) {
      console.log('Error in getFunctionList: ', error);
    }
  }

  useEffect(() => {
    getFunctionList()
  }, []);

  const updateGenerationOptions = () => {
    // const region = document.getElementById('regionInput').value;
    // console.log('updateGen region ==>',region);
    // setGenerationOptions(Object.keys(gcfPricingStructure.gcfRegionTiers.region));
    // console.log('updated generation options ==>', generationOptions);
  }

  const updateFields = () => {
    const selected = document.getElementById('functionNameInput').value;
    // const selected = selectedFunc;
    console.log('updateFields selected==>', selected);
    
    // console.log(gcfPricingStructure.typeMapping[configurations[selected].funcType])
    document.getElementById('typeInput').value = gcfPricingStructure.typeMapping[configurations[selected].funcType];
    document.getElementById('regionInput').value = configurations[selected].funcRegion;
    document.getElementById('generationInput').value = gcfPricingStructure.genMapping[configurations[selected].funcGeneration];

  }

  const forecastSubmit = () => {
    console.log('forecast button clicked');
    const forecastArgs = {
      // projectId: 'retrieve from State - placeholder',
      functionName: document.getElementById('functionNameInput').value,
      type: document.getElementById('typeInput').value,
      region: document.getElementById('regionInput').value,
      generation: document.getElementById('generationInput').value,
      increments: Number(document.getElementById('incrementsInput').value),
      maxIncrements: Number(document.getElementById('maxIncrementsInput').value),
    }

    // console.log(forecastArgs);
    try {
      fetch(`api/forecast/${projectId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forecastArgs),
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

  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Forecast Page</h1>
        <div>
          <div>
            <label for='functionName'>Function: </label>
            <select onChange={updateFields} name="functionName" id="functionNameInput">
              {
                funcList.map(func => {
                  return <option key={func} value={func}>{func}</option>
                })
              }
            </select>
          </div>
          <div>
            <label for='type'>Type: </label>
            <select name="type" id="typeInput">
              {
                Object.keys(gcfPricingStructure.gcfTypes).map(type => {
                  return <option key={type} value={type}>{type}</option>
                })
              }
            </select>
            <label for='region'>Region: </label>
            <select name='region' id='regionInput'>
              {
                Object.keys(gcfPricingStructure.gcfRegionTiers).map((region, i) => {
                  if(i === 0) return <option selected="selected" key={region} value={region}>{region}</option>
                  return <option key={region} value={region}>{region}</option>
                })
              }
            </select>
            <label for='generation'>GCF Generation: </label>
            <select onChange={updateGenerationOptions()} name='generation' id='generationInput'>
              {
                generationOptions.map(generation => {
                  return <option key={generation} value={generation}>{generation}</option>
                })
              }
              {/* <option value='1'>1</option>
              <option value='2'>2</option> */}
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