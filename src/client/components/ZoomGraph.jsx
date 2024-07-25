// import React, { PureComponent } from 'react';
// import {
//   LineChart, 
//   Legend, 
//   Line, 
//   CartesianGrid, 
//   XAxis, 
//   YAxis, 
//   Tooltip, 
//   ReferenceArea, 
//   ResponsiveContainer
// } from 'recharts';
// import '../css/dummyGraph.css';

// const CustomizedDot = (props) => {
//   const { cx, cy, value } = props;
//   if (value > 0) {
//     return (
//       <circle cx={cx} cy={cy} r={3} fill="#ffffff" stroke="#8884d8" strokeWidth={1} />
//     );
//   }
//   return null;
// }

// class GraphComponent extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       refAreaLeft: '',
//       refAreaRight: '',
//       zoomedData: null,
//       disableAnimation: false,
//     };
//   }

//   generateTimeIntervals = (start, end, interval) => {
//     const timeIntervals = [];
//     let current = new Date(start);

//     while (current <= end) {
//       timeIntervals.push(new Date(current));
//       current.setMinutes(current.getMinutes() + interval);
//     }

//     return timeIntervals;
//   };

//   fillDataGaps = (data, interval) => {
//     if (!data || data.length === 0) {
//       return [];
//     }
  
//     // Flatten data and handle cases where points might not be present
//     const points = data.flatMap(d => d.points || 
//       (d.timestamp && d.value ? [{ timestamp: d.timestamp, value: d.value }] : [])
//     );
  
//     if (points.length === 0) {
//       console.warn('No data points found');
//       return [];
//     }
  
//     const start = new Date(points[0].timestamp);
//     const end = new Date(points[points.length - 1].timestamp);
//     const timeIntervals = this.generateTimeIntervals(start, end, interval);
  
//     const filledData = timeIntervals.map(time => {
//       const existingPoint = points.find(point => new Date(point.timestamp).getTime() === time.getTime());
//       return existingPoint || { timestamp: time.toISOString(), value: 0 };
//     });
  
//     return filledData;
//   };
  


//   // click and drag zoom functionality
//   zoom = () => {
//     let { refAreaLeft, refAreaRight } = this.state;
//     const { data } = this.props;

//     if (refAreaLeft === refAreaRight || refAreaRight === '') {
//       this.setState({ refAreaLeft: '', refAreaRight: '' });
//       return;
//     }

//     if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

//     // const zoomedData = data.filter(d => d.timestamp >= refAreaLeft && d.timestamp <= refAreaRight);
//     // const zoomedData = data.flatMap(d => d.points).filter(d => new Date(d.timestamp).getTime() >= new Date(refAreaLeft).getTime() && new Date(d.timestamp).getTime() <= new Date(refAreaRight).getTime());

//       // Flatten data points and filter based on zoom area
//       const allDataPoints = data;


//   if (!allDataPoints.length) {
//     console.warn('No data points available for zoom');
//     return;
//   }

//   const zoomedData = allDataPoints.filter(d =>
//     new Date(d.timestamp).getTime() >= new Date(refAreaLeft).getTime() &&
//     new Date(d.timestamp).getTime() <= new Date(refAreaRight).getTime()
//   );
//     this.setState({
//       refAreaLeft: '',
//       refAreaRight: '',
//       zoomedData,
//       disableAnimation: true,
//     });
//   };

//   zoomOut = () => {
//     this.setState({ 
//       zoomedData: null, 
//       refAreaLeft: '', 
//       refAreaRight: '', 
//       disableAnimation: false, 
//     });
//   };

//   render() {
//     const { data, dataKey, label, timeRange } = this.props;
//     console.log("data => ", data);
//     console.log('Data points:', data.flatMap(d => d.points || []));
//     data.forEach((item, index) => {
//       console.log(`Item ${index}:`, item);
//       console.log(`Points ${index}:`, item.points);
//     });
    
