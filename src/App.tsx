import React, { useState, useEffect } from "react";
import ChartComponent from "./components/ChartComponent";
import responseData from "./utils/data.json"; // Use this data in case of CORS error to view the UI
import axios from "axios";

interface Entry {
  date: string;
  value: number;
}

interface Data {
  blockchain: {
    tg_growth_index: Entry[];
  };
  cumulative: {
    tg_growth_index: Entry[];
  };
}

const App: React.FC = () => {
  const [chartData, setChartData] = useState<Data | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.post(
        //   "https://api.tokenguard.io/db-api/growth-index/basic-timeline-data",
        //   {
        //     chainName: "ethereum",
        //     period: "last year",
        //     metric: "tg_growth_index",
        //     compareWith: ["solana"],
        //   },
        // );
        // setChartData(response.data)
        setChartData(responseData); // use this in case of CORS error
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData ? (
        <ChartComponent
          blockchainData={chartData.blockchain.tg_growth_index}
          cumulativeData={chartData.cumulative.tg_growth_index}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
