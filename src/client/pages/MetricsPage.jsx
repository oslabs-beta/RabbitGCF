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
  const [functionName, setFunctionName] = useState('addCharacter');
  // const [functionList, setFunctionList] = useState([]);
  // const [selected, setSelected] = useState(false);
  // const [listLoaded, setListLoaded] = useState(false);

  // function handleFunctionSelect(e) {
  //   setFunctionName(e.target.value);
  //   console.log(functionName);
  //   setSelected(true);
  // }

  const projectId = 'refined-engine-424416-p7';

  // const getFunctionList = async () => {
  //   try {
  //     const response = await fetch(`/api/metrics/funcs/${projectId}`, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     setFunctionList(data['funcNames']);
  //     setListLoaded(true);
  //   } catch (error) {
  //     console.log('Error in getFunctionList: ', error);
  //   }
  // }
  
  // useEffect(() => {
  //   getFunctionList();
  // }, [])

  let dummySwitch = true;

  // dummy switch for fetch requests
  // if(selected) {
    if(dummySwitch) {
      useEffect(() => {

        fetch('/api/executioncount')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            };
            return res.json();
          })
          .then(data => setExecutionCountData(data))
          .catch(error => console.error('Error fetching runtime data: ', error));

        fetch('/api/runtime')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            };
            return res.json();
          })
          .then(data => setExecutionTimeData(data))
          .catch(error => console.error('Error fetching runtime data: ', error));

        fetch('/api/memory')
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json()
        })
          .then(data => setMemoryData(data))
          .catch(error => console.error('Error fetching memory data: ', error));
      }, []);
    } else {
      console.log('real data fetch requests');
      // const projectId = 'refined-engine-424416-p7';

      const getExecutionCounts = async () => {
        try {
          const response = await fetch(`/api/metrics/execution_count/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          // console.log(data);
          const noNull = [];
          data['execution_count'].forEach(el => {
            if(el) noNull.push(el);
          })
          // console.log(noNull);
          let countData;
          noNull.forEach(el => {
            if(el.name === functionName) countData = el.points;
          })
          // console.log(countData);
          setExecutionCountData(countData);
        } catch (error) {
          console.log('Error in getExecutionCounts: ', error);
        }
      }

      const getExecutionTimes = async () => {
        try {
          const response = await fetch(`/api/metrics/execution_times/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log(data);
          setExecutionTimeData(data);
        } catch (error) {
          console.log('Error in getExecutionTimes: ', error);
        }
      }

      const getMemoryBytes = async () => {
        try {
          const response = await fetch(`/api/metrics/user_memory_bytes/${projectId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json();
          console.log(data);
          setMemoryData(data);
        } catch (error) {
          console.log('Error in getMemoryBytes: ', error);
        }
      }

      useEffect(() => {
        getExecutionCounts();
        // getExecutionTimes();
        // getMemoryBytes();
      }, [])
    }
  // }


  return(
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: '0px 0px 0px 80px'}}>
        <DrawerHeader />
        <h1>Metrics Page</h1>

        {/* <div>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
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
                  return <MenuItem>{el}</MenuItem>
                }) : null
              }
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select>
          </FormControl>
        </div> */}

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