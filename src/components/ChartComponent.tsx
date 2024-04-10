import { useState, useEffect } from "react";
import { Line, Bar, Chart as ChartJS } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import "./ChartComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBarChart,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

Chart.register(...registerables);

interface Entry {
  date: string;
  value: number;
}

interface Props {
  blockchainData: Entry[];
  cumulativeData: Entry[];
}

const ChartComponent: React.FC<Props> = ({
  blockchainData,
  cumulativeData,
}) => {
  const [granularity, setGranularity] = useState<number>(1);
  const [chartType, setChartType] = useState<"line" | "bar" | "dual-axis">(
    "line"
  );
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const handleChangeGranularity = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGranularity(parseInt(event.target.value));
  };

  const handleChangeChartType = (type: "line" | "bar" | "dual-axis") => {
    setChartType(type);
  };

  useEffect(() => {
    if (!blockchainData || !cumulativeData) return;

    const filterData = (data: Entry[]) => {
      return data.filter((_, index) => index % granularity === 0);
    };

    const filteredBlockchainData = filterData(blockchainData);
    const filteredCumulativeData = filterData(cumulativeData);

    const newChartData = {
      labels: filteredBlockchainData.map((entry) => entry.date),
      datasets: [
        {
          label: "Ethereum",
          data: filteredBlockchainData.map((entry) => ({
            x: entry.date,
            y: entry.value,
          })),
          borderColor: "#6f42c1",
          backgroundColor: "rgba(111, 66, 193, 0.1)",
          borderWidth: 2,
          pointRadius: 3,
          yAxisID: "y",
        },
        {
          label: "Cumulative Data (Ethereum & Solana)",
          data: filteredCumulativeData.map((entry) => ({
            x: entry.date,
            y: entry.value,
          })),
          borderColor: "#17a2b8",
          backgroundColor: "rgba(23, 162, 184, 0.1)",
          borderWidth: 2,
          pointRadius: 3,
          yAxisID: "y2",
        },
      ],
    };

    setChartData(newChartData);
  }, [granularity, blockchainData, cumulativeData, chartType]);

  return (
    <div className="chart-container">
      <h2 className="title">Growth Index Comparison</h2>
      <div className="granularity-select">
        <label htmlFor="granularity" className="select-label">
          Granularity:
        </label>
        <select
          id="granularity"
          onChange={handleChangeGranularity}
          className="custom-select"
        >
          <option value="1">1 Week</option>
          <option value="2">2 Weeks</option>
          <option value="4">4 Weeks</option>
        </select>
      </div>

      <div className="chart-type-select">
        <button
          className={`chart-type-button ${
            chartType === "line" ? "active" : ""
          }`}
          onClick={() => handleChangeChartType("line")}
          title="Line Chart"
        >
          <FontAwesomeIcon icon={faChartLine} />
        </button>
        <button
          className={`chart-type-button ${chartType === "bar" ? "active" : ""}`}
          onClick={() => handleChangeChartType("bar")}
          title="Bar Chart"
        >
          <FontAwesomeIcon icon={faBarChart} />
        </button>
        <button
          className={`chart-type-button ${
            chartType === "dual-axis" ? "active" : ""
          }`}
          onClick={() => handleChangeChartType("dual-axis")}
          title="Dual Axis Line Chart"
        >
          <FontAwesomeIcon icon={faExchangeAlt} />
        </button>
      </div>

      <div className="chart">
        {chartType === "line" ? (
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "week",
                    tooltipFormat: "MMM d",
                    displayFormats: {
                      week: "MMM d",
                    },
                  },
                  ticks: {
                    font: { size: 12, family: "Roboto, sans-serif" },
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Growth Index",
                    font: { size: 14, family: "Roboto, sans-serif" },
                  },
                  ticks: { font: { size: 12, family: "Roboto, sans-serif" } },
                },
              },
              plugins: {
                tooltip: {
                  titleFont: { size: 14, family: "Roboto, sans-serif" },
                  bodyFont: { size: 12, family: "Roboto, sans-serif" },
                },
              },
              layout: {
                padding: {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                },
              },
            }}
          />
        ) : chartType === "bar" ? (
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "week",
                    tooltipFormat: "MMM d",
                    displayFormats: {
                      week: "MMM d",
                    },
                  },
                  ticks: {
                    font: { size: 12, family: "Roboto, sans-serif" },
                    maxRotation: 0,
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Growth Index",
                    font: { size: 14, family: "Roboto, sans-serif" },
                  },
                  ticks: { font: { size: 12, family: "Roboto, sans-serif" } },
                },
              },
              plugins: {
                tooltip: {
                  titleFont: { size: 14, family: "Roboto, sans-serif" },
                  bodyFont: { size: 12, family: "Roboto, sans-serif" },
                },
              },
              layout: {
                padding: {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                },
              },
              indexAxis: "x",
              barPercentage: 0.6,
              categoryPercentage: 0.8,
            }}
          />
        ) : (
          <div>
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "week",
                      tooltipFormat: "MMM d",
                      displayFormats: {
                        week: "MMM d",
                      },
                    },
                    ticks: {
                      font: { size: 12, family: "Roboto, sans-serif" },
                      maxRotation: 0,
                      autoSkip: true,
                      maxTicksLimit: 10,
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Ethereum Growth Index",
                      font: { size: 14, family: "Roboto, sans-serif" },
                    },
                    ticks: { font: { size: 12, family: "Roboto, sans-serif" } },
                  },
                  y2: {
                    title: {
                      display: true,
                      text: "Cumulative Growth Index",
                      font: { size: 14, family: "Roboto, sans-serif" },
                    },
                    ticks: { font: { size: 12, family: "Roboto, sans-serif" } },
                    position: "right",
                    grid: {
                      drawOnChartArea: false,
                    },
                  },
                },
                plugins: {
                  tooltip: {
                    titleFont: { size: 14, family: "Roboto, sans-serif" },
                    bodyFont: { size: 12, family: "Roboto, sans-serif" },
                  },
                },
                layout: {
                  padding: {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;
