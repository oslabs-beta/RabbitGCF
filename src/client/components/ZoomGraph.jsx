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
};


class GraphComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      zoomedData: null,
      disableAnimation: false,
      filledData: []
    };
  }

  componentDidMount() {
    this.updateFilledData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data || prevProps.timeRange !== this.props.timeRange) {
      this.updateFilledData();
    }
  }

  updateFilledData() {
    const { data, timeRange } = this.props;
    const interval = 60000;
    const filledData = this.fillDataGaps(data, interval);
    this.setState({ filledData });
  }

  normalizeTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.toISOString();
  };

  generateTimeIntervals = (start, end, interval) => {
    const timeIntervals = [];
    let current = new Date(start);

    while (current <= end) {
      timeIntervals.push(this.normalizeTimestamp(current));
      current = new Date(current.getTime() + interval);
    }
    return timeIntervals;
  };

  fillDataGaps = (data, interval = 60000) => {
    if (!data || data.length === 0) {
      return [];
    }

    const points = data.flatMap(d => d.points || 
      (d.timestamp && d.value ? [{ timestamp: new Date(d.timestamp).toISOString(), value: d.value }] : [])
    );

    if (points.length === 0) {
      return [];
    }

    const end = new Date();
    const start = new Date(end.getTime() - this.props.timeRange * 60 * 1000);

    const timeIntervals = this.generateTimeIntervals(start, end, interval);

    return timeIntervals.map(time => {
      const existingPoint = points.find(point => new Date(point.timestamp).getTime() === new Date(time).getTime());
      return existingPoint || { timestamp: time, value: 0 };
    });
  };

  zoom = () => {
    const { refAreaLeft, refAreaRight, filledData } = this.state;
  
    if (!refAreaLeft || !refAreaRight) {
      return;
    }
  
    let refAreaLeftTimestamp = new Date(refAreaLeft).getTime();
    let refAreaRightTimestamp = new Date(refAreaRight).getTime();
  
    if (refAreaLeftTimestamp > refAreaRightTimestamp) {
      [refAreaLeftTimestamp, refAreaRightTimestamp] = [refAreaRightTimestamp, refAreaLeftTimestamp];
    }
  
    const zoomedData = filledData.filter(d => {
      const dataPointTimestamp = new Date(d.timestamp).getTime();
      return dataPointTimestamp >= refAreaLeftTimestamp && dataPointTimestamp <= refAreaRightTimestamp;
    }).map(d => ({
      ...d,
      timestamp: new Date(d.timestamp).getTime(),
    }));
  
    this.setState({
      refAreaLeft: '',
      refAreaRight: '',
      zoomedData,
      disableAnimation: true,
    });
  };
  
  zoomOut = () => {
    this.setState({ 
      zoomedData: null, 
      refAreaLeft: '', 
      refAreaRight: '', 
      disableAnimation: false 
    });
  };

  formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
  
    const interval = (this.props.timeRange <= 60) ? 5 : (this.props.timeRange <= 1440) ? 30 : 60;
  
    const roundedMinutes = Math.round(date.getMinutes() / interval) * interval;
    date.setMinutes(roundedMinutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
  
    if (this.props.timeRange <= 60) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (this.props.timeRange <= 1440) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (this.props.timeRange <= 2880) {
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      const isStartOfDay = checkDate.getTime() === date.getTime();
      if (isStartOfDay){
        return date.toLocaleDateString([], { month: 'short', day: 'numeric'});
      } else {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
      }
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric'});
    }
  };

  render() {
    const { data, dataKey, label, timeRange } = this.props;
    const { refAreaLeft, refAreaRight, zoomedData, disableAnimation } = this.state;

    const normalizeToMilliseconds = (data) => {
      return data.map(d => ({
        ...d,
        timestamp: new Date(d.timestamp).getTime()
      }));
    };

    const allDataPoints = normalizeToMilliseconds(data.flatMap(d => d.points || 
      (d.timestamp && d.value ? [{ timestamp: new Date(d.timestamp).toISOString(), value: d.value }] : [])
    ));

    const interval = 60000;
    const filledChartData = this.fillDataGaps(zoomedData ? normalizeToMilliseconds(zoomedData) : allDataPoints, interval).map(entry => ({
      ...entry,
      timestamp: new Date(entry.timestamp).getTime()
    }));

    let startTime, endTime;

    if (zoomedData && zoomedData.length > 0) {
        startTime = zoomedData[0].timestamp;
        endTime = zoomedData[zoomedData.length - 1].timestamp;
    } else {
        endTime = Date.now();
        startTime = endTime - timeRange * 60 * 1000;
    }

    return (
      <div className="chart-container" style={{ width: '90%', height: 400, marginBottom: '40px' }}>
        <button type="button" onClick={this.zoomOut}>Zoom Out</button>
        <ResponsiveContainer>
          <LineChart
            data={zoomedData ? zoomedData : filledChartData}
            onMouseDown={(e) => {
              this.setState({ refAreaLeft: new Date(e.activeLabel).toISOString() });
            }}
            onMouseMove={(e) => {
              if (this.state.refAreaLeft) {
                this.setState({ refAreaRight: new Date(e.activeLabel).toISOString() });
              }
            }}
            onMouseUp={this.zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              scale="time"
              domain={[startTime, endTime]}
              tickFormatter={this.formatXAxis}
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
              <ReferenceArea x1={new Date(refAreaLeft).getTime()} x2={new Date(refAreaRight).getTime()} strokeOpacity={0.3} />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}  
export default GraphComponent;
