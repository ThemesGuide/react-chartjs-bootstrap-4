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

export class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLineChart: this.mergeColorsIntoData(dataLineChart)
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

  mergeColorsIntoPieData(srcData) {
    /* This function merges from "global" colors array into pie data colors. 
     * Since pie charts use an arr of backgroundColor for each pie segment, we
     * resample from the other color arr indexes and push onto backgroundColor
    */
    return {
      ...srcData,
      datasets: srcData.datasets.map((dataset, k) => {
        colors[k].backgroundColor = [colors[k].backgroundColor.toString()];
        colors[k].backgroundColor.push(
          colors[k + 1].backgroundColor.toString()
        );
        colors[k].backgroundColor.push(
          colors[k + 2].backgroundColor.toString()
        );
        return { ...dataset, ...colors[k] };
      })
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">Line</h4>
              <Line
                ref="chart1"
                data={this.mergeColorsIntoData(this.state.dataLineChart)}
                options={this.optionsLine()}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">Bar</h4>
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
              <h4 className="mb-4">Pie</h4>
              <Pie data={this.mergeColorsIntoPieData(dataPieChart)} />
            </div>
          </div>
        </div>
        <div className="col-sm-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">Donut</h4>
              <Donut
                options={this.optionsDonut()}
                data={this.mergeColorsIntoPieData(dataPieChart)}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 py-3">
          <div className="card shadow">
            <div className="card-body text-center">
              <h4 className="mb-4">Bubble</h4>
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
              <h4 className="mb-4">Radar</h4>
              <Radar data={this.mergeColorsIntoData(dataBarChart)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
