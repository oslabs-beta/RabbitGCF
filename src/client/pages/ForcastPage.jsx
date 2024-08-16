import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import { FormGroup, FormControl, FormControlLabel, Checkbox, InputLabel, Select, MenuItem, TextField, Button, CircularProgress } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import gcfPricingStructure from '../../../gcfPricingStructure';


const ForecastPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [selectedFunc, setSelectedFunc] = useState();
  const [selectedType, setSelectedType] = useState();
  const [selectedRegion, setSelectedRegion] = useState();
  const [selectedGen, setSelectedGen] = useState();

  const [generationOptions, setGenerationOptions] = useState();
  
  const [dataSeries, setDataSeries] = useState([]);
  const [filteredDataSeries, setFilteredDataSeries] = useState({});
  const [filteringOptions, setFilteringOptions] = useState({
    cpuGHzCost: true,
    cpuRAMCost: true,
    invocationCost: true,
    networkBandwidthCost: true,
    totalCost: true
  });
  
  const [funcList, setfuncList] = useState([]);
  const [configurations, setConfigurations] = useState();

  const projectId = 'refined-engine-424416-p7';

  const getFunctionList = async () => {
    try {
      const response = await fetch(`/api/metrics/funcs/${projectId}?timeRange=43200`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

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
        setSelectedGen(gcfPricingStructure.genMapping[configs[selectedOption].funcGeneration]);
        break;
      default:
        console.log('Error in handleOptionClick in Forecast Page');
    }
  }

  const handleOptionChange = (e) => {
    switch (e.target.name) {
      case 'Function':
        setSelectedFunc(e.target.value);
        updateFields('Function', e.target.value);
        break;
      case 'Type':
        setSelectedType(e.target.value);
        break;
      case 'Region':
        setSelectedRegion(e.target.value);
        updateFields('Region', e.target.value);
        break;
      case 'GCF-Generation':
        setSelectedGen(e.target.value);
        break;
      default:
        console.log('Error in handleOptionClick in Forecast Page');
    }
    
  }

  const filterData = (e) => {
    filteringOptions[e.target.name] = (filteringOptions[e.target.name]) ? false : true;
    const filteredData = dataSeries.map(dataPointObj => {
      const point = {};
      for (const costType in dataPointObj) {
        if(filteringOptions[costType]) {
          point[costType] = dataPointObj[costType];
        }
      }
      return point;
    })
    setFilteredDataSeries(filteredData);
  }

  const forecastSubmit = () => {
    setFetching(true);
    const forecastArgs = {
      functionName: document.getElementsByName('Function')[0].value,
      type: document.getElementsByName('Type')[0].value,
      region: document.getElementsByName('Region')[0].value,
      generation: document.getElementsByName('GCF-Generation')[0].value,
      increments: Number(document.getElementById('incrementsInput').value),
      maxIncrements: Number(document.getElementById('maxIncrementsInput').value),      
    }

    try {
      fetch(`api/forecast/${projectId}?timeRange=43200`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forecastArgs),
      })
        .then(response => {
          if(response.ok) {
            setFetching(false);
            setLoaded(true);
            return response.json();
          } else {
            setLoaded(false);
            setFetching(false);
          }
        })
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
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175}}>
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
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175}}>
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
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175}}>
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
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175}}>
            <InputLabel id="demo-simple-select-autowidth-label">GCF Generation</InputLabel>
            {selectedFunc && configurations && <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
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
        <div>
          <TextField id="incrementsInput" label="Invocation Increments" variant="filled" defaultValue={500000}/>
          <TextField id="maxIncrementsInput" label="Max Increments" variant="filled" defaultValue={5}/>
          <Button onClick={forecastSubmit} variant="contained">Submit</Button>
        </div>
        <Typography paragraph>
          This is your forecast
        </Typography>
          <div id='legendCheckbox'> 
            <FormGroup sx={{ display: "inline-flex", flexDirection: "row"}}>
              <FormControlLabel control={<Checkbox name='invocationCost' defaultChecked onChange={filterData}/>} label="Invocation Costs" />
              <FormControlLabel control={<Checkbox name='cpuRAMCost' defaultChecked onChange={filterData}/>} label="CPU RAM Costs" />
              <FormControlLabel control={<Checkbox name='cpuGHzCost' defaultChecked onChange={filterData}/>} label="CPU GHz Costs" />
              <FormControlLabel control={<Checkbox name='networkBandwidthCost' defaultChecked onChange={filterData}/>} label="Network Bandwidth Costs" />
              <FormControlLabel control={<Checkbox name='totalCost' defaultChecked onChange={filterData}/>} label="Total Costs" />
            </FormGroup>
          </div>
          {isLoaded ? (<LineChart width={730} height={250} data={filteredDataSeries}
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
          </LineChart>) :
          fetching ? (
            <Box
            sx={{
            width: "auto",
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
              }}>
              <CircularProgress />
            </Typography>
          </Box>) :
          (<Box
            sx={{
            width: "80%",
            height: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFCDD2",
            }}>
            <Typography
              style={{
                display: "flex",
                justifyContent: "center",
                color: "red",
              }}>
              Data not available
            </Typography>
          </Box>)}
      </Box>
    </div>
  );
};

export default ForecastPage;