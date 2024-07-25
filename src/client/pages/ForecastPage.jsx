import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import { FormGroup, FormControlLabel, Checkbox, TextField, Button, CircularProgress, Skeleton } from '@mui/material';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import gcfPricingStructure from '../../../gcfPricingStructure';
import DropDownField from '../components/DropDownField.jsx';


const ForecastPage = () => {
  const [isLoaded, setLoaded] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [fetching, setFetching] = useState(false);

  const [invalidIncrements, setInvalidIncrements] = useState('');
  const [invalidMaxInc, setInvalidMaxInc] = useState('');
  const [incrementsInput, setIncrementsInput] = useState();
  const [maxIncInput, setMaxIncInput] = useState();

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
    invocations: true,
    networkBandwidthCost: true,
    totalCost: true
  });
  
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

      setfuncList(data.funcList);
      setConfigurations(data.configurations);
      setSelectedFunc(data.funcList[0]);
      updateFields('Function', data.funcList[0], data.configurations);
      setSkeleton(false);
      
    } catch (error) {
      console.log('Error in getFunctionList: ', error);
    }
  }

  useEffect(() => {
    getFunctionList();
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
        break;
    }
  }

  const handleOptionChange = (e) => {
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

  const validateInput = (e) => {
    switch (e.target.id) {
      case 'incrementsInput':
        setIncrementsInput(e.target.value);
        (isNaN(e.target.value)) ? setInvalidIncrements('Must be a number') : setInvalidIncrements('');
        break;
      case 'maxIncInput':
        setMaxIncInput(e.target.value);
        (isNaN(e.target.value)) ? setInvalidMaxInc('Must be a number') : setInvalidMaxInc('');
        break;
      default:
        break;
    }
      
  }

  const forecastSubmit = () => {
    setFetching(true);
    console.log('forecast button clicked');
    const forecastArgs = {
      functionName: document.getElementsByName('Function')[0].value,
      type: document.getElementsByName('Type')[0].value,
      region: document.getElementsByName('Region')[0].value,
      generation: document.getElementsByName('GCF-Generation')[0].value,
      increments: Number(document.getElementById('incrementsInput').value),
      maxIncrements: Number(document.getElementById('maxIncInput').value),      
    }
    if(invalidIncrements || invalidMaxInc) {
      alert('Please fix errors in text fields before submitting');
      setFetching(false);
      return;
    }
    try {
      fetch(`api/forecast/${projectId}`,{
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
          }
        })
        .then(response => {
          console.log('fetched data ==>',response);
          setDataSeries(response);
          setFilteredDataSeries(response);
          setFetching(false);
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
        <Box display={'flex'} sx={{ flexDirection: 'column' }}>
          <Box display={'inline-flex'} marginBottom={2}>
            <Box marginRight={1}>
              {skeleton ? 
                <Skeleton variant='rounded' animation='wave' width={175} height={56}/>:
                <DropDownField
                  fieldType={'Function'}
                  optionsList={funcList}
                  selected={selectedFunc}
                  handleOptionChange={handleOptionChange}
                />
              }
            </Box>
            <Box marginRight={1}>
              {skeleton ? 
                <Skeleton variant='rounded' animation='wave' width={175} height={56}/> :
                selectedType && <DropDownField
                  fieldType={'Type'}
                  optionsList={Object.keys(gcfPricingStructure.gcfTypes)}
                  selected={selectedType}
                  handleOptionChange={handleOptionChange}
                />
              }
            </Box>
            <Box marginRight={1}>
              {skeleton ? 
                <Skeleton variant='rounded' animation='wave' width={175} height={56}/> :
                selectedType && <DropDownField
                  fieldType={'Region'}
                  optionsList={Object.keys(gcfPricingStructure.gcfRegionTiers)}
                  selected={selectedRegion}
                  handleOptionChange={handleOptionChange}
                />
              }
            </Box>
            <Box marginRight={1}>
              {skeleton ? 
                <Skeleton variant='rounded' animation='wave' width={175} height={56}/> :
                selectedType && <DropDownField
                  fieldType={'GCF-Generation'}
                  optionsList={generationOptions}
                  selected={selectedGen}
                  handleOptionChange={handleOptionChange}
                />
              }
            </Box>
          </Box>
          <Box display={'inline-flex'}>
            <Box marginRight={1}>
              { invalidIncrements ? <TextField
                error={invalidIncrements}
                id="incrementsInput"
                label="Increments Error"
                defaultValue={500000}
                helperText="Must be a number"
                variant="filled"
                onChange={validateInput}
              /> : 
              <TextField
                id="incrementsInput"
                label="Increments"
                defaultValue={500000}
                variant="filled"
                onChange={validateInput}
              />}               
            </Box>
            <Box marginRight={1}>
              {invalidMaxInc ? 
                <TextField
                  error={invalidMaxInc}
                  id="maxIncInput"
                  label="Max Increments Error"
                  defaultValue={5}
                  helperText="Must be a number"
                  variant="filled"
                  onChange={validateInput}
                /> :
                <TextField id="maxIncInput" label="Max Increments" variant="filled" defaultValue={5} onChange={validateInput}/>
              }
            </Box>
            <Box margin={1}><Button onClick={forecastSubmit} variant="contained">Submit</Button></Box>
          </Box>
        </Box>
        <Box margin={1} marginTop={3}>
          <Typography variant='h6' color={'000000'} marginBlock={2}>
            This is your forecast
          </Typography>
            <Box id='legendCheckbox' marginBottom={2}> 
              <FormGroup sx={{ display: "inline-flex", flexDirection: "row"}}>
                <FormControlLabel control={<Checkbox name='invocationCost' defaultChecked onChange={filterData}/>} label="Invocation Costs" />
                <FormControlLabel control={<Checkbox name='cpuRAMCost' defaultChecked onChange={filterData}/>} label="CPU RAM Costs" />
                <FormControlLabel control={<Checkbox name='cpuGHzCost' defaultChecked onChange={filterData}/>} label="CPU GHz Costs" />
                <FormControlLabel control={<Checkbox name='networkBandwidthCost' defaultChecked onChange={filterData}/>} label="Network Bandwidth Costs" />
                <FormControlLabel control={<Checkbox name='totalCost' defaultChecked onChange={filterData}/>} label="Total Costs" />
              </FormGroup>
            </Box>
            {isLoaded ? (<LineChart width={730} height={250} data={filteredDataSeries}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="invocations" label={{ value: '# of Invocations', offset: 0, position: 'bottom'}}/>
              <YAxis label={{ value: '$ dollars', angle: -90, position: 'insideLeft' }}/>
              <Tooltip />
              <Legend wrapperStyle={{position: 'relative', marginTop: '20px'}}/>
              <Line type="monotone" dataKey="invocationCost" stroke="#8884d8" />
              <Line type="monotone" dataKey="cpuRAMCost" stroke="#82ca9d" />
              <Line type="monotone" dataKey="cpuGHzCost" stroke="#38E4FF" />
              <Line type="monotone" dataKey="networkBandwidthCost" stroke="#900C3F" />
              <Line type="monotone" dataKey="totalCost" stroke="#B138FF" />
            </LineChart>) :
            fetching ? (
              <Box
              sx={{
              width: 730,
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              }}>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center"
                }}>
                <CircularProgress />
              </Typography>
            </Box>) :
            (<Box
              sx={{
              width: 730,
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#c0c0c0",
              }}>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "black",
                }}>
                Data not available
              </Typography>
            </Box>)}
        </Box>
      </Box>
    </div>
  );
};

export default ForecastPage;