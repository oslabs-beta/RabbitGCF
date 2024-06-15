// import "../css/dummyGraph.css";
// import React, { Component } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
//   Brush,
//   ReferenceLine,
//   Tooltip,
//   ReferenceArea
// } from "recharts";

// // we will want a function that converts real data
// // into an array of objects
// // 1 data point = 1 object
// // we should have a data state hook outside of this func
// // data, setData
// // we also should have variables set to data.time, data.memory, data.runtime
// // inside func, an empty array
// // loop through our data
// // push into our array data.time[i] & data.memory[i] & data.runtime[i]
// // set our state data 

// // const initialData = [
// //   { name: 1, cost: 4.11, impression: 100 },
// //   { name: 2, cost: 2.39, impression: 120 },
// //   { name: 3, cost: 1.37, impression: 150 },
// //   { name: 4, cost: 1.16, impression: 180 },
// //   { name: 5, cost: 2.29, impression: 200 },
// //   { name: 6, cost: 3, impression: 499 },
// //   { name: 7, cost: 0.53, impression: 50 },
// //   { name: 8, cost: 2.52, impression: 100 },
// //   { name: 9, cost: 1.79, impression: 200 },
// //   { name: 10, cost: 2.94, impression: 222 },
// //   { name: 11, cost: 4.3, impression: 210 },
// //   { name: 12, cost: 4.41, impression: 300 },
// //   { name: 13, cost: 2.1, impression: 50 },
// //   { name: 14, cost: 8, impression: 190 },
// //   { name: 15, cost: 0, impression: 300 },
// //   { name: 16, cost: 9, impression: 400 },
// //   { name: 17, cost: 3, impression: 200 },
// //   { name: 18, cost: 2, impression: 50 },
// //   { name: 19, cost: 3, impression: 100 },
// //   { name: 20, cost: 7, impression: 100 }
// // ];

// const getAxisYDomain = (
//   from,
//   to,
//   ref,
//   offset,
//   data
// ) => {
//   const refData = data.slice(from - 1, to);
//   let [bottom, top] = [refData[0][ref], refData[0][ref]];

//   refData.forEach((d) => {
//     if (d[ref] > top) top = d[ref];
//     if (d[ref] < bottom) bottom = d[ref];
//   });

//   return [(bottom | 0) - offset, (top | 0) + offset];
// };

// const initialState = {
//   data: data,
//   left: "dataMin",
//   right: "dataMax",
//   refAreaLeft: "",
//   refAreaRight: "",
//   top: "dataMax+1",
//   bottom: "dataMin-1",
//   top2: "dataMax+20",
//   bottom2: "dataMin-20",
//   animation: true
// };

// export default class GraphComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = initialState;
//   }

//   zoom() {
//     let { refAreaLeft, refAreaRight } = this.state;
//     const { data } = this.state;

//     if (refAreaLeft === refAreaRight || refAreaRight === "") {
//       this.setState(() => ({
//         refAreaLeft: "",
//         refAreaRight: ""
//       }));
//       return;
//     }

//     // xAxis domain
//     if (refAreaLeft > refAreaRight)
//       [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

//     // yAxis domain
//     const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1);
//     const [bottom2, top2] = getAxisYDomain(
//       refAreaLeft,
//       refAreaRight,
//       "impression",
//       50
//     );

//     this.setState(() => ({
//       refAreaLeft: "",
//       refAreaRight: "",
//       data: data.slice(),
//       left: refAreaLeft,
//       right: refAreaRight,
//       bottom,
//       top,
//       bottom2,
//       top2
//     }));
//   }

//   zoomOut() {
//     const { data } = this.state;
//     this.setState(() => ({
//       data: data.slice(),
//       refAreaLeft: "",
//       refAreaRight: "",
//       left: "dataMin",
//       right: "dataMax",
//       top: "dataMax+1",
//       bottom: "dataMin",
//       top2: "dataMax+50",
//       bottom2: "dataMin+50"
//     }));
//   }

//   render() {
//     const {
//       data,
//       left,
//       right,
//       refAreaLeft,
//       refAreaRight,
//       top,
//       bottom,
//       top2,
//       bottom2
//     } = this.state;

//     console.log(this.state);

//     return (
//       <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
//         <button
//           type="button"
//           className="btn update"
//           onClick={this.zoomOut.bind(this)}
//         >
//           Zoom Out
//         </button>

