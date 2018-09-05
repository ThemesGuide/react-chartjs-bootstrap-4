import React from "react";
import dataLineChart from "../data/linechart.json";
import dataBarChart from "../data/barchart.json";
import dataBubbleChart from "../data/bubblechart.json";
import { defaults, Line, Bar, Bubble } from "react-chartjs-2";
import helpers from "../helpers";

// set global chartjs defaults
defaults.global.responsive = true;
defaults.global.defaultColor = "rgba(0, 0, 90, 0.7)";
defaults.global.legend.position = "bottom";
defaults.global.legend.labels.pointStyle = "circle";
defaults.global.legend.labels.usePointStyle = true;
defaults.global.legend.labels.fontSize = 12;

const liveDataMin = 100;
const liveDataMax = 600;
const maxIntervals = 30;
const intervalSpeed = 800;

const colors = [
  {
    // blue
    borderWidth: 0,
    borderColor: "rgba(101,147,185,1)",
    backgroundColor: ["rgba(101,147,185,0.8)"],
    pointBackgroundColor: "rgba(255,255,255,0.8)",
    pointBorderColor: "rgba(101,147,185,1)",
    pointHoverBorderColor: "magenta",
    pointHoverBorderWidth: 1
  },
  {
    // pinky
    borderWidth: 0,
    borderColor: "rgba(220,120,220,1)",
    backgroundColor: "rgba(220,120,220,0.8)",
    pointBackgroundColor: "rgba(255,255,255,0.8)",
    pointBorderColor: "rgba(220,120,220,1)",
    pointHoverBorderColor: "#333",
    pointHoverBorderWidth: 1
  },
  {
    // red
    borderWidth: 0,
    borderColor: "rgba(247,70,74,1)",
    backgroundColor: "rgba(247,70,74,0.7)",
    pointBackgroundColor: "rgba(255,255,255,0.8)",
    pointBorderColor: "rgba(247,70,74,1)",
    pointHoverBorderColor: "rgba(0,0,0,0.7)",
    pointHoverBorderWidth: 1,
    pointHoverBackgroundColor: "rgba(247,70,74,1)"
  },
  {
    // lime
    borderWidth: 0,
    borderColor: "lime",
    backgroundColor: "lime",
    pointBackgroundColor: "lime"
  }
];

