import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import gcfPricingStructure from '../../../gcfPricingStructure';


const ForcastPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  
  const [funcOptionsElements, setFuncOptionsElements] = useState([]);
  const [typeOptionsElements, setTypeOptionsElements] = useState([]);
  const [regionOptionsElements, setRegionOptionsElements] = useState([]);
  const [generationOptionsElements, setGenerationOptionsElements] = useState(['1','2']);

  const [selectedFunc, setSelectedFunc] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedGen, setSelectedGen] = useState();

  const [generationOptions, setGenerationOptions] = useState();

  const [typeField, setTypeField] = useState();
  const [regionField, setRegionField] = useState();
  const [generationFields, setGenerationFields] = useState();
  
  const [dataSeries, setDataSeries] = useState({});
  const [filteredDataSeries, setFilteredDataSeries] = useState({});
  
  
  const [funcList, setfuncList] = useState([]);
  const [configurations, setConfigurations] = useState();
  

  const projectId = 'refined-engine-424416-p7';

  const getFunctionList = async () => {
    try {
      const response = await fetch(`/api/metrics/funcs/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // console.log('data ==>', data.funcList);

      setfuncList(data.funcList);
      setConfigurations(data.configurations);
      setSelectedFunc(data.funcList[0]);
      updateFields('Function', data.funcList[0], data.configurations);
      
    } catch (error) {
      console.log('Error in getFunctionList: ', error);
    }
  }

  useEffect(() => {
    // loadGCFOptions();
    // setDefaultFields();
    getFunctionList();
    // updateFields();
  }, []);

  const updateFields = (optionType, selectedOption, configs = configurations) => {
    switch (optionType) {
      case 'Function':
        setSelectedType(gcfPricingStructure.typeMapping[configs[selectedOption].funcType]);
        setSelectedRegion(configs[selectedOption].funcRegion);
        updateFields('Region', configs[selectedOption].funcRegion);
        updateFields('GCF-Generation', selectedOption, configs);
        break;
      case 'Region':
        setGenerationOptions(Object.keys(gcfPricingStructure.gcfRegionTiers[selectedOption]));
        break;
      case 'GCF-Generation':
        // console.log('UpdateFields option Generation:', configs[selectedOption]);
        setSelectedGen(gcfPricingStructure.genMapping[configs[selectedOption].funcGeneration]);
        break;
      default:
        console.log('Error in handleOptionClick in Forecast Page');
    }
    setLoaded(true);
  }

  const handleOptionChange = (e) => {
    // console.log(e.target.name);
    switch (e.target.name) {
      case 'Function':
        console.log('switched Functions');
        setSelectedFunc(e.target.value);
        updateFields('Function', e.target.value);
        break;
      case 'Type':
        console.log('switched Types')
        setSelectedType(e.target.value);
        break;
      case 'Region':
        console.log('switched Region')
        setSelectedRegion(e.target.value);
        updateFields('Region', e.target.value);
        break;
      case 'GCF-Generation':
        console.log('switched Generations')
        setSelectedGen(e.target.value);
        break;
      default:
        console.log('Error in handleOptionClick in Forecast Page');
    }
    
  }

  const forecastSubmit = () => {
    console.log('forecast button clicked');
    const forecastArgs = {
      // projectId: 'retrieve from State - placeholder',
      // functionName: document.getElementById('functionNameInput').value,
      // type: document.getElementById('typeInput').value,
      // region: document.getElementById('regionInput').value,
      // generation: document.getElementById('generationInput').value,
      // increments: Number(document.getElementById('incrementsInput').value),
      // maxIncrements: Number(document.getElementById('maxIncrementsInput').value),

      functionName: document.getElementsByName('Function')[0].value,
      type: document.getElementsByName('Type')[0].value,
      region: document.getElementsByName('Region')[0].value,
      generation: document.getElementsByName('GCF-Generation')[0].value,
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
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Function</InputLabel>
            {selectedFunc && <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedFunc}
              onChange={handleOptionChange}
              autoWidth
              label="Function"
              name="Function"
            >
              { funcList ?
                funcList.map(el => {
                  return <MenuItem value={el} key={el}>{el}</MenuItem>
                }) : null
              }
            </Select>}
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
            {selectedFunc && <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedType}
              onChange={handleOptionChange}
              autoWidth
              label="Type"
              name="Type"
            >
              { configurations ?
                Object.keys(gcfPricingStructure.gcfTypes).map(el => {
                  return <MenuItem value={el} key={el}>{el}</MenuItem>
                }) : null
              }
            </Select>}
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Region</InputLabel>
            {selectedFunc && configurations && <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={selectedRegion}
              onChange={handleOptionChange}
              autoWidth
              label="Region"
              name="Region"            >
              { configurations ?
                Object.keys(gcfPricingStructure.gcfRegionTiers).map(el => {
                  return <MenuItem value={el} key={el}>{el}</MenuItem>
                }) : null
              }
            </Select>}
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">GCF Generation</InputLabel>
            {selectedFunc && configurations && <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              // value={gcfPricingStructure.genMapping[configurations[selectedFunc].funcGeneration]}
              value={selectedGen}
              onChange={handleOptionChange}
              autoWidth
              label="GCF-Generation"
              name="GCF-Generation"
            >
              { configurations ?
                generationOptions.map(el => {
                  return <MenuItem value={el} key={el}>{el}</MenuItem>
                }) : null
              }
            </Select>}
          </FormControl>
        </div>
        <TextField id="incrementsInput" label="Invocation Increments" variant="filled" />
        <TextField id="maxIncrementsInput" label="Max Increments" variant="filled" />
        <Button onClick={forecastSubmit} variant="contained">Submit</Button>
        {/* <div>
          <div>
            <label for='functionName'>Function: </label>
            <select 
              onChange={updateFields}
              name="functionName"
              id="functionNameInput"
              value={selectedFunc}>
              {
                funcList.map((func, i) => {
                  return <option key={func} value={func}>{func}</option>;
                })
              }
            </select>
          </div>
          <div>
            <label for='type'>Type: </label>
            <select name="type" id="typeInput" value>
              { 
                isLoaded && typeOptionsElements
                // Object.keys(gcfPricingStructure.gcfTypes).map((type, i) => {
                //   if(i === 0) return <option key={type} value={type} selected="selected">{type}</option>;
                //   return <option key={type} value={type}>{type}</option>;
                // })
              }
            </select>
            <label for='region'>Region: </label>
            <select name='region' id='regionInput'>
              { 
                isLoaded && regionOptionsElements
              }
            </select>
            <label for='generation'>GCF Generation: </label>
            <select onChange={updateGenerationOptions()} name='generation' id='generationInput'>
              {
                isLoaded && generationOptionsElements
              }
            </select>
          </div>
          <div>
            <label for='increments'>Invocation Increments: </label>
            <input type='number' id='incrementsInput' name='increments' defaultValue={500000}/>
            <label for='maxIncrements'>Max Increments: </label>
            <input type='number' id='maxIncrementsInput' name='maxIncrements' defaultValue={12}/>
          </div>
          <button onClick={forecastSubmit}>Generate</button>
        </div> */}
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