//         <LineChart
//           width={800}
//           height={400}
//           data={data}
//           onMouseDown={(e) =>
//             this.setState({ refAreaLeft: e.activeLabel })
//           }
//           onMouseMove={(e) =>
//             this.state.refAreaLeft &&
//             this.setState({ refAreaRight: e.activeLabel })
//           }
//           // eslint-disable-next-line react/jsx-no-bind
//           onMouseUp={this.zoom.bind(this)}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             allowDataOverflow
//             dataKey="name"
//             domain={[left, right]}
//             type="number"
//           />
//           <YAxis
//             allowDataOverflow
//             domain={[bottom, top]}
//             type="number"
//             yAxisId="1"
//           />
//           <YAxis
//             orientation="right"
//             allowDataOverflow
//             domain={[bottom2, top2]}
//             type="number"
//             yAxisId="2"
//           />
//           <Tooltip />
//           <Line
//             yAxisId="1"
//             type="natural"
//             dataKey="cost"
//             stroke="#8884d8"
//             animationDuration={300}
//           />
//           <Line
//             yAxisId="2"
//             type="natural"
//             dataKey="impression"
//             stroke="#82ca9d"
//             animationDuration={300}
//           />

//           {refAreaLeft && refAreaRight ? (
//             <ReferenceArea
//               yAxisId="1"
//               x1={refAreaLeft}
//               x2={refAreaRight}
//               strokeOpacity={0.3}
//             />
//           ) : null}
//         </LineChart>
//       </div>
//     );
//   }
// }


import "../css/dummyGraph.css";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
  Tooltip,
  ReferenceArea
} from "recharts";

const getAxisYDomain = (data, from, to, key, offset) => {
  const refData = data.slice(from -1, to);
  let [bottom, top] = [refData[0][key], refData[0][key]];

  refData.forEach(d => {
    if (d[key] > top) top = d[key];
    if (d[key] < bottom) bottom = d[key];
  });

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const GraphComponent = ({ data, dataKey, statusKey, label }) => {
  const [zoomState, setZoomState] = useState({
    refAreaLeft: "",
    refAreaRight: "",
    left: "dataMin",
    right: "dataMax",
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+20", // added
    bottom2: "dataMin-20", // added
    animation: true // added
  });

  const { refAreaLeft, refAreaRight, left, right, top, bottom } = zoomState;

  const zoom = () => {
    if (refAreaLeft === refAreaRight || !refAreaRight) {
      setZoomState({
        ...zoomState,
        refAreaLeft: "",
        refAreaRight: ""
      });
      return;
    }

    // Find indices for slicing the data
    const newLeftIndex = Math.max(data.findIndex(d => d.timestamp === refAreaLeft), 0);
    const newRightIndex = Math.min(data.findIndex(d => d.timestamp === refAreaRight), data.length - 1);

    if (newLeftIndex >= newRightIndex) {
      setZoomState({
        ...zoomState,
        refAreaLeft: "",
        refAreaRight: ""
      });
      return;
    }

  //   // Get new Y-axis domain
    const [newBottom, newTop] = getAxisYDomain(data, newLeftIndex, newRightIndex, dataKey, 1);

    setZoomState({
      refAreaLeft: "",
      refAreaRight: "",
      left: data[newLeftIndex].timestamp,
      right: data[newRightIndex].timestamp,
      top: newTop,
      bottom: newBottom,
    });
  };
//   let { refAreaLeft, refAreaRight } = this.zoomState;
//   const { data } = this.zoomState;

//   if (refAreaLeft === refAreaRight || refAreaRight === "") {
//     this.setZoomState(() => ({
//       refAreaLeft: "",
//       refAreaRight: ""
//     }));
//     return;
//   }

//   // xAxis domain
//   if (refAreaLeft > refAreaRight)
//     [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

//   // yAxis domain
//   const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, "cost", 1);
//   const [bottom2, top2] = getAxisYDomain(
//     refAreaLeft,
//     refAreaRight,
//     "impression",
//     50
//   );

//   this.setZoomState(() => ({
//     refAreaLeft: "",
//     refAreaRight: "",
//     data: data.slice(),
//     left: refAreaLeft,
//     right: refAreaRight,
//     bottom,
//     top,
//     bottom2,
//     top2
//   }));
// }

  const zoomOut = () => {
    setZoomState({
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin-1",
    });
  };

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none" }}>
      <button
        type="button"
        className="btn update"
        onClick={zoomOut}
      >
        Zoom Out
      </button>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onMouseDown={(e) => e && setZoomState({ ...zoomState, refAreaLeft: e.activeLabel })}
          onMouseMove={(e) => e && zoomState.refAreaLeft && setZoomState({ ...zoomState, refAreaRight: e.activeLabel })}
          onMouseUp={zoom}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" domain={[left, right]} />
          <YAxis domain={[bottom, top]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            name={label}
            stroke="#8884d8"
            dot={(dataPoint) =>
              dataPoint[statusKey] === 'error'
                ? { r: 5, fill: 'red' }
                : false
            }
          />
          <Brush />
          <ReferenceLine y={0} stroke="#000" />
          {refAreaLeft && refAreaRight && (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphComponent;