export class LiveCharts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lineData: this.mergeColorsIntoData(dataLineChart),
      lineTimer: null,
      barData: this.mergeColorsIntoData(dataBarChart),
      barTimer: null,
      bubbleData: this.mergeColorsIntoData(dataBubbleChart),
      bubbleTimer: null
    };

    /* for live data */
    this.runInterval = this.runInterval.bind(this);
    this.toggleInterval = this.toggleInterval.bind(this);
    this.updateLiveData = this.updateLiveData.bind(this);
    this.mergeColorsIntoData = this.mergeColorsIntoData.bind(this);
  }

  optionsLine() {
    return {
      legend: {
        display: false
      }
    };
  }

  optionsBar() {
    return {
      scales: {
        xAxes: [
          {
            barPercentage: 0.4,
            categoryPercentage: 0.6
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: false
            }
          }
        ]
      },
      legend: {
        display: false
      }
    };
  }

  mergeColorsIntoData(srcData) {
    /* This function merges from a "global" colors array into datadset 
     * colors. This allow us to dynamically change the colors and keep
     * the color definitions separate from the data.
    */
    return {
      ...srcData,
      datasets: srcData.datasets.map((dataset, k) => {
        return { ...dataset, ...colors[k] };
      })
    };
  }

  componentDidMount() {
    if (
      this.state.lineData &&
      this.state.lineData.labels &&
      this.state.lineData.datasets.length > 0
    ) {
      this.runInterval("lineTimer", "lineData");
    }
    if (
      this.state.barData &&
      this.state.barData.labels &&
      this.state.barData.datasets.length > 0
    ) {
      //uncomment to auto-start bar chart
      //this.runInterval("barTimer", "barData");
    }
    if (
      this.state.bubbleData &&
      this.state.bubbleData.labels &&
      this.state.bubbleData.datasets.length > 0
    ) {
      //uncomment to auto-start bubble chart
      //this.runInterval("bubbleTimer", "bubbleData");
    }
  }

  runInterval(chartTimer, dataName) {
    var _self = this;
    var ctr = 0;

    var timer = window.setInterval(function() {
      if (ctr === maxIntervals) {
        window.clearInterval(timer);
        _self.setState({ [chartTimer]: null });
        timer = null;
      } else {
        ctr++;
        if (
          _self.state[dataName] &&
          _self.state[dataName].datasets &&
          _self.state[dataName].datasets.length > 0
        ) {
          _self.updateLiveData(ctr, dataName);
        }
      }
    }, intervalSpeed);
    this.setState({ [chartTimer]: timer });
  }

  toggleInterval(chartTimer, dataName) {
    //console.log(this.state[chartTimer]);
    if (this.state[chartTimer]) {
      window.clearInterval(this.state[chartTimer]);
      console.log("clr");
      this.setState({ [chartTimer]: null });
    } else {
      this.runInterval(chartTimer, dataName);
    }
    return;
  }

  updateLiveData(ctr, dataName) {
    var newData = {};
    if (dataName.indexOf("bubble") > -1) {
      //console.log("bubble data");
      newData = {
        datasets: [
          {
            label: "Foo",
            data: [
              {
                x: 3,
                y: helpers.getRandomInt(2, 5),
                r: helpers.getRandomInt(7, 10)
              }
            ]
          },
          {
            label: "Zoo",
            data: [
              {
                x: 2,
                y: helpers.getRandomInt(2, 4),
                r: helpers.getRandomInt(9, 15)
              }
            ]
          },
          {
            label: "Boo",
            data: [
              {
                x: 4,
                y: 3,
                r: helpers.getRandomInt(8, 18)
              }
            ]
          },
          {
            label: "Moo",
            data: [
              {
                x: 2,
                y: 5,
                r: helpers.getRandomInt(1, 3)
              }
            ]
          },
          {
            label: "Poo",
            data: [
              {
                x: 2,
                y: 5,
                r: helpers.getRandomInt(1, 3)
              }
            ]
          },
          {
            label: "Loo",
            data: [
              {
                x: 2,
                y: 5,
                r: helpers.getRandomInt(1, 3)
              }
            ]
          },
          {
            label: "Woo",
            data: [
              {
                x: 2,
                y: 5,
                r: helpers.getRandomInt(1, 3)
              }
            ]
          }
        ]
      };
    } else {
      newData = {
        labels: ["X", "M", "T", "W", "X", "F", "S"],
        datasets: [
          {
            label: "Update " + ctr,
            data: helpers.getRandomArr(7, liveDataMin, liveDataMax)
          },
          {
            label: "Update " + ctr + 1,
            data: helpers.getRandomArr(7, liveDataMin, liveDataMax)
          },
          {
            label: "Update " + ctr + 2,
            data: helpers.getRandomArr(7, liveDataMin, liveDataMax)
          }
        ]
      };
    }

    this.setState({
      [dataName]: this.mergeColorsIntoData(newData)
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">
                Line Chart
                <button
                  className="btn btn-sm btn-outline-primary align-top ml-2"
                  onClick={timer =>
                    this.toggleInterval("lineTimer", "lineData")
                  }
                >
                  {this.state.lineTimer ? <span>Stop</span> : <span>Live</span>}
                </button>
              </h4>
              <Line
                ref="chart1"
                data={this.state.lineData}
                options={this.optionsLine()}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">
                Bar Chart
                <button
                  className="btn btn-sm btn-outline-primary align-top ml-2"
                  onClick={timer => this.toggleInterval("barTimer", "barData")}
                >
                  {this.state.barTimer ? <span>Stop</span> : <span>Live</span>}
                </button>
              </h4>
              <Bar data={this.state.barData} options={this.optionsBar()} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">
                Bubble Chart
                <button
                  className="btn btn-sm btn-outline-primary align-top ml-2"
                  onClick={timer =>
                    this.toggleInterval("bubbleTimer", "bubbleData")
                  }
                >
                  {this.state.bubbleTimer ? (
                    <span>Stop</span>
                  ) : (
                    <span>Live</span>
                  )}
                </button>
              </h4>
              <Bubble
                data={this.state.bubbleData}
                options={{ legend: { display: false } }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveCharts;
