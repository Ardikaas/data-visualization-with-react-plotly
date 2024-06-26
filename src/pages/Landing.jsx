import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Warning from "../components/Warning/Warning";
import Dashboard from "../components/Dashboard/Dashboard";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Warning />
      <Footer />
    </div>
  );
};

export default Landing;
