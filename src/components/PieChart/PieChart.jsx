import Plot from "react-plotly.js";
import { useState, useEffect, useCallback, useRef } from "react";
import "./PieChart.style.css";

const PieChart = (props) => {
  const { year, month, onPieClick } = props;
  const [pieData, setPieData] = useState({});
  const previousDataRef = useRef({});

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/monthlyvideos/${year}/${month}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // console.log("Fetched data:", data);
      const isDifferent =
        JSON.stringify(data.data) !== JSON.stringify(previousDataRef.current);
      if (isDifferent) {
        setPieData(data.data);
        previousDataRef.current = data.data;
        if (onPieClick && data.data.id && data.data.id.length > 0) {
          onPieClick(data.data.id[0]);
        }
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [year, month, onPieClick]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  const truncateLabel = (label, maxLength = 10) => {
    return label.length > maxLength
      ? `${label.substring(0, maxLength)}...`
      : label;
  };
  const handleClick = (event) => {
    console.log("Event data:", event);
    if (props.onPieClick && event.points.length > 0) {
      const point = event.points[0];
      const pointIndex = point.pointNumber;
      const videoId = pieData.id ? pieData.id[pointIndex] : undefined;
      props.onPieClick(videoId);
    }
  };

  return (
    <div className="piechart-container">
      <div className="piechart-title">
        <h4>{props.month} Videos</h4>
      </div>
      <div className="piechart-graphic">
        <Plot
          data={[
            {
              values: pieData.values || [],
              labels: (pieData.labels || []).map((label) =>
                truncateLabel(label)
              ),
              textinfo: "none",
              hoverinfo: "label+percent",
              hole: 0.55,
              textposition: "inside",
              texttemplate: "%{label}<br>%{percent}",
              type: "pie",
              ids: pieData.id || [],
            },
          ]}
          layout={{
            width: 518.8,
            height: 225,
            plot_bgcolor: "#ffffff",
            paper_bgcolor: "#ffffff",
            font: {
              size: 12,
            },
            margin: {
              t: 0,
              l: 0,
              r: 0,
              b: 0,
            },
          }}
          config={{ displayModeBar: false }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default PieChart;
