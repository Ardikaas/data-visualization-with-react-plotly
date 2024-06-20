import BarPlot from "../BarPlot/BarPlot";
import PieChart from "../PieChart/PieChart";
import VideoDetail from "../VideoDetail/VideoDetail";
import "./DetailDashboard.style.css";
import { useState } from "react";
import { useParams } from "react-router-dom";

const DetailDashboard = () => {
  const params = useParams();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(params.id);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const handleBarPlotClick = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  const handlePieChartClick = (videoId) => {
    console.log("Selected Video ID:", videoId);
    setSelectedVideoId(videoId);
  };
  return (
    <div className="detaildashboard-container">
      <div className="detaildashboard-left">
        <h4>{params.id} Data Analytics</h4>
      </div>
      <div className="detaildashboard-right">
        <div className="detaildashboard-right-top">
          <BarPlot
            width={1105}
            height={225}
            title={"Month View Analiycs"}
            yaxis={"Views"}
            url={`http://localhost:8080/monthlyviews/${params.id}`}
            enableClick={true}
            onBarClick={handleBarPlotClick}
          />
        </div>
        <div className="detaildashboard-right-bottom">
          <PieChart
            year={selectedYear}
            month={selectedMonth}
            onPieClick={handlePieChartClick}
          />
          {selectedVideoId && <VideoDetail id={selectedVideoId} />}
        </div>
      </div>
    </div>
  );
};

export default DetailDashboard;
