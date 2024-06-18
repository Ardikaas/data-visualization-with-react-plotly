import BarPlot from "../BarPlot/BarPlot";
import MostViewCard from "../MostViewCard/MostViewCard";
import ScatterPlot from "../ScatterPlot/ScatterPlot";
import "./Dashboard.style.css";

const Dashboard = () => {
  const width = 518.8;
  const height = 225;
  const currentYear = new Date().getFullYear();
  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h4>Video Analytic</h4>
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
