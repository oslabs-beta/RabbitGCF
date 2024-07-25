import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import Box from '@mui/material/Box';
import DrawerHeader from '../components/DrawerHeader.jsx';
import Typography from '@mui/material/Typography';
import GraphComponent from '../components/ZoomGraph.jsx';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MetricsPage = () => {
  const [executionCountData, setExecutionCountData] = useState([]);
  const [executionTimeData, setExecutionTimeData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  
  const [functionName, setFunctionName] = useState('getCharacters');
  
  const [functionList, setFunctionList] = useState([]);
  const [listLoaded, setListLoaded] = useState(false);

  const [selected, setSelected] = useState(false);
  const [timeRange, setTimeRange] = useState(60);

  const selectTimeframe = [ // adding timeframes & minutes
    { label: "1 hour", value: 60},
    { label: "12 hours", value: 720},
    { label: "1 day", value: 1440},
    { label: "2 days", value: 2880},
    { label: "7 days", value: 10080 },
    { label: "14 days", value: 20160 },
    { label: "30 days", value: 43200 }
  ];

  function handleFunctionSelect(e) {
    setFunctionName(e.target.value);
    console.log(functionName);
    setSelected(true);
  }

  function handleTimeRangeSelect(e) { // adding this functionality
    setTimeRange(e.target.value);
    setSelected(true);
  }

  const projectId = 'refined-engine-424416-p7';

  const getFunctionList = async () => {
    try {
      const response = await fetch(`/api/metrics/funcs/${projectId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      // console.log('functionList: ', data);
      setFunctionList(data);
      setListLoaded(true);
      // adding:
      // if (data.length < 0){
      //   setFunctionName(data[0])
      // }
    } catch (error) {
      console.log('Error in getFunctionList: ', error);
    }
  }
  
  useEffect(() => {
    getFunctionList();
  }, [])

  useEffect(() => { // added this useEffect
    if (selected) {
      fetchMetrics();
    }
  }, [selected, timeRange, functionName]);

  const fetchMetrics = () => {
    getExecutionCounts();
    getExecutionTimes();
    getMemoryBytes();
    getNetworkEgress();
    setSelected(false);
  }

  let dummySwitch = false;

  // dummy switch for fetch requests
  // if(selected) {

  // COMMENTING THIS OUT TO TEST
    // if(dummySwitch) {
    //   useEffect(() => {

    //     fetch('/api/executioncount')
    //       .then(res => {
    //         if (!res.ok) {
    //           throw new Error('Network response was not ok');
    //         };
    //         return res.json();
    //       })
    //       .then(data => setExecutionCountData(data))
    //       .catch(error => console.error('Error fetching runtime data: ', error));

    //     fetch('/api/runtime')
    //       .then(res => {
    //         if (!res.ok) {
    //           throw new Error('Network response was not ok');
    //         };
    //         return res.json();
    //       })
    //       .then(data => setExecutionTimeData(data))
    //       .catch(error => console.error('Error fetching runtime data: ', error));

    //     fetch('/api/memory')
    //       .then(res => {
    //         if (!res.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         return res.json()
    //     })
    //       .then(data => setMemoryData(data))
    //       .catch(error => console.error('Error fetching memory data: ', error));
    //   }, []);
    // } else {
      console.log('real data fetch requests');

      const getExecutionCounts = async () => {
        try {
          console.log('execution count reload')
          const response = await fetch(`/api/metrics/execution_count/${projectId}?timeRange=${timeRange}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          // console.log('executionCount: ', data);
          const noNull = [];
          data.forEach(el => {
            if(el) noNull.push(el);
          })
          // console.log('noNull: ', noNull);
          let countData;
          noNull.forEach(el => {
            if(el.name === functionName) countData = el.points;
          })
          // console.log('countData: ', countData);
          if(!countData) console.log('Empty execution count data');
          setExecutionCountData(countData);

        } catch (error) {
          console.log('Error in getExecutionCounts: ', error);
        }
      }

      const getExecutionTimes = async () => {
        try {
          const response = await fetch(`/api/metrics/execution_times/${projectId}?timeRange=${timeRange}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          // console.log('executionTime: ', data);
          const noNull = [];
          data.forEach(el => {
            if(el) noNull.push(el);
          })
          // console.log('noNull: ', noNull);
          let timeData;
          noNull.forEach(el => {
            if(el.name === functionName) timeData = el.points;
          })
          // console.log(timeData)
          setExecutionTimeData(timeData);
        } catch (error) {
          console.log('Error in getExecutionTimes: ', error);
        }
      }

      const getMemoryBytes = async () => {
        try {
          const response = await fetch(`/api/metrics/user_memory_bytes/${projectId}?timeRange=${timeRange}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          const noNull = [];
          data.forEach(el => {
            if(el) noNull.push(el);
          })
          // console.log('noNull: ', noNull);
          let memData;
          noNull.forEach(el => {
            if(el.name === functionName) memData = el.points;
          })
          // console.log(memData);
          setMemoryData(memData);
        } catch (error) {
          console.log('Error in getMemoryBytes: ', error);
        }
      }
      
      const getNetworkEgress = async () => {
        try {
          const response = await fetch(`/api/metrics/network_egress/${projectId}?timeRange=${timeRange}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log('data', data)
          const noNull = [];
          data.forEach(el => {
            if(el) noNull.push(el);
          })
          // console.log('noNull: ', noNull);
          let egressData;
          noNull.forEach(el => {
            if(el.name === functionName) egressData = el.points;
          })
          // console.log(egressData);
          setNetworkData(egressData);
        } catch (error) {
          console.log('Error in getNetworkEgress: ', error);
        }
      }

      useEffect(() => {
        getExecutionCounts();
        getExecutionTimes();
        getMemoryBytes();
        getNetworkEgress();
      }, [])
    // }
    
  

  // END OF COMMENTING OUT

  



  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Metrics Page</h1>

        <div>
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Function</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={functionName}
              onChange={handleFunctionSelect}
              autoWidth
              label="Function"
            >
              { listLoaded ?
                functionList.map(el => {
                  return <MenuItem value={el} key={el}>{el}</MenuItem>
                }) : null
              }
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {/* <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 'auto', minWidth: 80, maxWidth: 175, display: 'flex'}}>
            <InputLabel id="demo-simple-select-autowidth-label">Timerange</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={timeRange}
              onChange={handleTimeRangeSelect}
              minWidth={80}
              maxWidth={175}
              label="Timerange"
            >
              { 
              selectTimeframe.map(el => (
                  <MenuItem value={el.value} key={el.value}>{el.label}</MenuItem>
              ))
              }
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {/* <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <Typography paragraph>
          These are your metrics:
        </Typography>
        {/* <div className='metrics-container'> */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Execution Count:
            </Typography>
            {/* <Box sx={{bgcolor: '#D4F1F4', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
            <GraphComponent
              data={executionCountData}
              dataKey="value"
              statusKey="status"
              label="Execution Count"
              timeRange={timeRange}
            />         
            {/* </Box> */}
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Execution Time:
            </Typography>
            {/* <Box sx={{bgcolor: '#D4F1F4', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
            <GraphComponent
              data={executionTimeData}
              dataKey="value"
              statusKey="status"
              label="Execution Time (ms)"
              timeRange={timeRange}

            />         
            {/* </Box> */}
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Memory:
            </Typography>
            <GraphComponent
              data={memoryData}
              dataKey="value"
              statusKey="status"
              label="Memory (MB)"
              timeRange={timeRange}

              />           
          </div>
          <div style={{marginBottom: '20px'}}>
            <Typography style={{display: 'flex', justifyContent: 'center'}}>
              Network Egress:
            </Typography>
            <GraphComponent
              data={networkData}
              dataKey="value"
              statusKey="status"
              label="Network Egress (MB)"
              timeRange={timeRange}

              />           
          </div>
              {/* <Box sx={{bgcolor: '#ffe5eb', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ZoomGraph />
              </Box>
            </div>
            <div style={{marginBottom: '20px'}}>
              <Typography>
                Metric 3:
              </Typography>
              <Box sx={{bgcolor: '#D4F1F4', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <DummyGraph />
              </Box>
            </div>
            <div style={{marginBottom: '20px'}}>
              <Typography>
                Metric 4:
              </Typography>
              <Box sx={{bgcolor: '#ffe5eb', width: 550, height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center'}}> */}
            {/* </Box> */}
        </div>
      </Box>
    </div>
  );
};

export default MetricsPage;