import BarPlot from "../BarPlot/BarPlot";
import PieChart from "../PieChart/PieChart";
import VideoDetail from "../VideoDetail/VideoDetail";
import "./DetailDashboard.style.css";
import { useParams } from "react-router-dom";

const DetailDashboard = () => {
  const params = useParams();
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
          />
        </div>
        <div className="detaildashboard-right-bottom">
          <PieChart />
          <VideoDetail />
        </div>
      </div>
    </div>
  );
};

export default DetailDashboard;