//     // console.log("dataKey => ", dataKey);
//     // console.log("label => ", label);
//     const { refAreaLeft, refAreaRight, zoomedData, disableAnimation } = this.state;
//     if (!data || data.length === 0) {
//       console.error('Data is undefined or empty', data);
//       return <div>No data available</div>;
//     }
//     // const chartData = zoomedData || data;
//     const allDataPoints = data.flatMap(d => d.points || 
//       (d.timestamp && d.value ? [{ timestamp: d.timestamp, value: d.value }] : [])
//     );
    
//     if (allDataPoints.length === 0) {
//       console.warn('No data points found');
//       return <div>No data points available</div>;
//     }
//     const chartData = zoomedData || allDataPoints;
//     const interval = 1; // Define the interval in minutes
//     const filledChartData = this.fillDataGaps(chartData, interval).map(entry => ({
//       ...entry,
//       timestamp: new Date(entry.timestamp)
//     }));

//     const formatXAxis = (tickItem) => {
//       const date = new Date(tickItem);
//       switch (timeRange) {
//         case 60: // Last hour
//           return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         case 1440: // Last day
//           return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         case 43200: // Last month
//           return date.toLocaleDateString();
//         default: // Other cases
//           return date.toLocaleString();
//       }
//     };
  
//     // Calculate the start time based on the selected timeRange
//     const endTime = Date.now();
//     const startTime = endTime - timeRange * 60 * 1000;

// //     const startTimeBeginningOfDay = new Date(data.startTime).setHours(0, 0, 0, 0);
// // const firstTickDate = new Date(startTimeBeginningOfDay);

// // const ticks = [
// //   startTimeBeginningOfDay,
// //   firstTickDate.setHours(6, 0, 0, 0),
// //   firstTickDate.setHours(12, 0, 0, 0),
// //   firstTickDate.setHours(18, 0, 0, 0),
// //   firstTickDate.setHours(23, 59, 0, 0)
// // ];

//     // const ticks = [];
//     // if (chartData.length !== 0) {
//     //   const startTime = new Date(chartData[0].timestamp);
//     //   const endTime = new Date(chartData[chartData.length - 1].timestamp);

//     //   // Reset the start time to the nearest even hour for consistent ticks
//     //   startTime.setMinutes(0, 0, 0);
//     //   startTime.setHours(Math.floor(startTime.getHours() / 2) * 2);

//     //   for (let time = new Date(startTime); time <= endTime; time.setHours(time.getHours() + 2)) {
//     //     ticks.push(time.getTime());
//     //   }
//     // }

//     // Formatter function for XAxis ticks
//     // const tickFormatter = (timestamp) => {
//     //   const date = new Date(timestamp);
//     //   const hours = date.getHours();
//     //   const minutes = date.getMinutes();
//     //   const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;

//     //   // Include date if the hour is past midnight
//     //   if (hours === 0 || hours < new Date(chartData[0].timestamp).getHours()) {
//     //     return `${formattedTime} - ${date.toLocaleDateString()}`;
//     //   } else {
//     //     return formattedTime;
//     //   }
//     // };

//     return (
//       <div className="chart-container" style={{ width: '90%', height: 400, marginBottom: '40px' }}>
//         <button type="button" onClick={this.zoomOut}>Zoom Out</button>
//         <ResponsiveContainer>
//           <LineChart
//             data={filledChartData}
//             onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
//             onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
//             onMouseUp={this.zoom}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="timestamp"
//               scale="time"
//               domain={[startTime, endTime]}
//               tickFormatter={formatXAxis}
//               type="number"
              
//                   // ticks={ticks}
//                   // interval={30}
//                   // domain={['auto', 'auto']}
//                   // type="time"
//                   // tickCount={24}
//                   // domain={['auto', 'auto']}

