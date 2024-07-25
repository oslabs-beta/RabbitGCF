import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import Box from "@mui/material/Box";
import DrawerHeader from "../components/DrawerHeader.jsx";
import Typography from "@mui/material/Typography";
import GraphComponent from "../components/ZoomGraph.jsx";
import Skeleton from "@mui/material/Skeleton";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const MetricsPage = (props) => {
  const [functionList, setFunctionList] = useState();
  const [executionCountData, setExecutionCountData] = useState([]);
  const [executionTimeData, setExecutionTimeData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);
  const [networkData, setNetworkData] = useState([]);
  const [selected, setSelected] = useState(false);

  // default function to render
  // const [functionName, setFunctionName] = useState("");

  const [skeleton, setSkeleton] = useState(true);
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
    props.setFunctionName(e.target.value);
    console.log(props.functionName);
  }

  function handleTimeRangeSelect(e) { // adding this functionality
    setTimeRange(e.target.value);
    setSelected(true);
  }

  const projectId = "refined-engine-424416-p7";

  const getFunctionList = async () => {
    try {
      const response = await fetch(
        `/api/metrics/funcs/${projectId}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("functionList: ", data);
      setFunctionList(data.funcList);
      if (data[0] && props.functionName === '') props.setFunctionName(data[0]);
    } catch (error) {
      console.log("Error in getFunctionList: ", error);
    }
  }
  
  // useEffect(() => {
  //   getFunctionList();
  // }, [])

  // useEffect(() => { // added this useEffect
  //   if (selected) {
  //     fetchMetrics();
  //   }
  // }, [selected, timeRange]);

  // const fetchMetrics = () => {
  //   getExecutionCounts();
  //   getExecutionTimes();
  //   getMemoryBytes();
  //   getNetworkEgress();
  //   setSelected(false);
  // }

  const getExecutionCounts = async () => {
    try {
      console.log("execution count reload");
      const response = await fetch(
        `/api/metrics/execution_count/${projectId}?timeRange=${timeRange}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      // test data not available
      // delete data['getCharacters'];
      console.log("executionCount data: ", data);
      setExecutionCountData(data);

    } catch (error) {
      console.log("Error in getExecutionCounts: ", error);
    }
  };

  const getExecutionTimes = async () => {
    try {
      const response = await fetch(
        `/api/metrics/execution_times/${projectId}?timeRange=${timeRange}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("executionTime data: ", data);
      setExecutionTimeData(data);
    } catch (error) {
      console.log("Error in getExecutionTimes: ", error);
    }
  };

  const getMemoryBytes = async () => {
    try {
      const response = await fetch(
        `/api/metrics/user_memory_bytes/${projectId}?timeRange=${timeRange}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("memory data: ", data);
      setMemoryData(data);
    } catch (error) {
      console.log("Error in getMemoryBytes: ", error);
    }
  };

  const getNetworkEgress = async () => {
    try {
      const response = await fetch(
        `/api/metrics/network_egress/${projectId}?timeRange=${timeRange}`, 
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      console.log("egress data: ", data);
      setNetworkData(data);
    } catch (error) {
      console.log("Error in getNetworkEgress: ", error);
    }
  };

  useEffect(() => {
    getFunctionList();
    getExecutionCounts();
    getExecutionTimes();
    getMemoryBytes();
    getNetworkEgress();
    setSkeleton(false);
    setSelected(false);
  }, [timeRange]);

  return (
    <div>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, p: "0px 0px 0px 80px" }}>
        <DrawerHeader />
        <h1>Metrics Page</h1>
        <div>
          <FormControl
            sx={{ m: "auto", minWidth: 80, maxWidth: 175, display: "flex" }}
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Function
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={props.functionName}
              onChange={handleFunctionSelect}
              autoWidth
              label="Function"
            >
              {functionList ? (
                functionList.map((el) => {
                  return (
                    <MenuItem value={el} key={el}>
                      {el}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem value={""}>No Function Found</MenuItem>
              )}
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
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"80%"}
                height={400}
                style={{ margin: "auto" }}
              />
            ) : (
              <Box
                sx={{
                  width: "full",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {executionCountData[props.functionName] ? (
                  <GraphComponent
                    data={executionCountData[props.functionName]}
                    dataKey="value"
                    statusKey="status"
                    label="Execution Count"
              timeRange={timeRange}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "80%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFCDD2",
                    }}
                  >
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                      }}
                    >
                      Data not available
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Typography style={{ display: "flex", justifyContent: "center" }}>
              Execution Time:
            </Typography>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"80%"}
                height={400}
                style={{ margin: "auto" }}
              />
            ) : (
              <Box
                sx={{
                  width: "full",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {executionTimeData[props.functionName] ? (
                  <GraphComponent
                    data={executionTimeData[props.functionName]}
                    dataKey="value"
                    statusKey="status"
                    label="Execution Time (ms)"
                    timeRange={timeRange}

            />
                ) : (
                  <Box
                    sx={{
                      width: "80%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFCDD2",
                    }}
                  >
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                      }}
                    >
                      Data not available
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Typography style={{ display: "flex", justifyContent: "center" }}>
              Memory:
            </Typography>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"80%"}
                height={400}
                style={{ margin: "auto" }}
              />
            ) : (
              <Box
                sx={{
                  width: "full",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {memoryData[props.functionName] ? (
                  <GraphComponent
                    data={memoryData[props.functionName]}
                    dataKey="value"
                    statusKey="status"
                    label="Memory (MB)"
                  timeRange={timeRange}

              />
                ) : (
                  <Box
                    sx={{
                      width: "80%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFCDD2",
                    }}
                  >
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                      }}
                    >
                      Data not available
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Typography style={{ display: "flex", justifyContent: "center" }}>
              Network Egress:
            </Typography>
            {skeleton ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={"80%"}
                height={400}
                style={{ margin: "auto" }}
              />
            ) : (
              <Box
                sx={{
                  width: "full",
                  height: 400,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {networkData[props.functionName] ? (
                  <GraphComponent
                    data={networkData[props.functionName]}
                    dataKey="value"
                    statusKey="status"
                    label="Network Egress (MB)"
                  timeRange={timeRange}

              />
                ) : (
                  <Box
                    sx={{
                      width: "80%",
                      height: 400,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFCDD2",
                    }}
                  >
                    <Typography
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        color: "red",
                      }}
                    >
                      Data not available
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default MetricsPage;
