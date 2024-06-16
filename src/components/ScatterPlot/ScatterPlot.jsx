import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ScatterPlot.style.css";

const ScatterPlot = () => {
  const navigate = useNavigate();
  const [plotData, setPlotData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/totalviews");
      if (!response.ok) {
        throw new Error("Filed to fetch data");
      }
      const data = await response.json();
      setPlotData(data.data);
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

  const handleClick = (event) => {
    // Di sini Anda dapat menentukan logika untuk menentukan URL tujuan berdasarkan marker yang diklik
    const markerValue = event.points[0].x; // Contoh: Ambil nilai x dari marker yang diklik
    const url = `/detail/${markerValue}`; // Contoh: Buat URL tujuan dengan nilai x sebagai bagian dari URL

    // Navigasi ke halaman baru menggunakan objek history
    navigate(url);
  };

  return (
    <div className="scatterplot-container">
      <div className="scatterplot-title">
        <h4>Views Analytics</h4>
      </div>
      <div className="scatterplot-graphic">
        <Plot
          data={[
            {
              x: plotData.year || [],
              y: plotData.totalviews || [],
              fill: "tozeroy",
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "#d91e18" },
            },
          ]}
          layout={{
            width: 700,
            height: 311,
            plot_bgcolor: "#ffffff",
            paper_bgcolor: "#ffffff",
            xaxis: {
              tickformat: "d",
            },
            yaxis: {
              title: {
                text: "View",
                font: {
                  family: "Inter, sans-serif",
                  size: 12,
                  color: "#000000",
                },
              },
            },
            margin: {
              t: 0,
              l: 50,
              r: 40,
              b: 55,
            },
          }}
          config={{ displayModeBar: false }} // Sembunyikan menu konteks Plotly
          onClick={handleClick} // Panggil fungsi handleClick ketika marker diklik
        />
      </div>
    </div>
  );
};

export default ScatterPlot;
