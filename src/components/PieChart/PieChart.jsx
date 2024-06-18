import Plot from "react-plotly.js";
import "./PieChart.style.css";

const PieChart = () => {
  return (
    <div className="piechart-container">
      <div className="piechart-title">
        <h4>January Videos</h4>
      </div>
      <div className="piechart-graphic">
        <Plot
          data={[
            {
              values: [90, 27, 12, 36, 15, 23, 42],
              labels: [
                "US",
                "China",
                "European Union",
                "Russian Federation",
                "Brazil",
                "India",
                "Rest of World",
              ],
              hoverinfo: "label+percent",
              hole: 0.55,
              type: "pie",
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
        />
      </div>
    </div>
  );
};

export default PieChart;
