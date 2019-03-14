import React from 'react';
import Plot from 'react-plotly.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    const trace1 = {
      x: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0], 
      name: 'Neutral', 
      opacity: 0.75, 
      type: 'histogram'
    };
  
    const trace2 = {
      x: [1.0, -0.1, 0.3, 0.5, 0.5, -0.2, -0.1, 0.1, -0.4300000000000001, 0.375, 0.1375, 0.625, 0.5, 0.3, 1.0, -0.446875, -0.09999999999999992, -0.025, 0.3, 0.2333333333333333, -0.1875, -0.18333333333333332, -0.04999999999999999, -0.4, 0.5, -0.1, -0.1911111111111111, 0.2, 0.04999999999999999, -0.28703703703703703, 0.6000000000000001, -0.5, 0.15833333333333333, 0.45625, 0.13142857142857145, -0.5625, 0.1, 0.2, 0.325, 0.5416666666666666, 0.78125, -0.14999999999999994, -0.4, 0.09166666666666666, -0.3125, 0.19583333333333333, 0.7, 0.3059895833333333, -0.45, -0.05, 0.1875, 0.3, -0.1, -0.5, -0.5, -0.375, -0.5, 0.4333333333333333, 0.7, 0.5, 0.5, 0.2, -0.10370370370370373, 0.5, -0.7142857142857143, 0.4125, -0.5, 0.18333333333333332, -0.07447089947089948, 1.0, 0.5, 1.0, 0.04285714285714285, 0.625, -0.14583333333333334, 0.175, 0.3, 0.5, 0.75, 0.5, -0.3125, -0.3333333333333333, -0.3277777777777778, -0.425, 0.22916666666666666, 0.2857142857142857, 0.5, -0.1555555555555556, 0.125, 0.5, -0.3333333333333333, 0.2, 0.19318181818181815, 0.7, -0.1958333333333333, 0.8, 0.2857142857142857], 
      name: 'Polarized', 
      opacity: 0.75, 
      type: 'histogram'
    };

    this.state = { 
      data: [trace1, trace2], 
      layout: {
        barmode: 'overlay', 
        title: 'Positively Polarized Tweet', 
        xaxis: {title: 'Polarity'}, 
        yaxis: {title: 'Tweet count'}
      }, 
      frames: [], 
      config: {} 
    };
  }

  render() {
    return (
      <Plot
        data={this.state.data}
        layout={this.state.layout}
        frames={this.state.frames}
        config={this.state.config}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
      />
    )
  }
}

export default App;

      // <Plot
      //   data={[
      //     {
      //       x: [1, 2, 3],
      //       y: [2, 6, 3],
      //       type: 'scatter',
      //       mode: 'lines+points',
      //       marker: {color: 'red'},
      //     },
      //     {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
      //   ]}
      //   layout={ {width: 640, height: 480, title: 'A Fancy Plot'} }
      // />

// class App extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = { data: [], layout: {}, frames: [], config: {} };
//   }

//   render() {
//       return (
//           <Plot
//               data={this.state.data}
//               layout={this.state.layout}
//               frames={this.state.frames}
//               config={this.state.config}
//               onInitialized={(figure) => this.setState(figure)}
//               onUpdate={(figure) => this.setState(figure)}
//           />
//       );
//   }
// }
