import Plot from "react-plotly.js";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./BarPlot.style.css";

const BarPlot = (props) => {
  const navigate = useNavigate();
  const [plotData, setPlotData] = useState({});
  const propsYear = props.url.match(/(\d{4})$/);
  const year = propsYear ? propsYear[0] : "unknown";

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(props.url);
      if (!response.ok) {
        throw new Error("Filed to fetch data");
      }
      const data = await response.json();
      setPlotData(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [props.url]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [fetchData]);

  const handleClick = (event) => {
    if (!props.enableClick) return;
    // Di sini Anda dapat menentukan logika untuk menentukan URL tujuan berdasarkan marker yang diklik
    const markerValue = event.points[0].x; // Contoh: Ambil nilai x dari marker yang diklik
    const url = `/detail/${year}/${markerValue}`; // Contoh: Buat URL tujuan dengan nilai x sebagai bagian dari URL

    // Navigasi ke halaman baru menggunakan objek history
    navigate(url);
  };

  return (
    <div className="barplot-container">
      <div className="barplot-title">
        <h4>{year + " " + props.title}</h4>
      </div>
      <div className="barplot-graphic">
        <Plot
          data={[
            {
              x: plotData.month || [],
              y: plotData.y || [],
              type: "bar",
              marker: { color: "#d91e18" },
            },
          ]}
          layout={{
            width: props.width,
            height: props.height,
            plot_bgcolor: "#ffffff",
            paper_bgcolor: "#ffffff",
            xaxis: {
              tickformat: "d",
            },
            yaxis: {
              title: {
                text: props.yaxis,
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
          onClick={props.enableClick ? handleClick : undefined} // Panggil fungsi handleClick ketika marker diklik
        />
      </div>
    </div>
  );
};

export default BarPlot;
