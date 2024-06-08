import logo from "../assets/logo.png";
import "./Navbar.style.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <a href="https://www.ted.com/">
          <img src={logo} alt="" />
          <h4>Ideas change everything</h4>
        </a>
      </div>
      <div className="navbar-right">
        <div className="normal">
          <a href="*" target="_blank">
            WATCH
          </a>
        </div>
        <div className="normal">
          <a href="*" target="_blank">
            DISCOVER
          </a>
        </div>
        <div className="normal">
          <a href="*" target="_blank">
            ATTEND
          </a>
        </div>
        <div className="normal">
          <a href="*" target="_blank">
            PARTICIPATE
          </a>
        </div>
        <div className="normal">
          <a href="*" target="_blank">
            ABOUT
          </a>
        </div>
        <div className="normal">
          <a href="*" target="_blank">
            SIGN IN
          </a>
        </div>
        <div className="join">
          <a href="/input" target="">
            JOIN TED
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
