import ScatterPlot from "../components/ScatterPlot/ScatterPlot";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Warning from "../components/Warning/Warning";
import BarPlot from "../components/BarPlot/BarPlot";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <BarPlot />
      <ScatterPlot />
      <Warning />
      <Footer />
    </div>
  );
};

export default Landing;
