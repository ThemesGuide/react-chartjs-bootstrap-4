import React from "react";
import dataLineChart from "../data/linechart.json";
import dataBarChart from "../data/barchart.json";
import dataPieChart from "../data/piechart.json";
import dataBubbleChart from "../data/bubblechart.json";
import {
  defaults,
  Line,
  Bar,
  Pie,
  Pie as Donut,
  Bubble,
  Radar
} from "react-chartjs-2";

// set global chartjs defaults
defaults.global.responsive = true;
defaults.global.defaultColor = "rgba(0, 0, 90, 0.7)";
defaults.global.legend.position = "bottom";
defaults.global.legend.labels.pointStyle = "circle";
defaults.global.legend.labels.usePointStyle = true;
defaults.global.legend.labels.fontSize = 12;

const colors = [
  {
    // blue
    borderWidth: 1.5,
    borderColor: "rgba(111,157,195,1)",
    backgroundColor: "rgba(111,157,195,0.4)",
    pointBackgroundColor: "rgba(255,255,255,0.8)",
    pointBorderColor: "rgba(111,157,195,1)",
    pointHoverBorderColor: "magenta",
    pointHoverBorderWidth: 2
  },
  {
    // pinky
    borderWidth: 1.5,
    borderColor: "rgba(220,120,220,1)",
    backgroundColor: "rgba(220,120,220,0.8)",
    pointBackgroundColor: "rgba(255,255,255,0.8)",
    pointBorderColor: "rgba(220,120,220,1)",
    pointHoverBorderColor: "magenta",
    pointHoverBorderWidth: 2
  },
  {
    // red
    borderWidth: 1.5,
    borderColor: "rgba(247,70,74,1)",
    backgroundColor: "rgba(247,70,74,0.7)",
    pointBackgroundColor: "rgba(255,255,255,0.8)",
    pointBorderColor: "rgba(247,70,74,1)",
    pointHoverBorderColor: "rgba(0,0,0,0.7)",
    pointHoverBorderWidth: 2,
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

export class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.UpdateLiveData = this.UpdateLiveData.bind(this);
    this.state = {
      messages: [],
      dataLineChart: dataLineChart
    };
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

  optionsDonut() {
    return {
      cutoutPercentage: 85,
      legend: {
        position: "bottom",
        labels: {
          pointStyle: "circle",
          usePointStyle: true
        }
      }
    };
  }

  mergeColorsIntoData(srcData) {
    /* this function merges from "global" colors array into datadset colors */
    return {
      ...srcData,
      datasets: srcData.datasets.map((dataset, k) => {
        return { ...dataset, ...colors[k] };
      })
    };
  }

  UpdateLiveData(idx) {
    /* mark this message as read */
    let messages = [...this.state.messages];
    messages[idx].read = true;
    this.setState({ messages });
  }

  render() {
    const ldata = {
      ...dataLineChart,
      datasets: dataLineChart.datasets.map((dataset, k) => {
        return { ...dataset, ...colors[k] };
      })
    };

    return (
      <div className="row">
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4>Line</h4>
              <Line
                data={this.mergeColorsIntoData(dataLineChart)}
                options={this.optionsLine()}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4>Bar</h4>
              <Bar
                data={this.mergeColorsIntoData(dataBarChart)}
                options={this.optionsBar()}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4>Pie</h4>
              <Pie data={dataPieChart} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4>Donut</h4>
              <Donut data={dataPieChart} options={this.optionsDonut()} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4>Bubble</h4>
              <Bubble
                data={this.mergeColorsIntoData(dataBubbleChart)}
                options={{ legend: { display: false } }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4>Radar</h4>
              <Radar data={this.mergeColorsIntoData(dataBarChart)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