//                   // tickFormatter={(timestamp) => new Date(timestamp).toLocaleString()} // Format the timestamp
//             />
//             <YAxis scale="auto" tickCount={5} />
//             <Tooltip labelFormatter={label => new Date(label).toString()} />
//             <Legend
//               payload={[
//             { value: label, type: 'line', color: '#8884d8', name: label },
//             ]}
//             />
//             <Line type="linear" dataKey={dataKey} dot={<CustomizedDot />} stroke="#8884d8" animationDuration={disableAnimation ? 0 : 1000} />
//             {refAreaLeft && refAreaRight ? (
//               <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
//             ) : null}
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }
// }

// export default GraphComponent;


import React, { PureComponent } from 'react';
import {
  LineChart, 
  Legend, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceArea, 
  ResponsiveContainer
} from 'recharts';
import '../css/dummyGraph.css';

const CustomizedDot = (props) => {
  const { cx, cy, value } = props;
  if (value > 0) {
    return (
      <circle cx={cx} cy={cy} r={3} fill="#ffffff" stroke="#8884d8" strokeWidth={1} />
    );
  }
  return null;
}

class GraphComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      zoomedData: null,
      disableAnimation: false,
      // filledData: [],
    };
  }

  // componentDidMount() {
  //   // Fill data gaps when the component mounts
  //   const { data, timeRange } = this.props;
  //   const interval = 1;
  //   const filledData = this.fillDataGaps(data, interval);
  //   this.setState({ filledData });
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.data !== this.props.data || prevProps.timeRange !== this.props.timeRange) {
  //     const { data, timeRange } = this.props;
  //     const interval = 1;
  //     const filledData = this.fillDataGaps(data, interval);
  //     this.setState({ filledData });
  //   }
  // }

  // Helper function to normalize timestamps
  normalizeTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString();
  };

  // Helper function to generate time intervals
  generateTimeIntervals = (start, end, interval) => {
    console.log('Generating time intervals from', start, 'to', end, 'with interval', interval);
    const timeIntervals = [];
    let current = new Date(start);

    while (current <= end) {
      timeIntervals.push(this.normalizeTimestamp(current.toISOString()));
      current.setMinutes(current.getMinutes() + interval);
    }

    console.log('Generated intervals:', timeIntervals);
    return timeIntervals;
  };

  // Function to fill gaps in data
  fillDataGaps = (data, interval) => {
    console.log('Filling data gaps with interval:', interval);
    if (!data || data.length === 0) {
      console.warn('No data provided for filling gaps');
      return [];
    }
  
    // Flatten data and handle cases where points might not be present
    const points = data.flatMap(d => d.points || 
      (d.timestamp && d.value ? [{ timestamp: d.timestamp, value: d.value }] : [])
    );
  
    if (points.length === 0) {
      return [];
    }
  
    // Determine the time range based on the full expected range
    const end = new Date(); // End time is now
    const start = new Date(end.getTime() - this.props.timeRange * 60 * 1000); // Calculate based on timeRange
    // end.setSeconds(0,0);
    // start.setSeconds(0,0);
    console.log('Time Range Start:', start.toISOString());
    console.log('Time Range End:', end.toISOString());
  
    const timeIntervals = this.generateTimeIntervals(start, end, interval);
  
    // const maxIntervals = 10000; // Set a limit to avoid performance issues
    // if (timeIntervals.length > maxIntervals) {
    //   console.warn(`Too many intervals generated: ${timeIntervals.length}`);
    //   return [];
    // }
  
    const filledData = timeIntervals.map(time => {
      const existingPoint = points.find(point => new Date(point.timestamp).getTime() === new Date(time).getTime());
      return existingPoint || { timestamp: time, value: 0 };
    });
  
    // console.log('Filled data:', filledData);
    return filledData;
  };

  // trying to figure out more normal ticks
  getIntervalForTimeRange = (timeRange) => {
    // console.log('Calculating interval for timeRange:', timeRange);
    if (timeRange <= 60) { // Last hour
      return 5; // 5-minute intervals
    } else if (timeRange <= 1440) { // Last day
      return 60; // 60-minute (1-hour) intervals
    } else if (timeRange <= 43200) { // Last month
      return 1440; // 1440-minute (1-day) intervals
    } else { // Longer periods
      return 10080; // 10080-minute (1-week) intervals
    }
  };

  zoom = () => {
    let { refAreaLeft, refAreaRight } = this.state;
    const { filledData } = this.state;
    console.log("filledData => ", filledData);

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState({ refAreaLeft: '', refAreaRight: '' });
      return;
    }

    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const zoomedData = filledData.filter(
      (d) =>
        new Date(d.timestamp).getTime() >= new Date(refAreaLeft).getTime() &&
        new Date(d.timestamp).getTime() <= new Date(refAreaRight).getTime()
    );

    this.setState({
      refAreaLeft: '',
      refAreaRight: '',
      zoomedData,
      disableAnimation: true,
    });
  };


  zoomOut = () => {
    console.log('Zooming out');
    this.setState({ 
      zoomedData: null, 
      refAreaLeft: '', 
      refAreaRight: '', 
      disableAnimation: false, 
    });
  };

  render() {
    const { data, dataKey, label, timeRange } = this.props;
    const { refAreaLeft, refAreaRight, zoomedData, disableAnimation, filledData } = this.state;

    console.log('Current data:', data);
    console.log('Time range:', timeRange);

    // if (!data || data.length === 0) {
    //   console.error('Data is undefined or empty', data);
    //   return <div>No data available</div>;
    // }

    const allDataPoints = data.flatMap(d => d.points || 
      (d.timestamp && d.value ? [{ timestamp: d.timestamp, value: d.value }] : [])
    );

    // console.log('All data points:', allDataPoints);

    // if (allDataPoints.length === 0) {
    //   console.warn('No data points found');
    //   return <div>No data points available</div>;
    // }

    const interval = 1;
    // console.log('Interval:', interval);

    const filledChartData = this.fillDataGaps(zoomedData || allDataPoints, interval).map(entry => ({
      ...entry,
      timestamp: new Date(entry.timestamp).getTime()
    }));

    // console.log('Filled chart data:', filledChartData);
    // formatting for time and days, but should format for more "round" times
    const formatXAxis = (tickItem) => {
      const date = new Date(tickItem);
      if (timeRange <= 60) { // Last hour
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (timeRange <= 1440) { // Last day
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (timeRange <= 43200) { // Last month
        return date.toLocaleDateString();
      } else { // Longer periods
        return date.toLocaleDateString();
      }
    };

    const endTime = Date.now();
    const startTime = endTime - timeRange * 60 * 1000;
    // console.log('Filled chart data:', filledChartData.map(d => ({
    //   ...d,
    //   timestamp: new Date(d.timestamp).toLocaleString()
    // })));
    
    // console.log('Start Time:', new Date(startTime).toLocaleString());
    // console.log('End Time:', new Date(endTime).toLocaleString());
    
    // console.log('Interval:', interval);
    // console.log('Current data:', data.map(d => ({
    //   timestamp: new Date(d.timestamp).toLocaleString(),
    //   value: d.value
    // })));
    
    return (
      <div className="chart-container" style={{ width: '90%', height: 400, marginBottom: '40px' }}>
        <button type="button" onClick={this.zoomOut}>Zoom Out</button>
        <ResponsiveContainer>
          <LineChart
            data={filledChartData}
            onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
            onMouseUp={this.zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              scale="time"
              domain={[startTime, endTime]}
              tickFormatter={formatXAxis}
              type="number"
            />
            <YAxis scale="auto" tickCount={5} />
            <Tooltip labelFormatter={label => new Date(label).toString()} />
            <Legend
              payload={[
                { value: label, type: 'line', color: '#8884d8', name: label },
              ]}
            />
            <Line type="linear" dataKey={dataKey} dot={<CustomizedDot />} stroke="#8884d8" animationDuration={disableAnimation ? 0 : 1000} />
            {refAreaLeft && refAreaRight ? (
              <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default GraphComponent;
