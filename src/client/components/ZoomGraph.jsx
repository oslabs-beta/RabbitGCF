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

class GraphComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      zoomedData: null,
      disableAnimation: false,
    };
  }

  // click and drag zoom functionality
  zoom = () => {
    let { refAreaLeft, refAreaRight } = this.state;
    const { data } = this.props;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState({ refAreaLeft: '', refAreaRight: '' });
      return;
    }

    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const zoomedData = data.filter(d => d.timestamp >= refAreaLeft && d.timestamp <= refAreaRight);

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
      disableAnimation: false, 
    });
  };

  render() {
    const { data, dataKey, label } = this.props;
    const { refAreaLeft, refAreaRight, zoomedData, disableAnimation } = this.state;
    const chartData = zoomedData || data;

    if (data.length === 0) {
      return <div>No data available</div>;
    }

    return (
      <div className="chart-container" style={{ width: '90%', height: 400, marginBottom: '40px' }}>
        <button type="button" onClick={this.zoomOut}>Zoom Out</button>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            onMouseDown={(e) => this.setState({ refAreaLeft: e.activeLabel })}
            onMouseMove={(e) => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
            onMouseUp={this.zoom}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend
              payload={[
            { value: label, type: 'line', color: '#8884d8', name: label },
            ]}
            />
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" animationDuration={disableAnimation ? 0 : 1000} />
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
