import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BarPlot.style.css";

const BarPlot = () => {
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
    <div className="barplot-container">
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
          width: 1000,
          height: 500,
          title: "A Fancy Plot",
          plot_bgcolor: "#f6f6f6",
          paper_bgcolor: "#f6f6f6",
          xaxis: {
            tickformat: "d",
          },
        }}
        config={{ displayModeBar: false }} // Sembunyikan menu konteks Plotly
        onClick={handleClick} // Panggil fungsi handleClick ketika marker diklik
      />
    </div>
  );
};

export default BarPlot;
