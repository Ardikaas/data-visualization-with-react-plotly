import AnalyticTextCard from "../AnalyticTextCard/AnalyticTextCard";
import BarPlot from "../BarPlot/BarPlot";
import MostViewCard from "../MostViewCard/MostViewCard";
import ScatterPlot from "../ScatterPlot/ScatterPlot";
import { useState, useEffect } from "react";
import view from "../assets/eye-solid.svg";
import like from "../assets/like-solid.svg";
import "./Dashboard.style.css";

const Dashboard = () => {
  const [apiData, setApiData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/analytictext");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setApiData(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const width = 518.8;
  const height = 225;
  const currentYear = new Date().getFullYear();
  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h4>Video Analytic</h4>
        <div className="analytic-card">
          <AnalyticTextCard
            title={"Overall Views"}
            value={apiData.overallview}
            img={view}
          />
          <AnalyticTextCard
            title={"Overall Likes"}
            value={apiData.overalllike}
            img={like}
          />
          <AnalyticTextCard
            title={"Current Views 2024"}
            value={apiData.currentview}
            img={view}
          />
          <AnalyticTextCard
            title={"Current Likes 2024"}
            value={apiData.currentlike}
            img={like}
          />
          <AnalyticTextCard
            title={"Views Prediction 2024"}
            value={apiData.viewpredict}
            img={view}
          />
          <AnalyticTextCard
            title={"Likes Prediction 2024"}
            value={apiData.likepredict}
            img={like}
          />
        </div>
      </div>
      <div className="dashboard-right">
        <div className="dashboard-right-top">
          <BarPlot
            width={width}
            height={height}
            title={"View Monthly"}
            yaxis={"Views"}
            url={`http://localhost:8080/monthlyviews/${currentYear}`}
            enableClick={false}
          />
          <BarPlot
            width={width}
            height={height}
            title={"Like Monthly"}
            yaxis={"Likes"}
            url={`http://localhost:8080/monthlylikes/${currentYear}`}
            enableClick={false}
          />
        </div>
        <div className="dashboard-right-bottom">
          <ScatterPlot />
          <MostViewCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
