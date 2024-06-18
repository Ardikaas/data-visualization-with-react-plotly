import "./VideoDetail.style.css";
import thumbnail from "../assets/defaultthumbnail.png";
import view from "../assets/eye-solid.svg";
import like from "../assets/like-solid.svg";
import video from "../assets/video-solid.svg";

const VideoDetail = () => {
  return (
    <div className="videodetail-container">
      <div className="videodetail-title">
        <h4>Video Detail</h4>
      </div>
      <div className="videodetail-card">
        <div className="videodetail-thumbnail">
          <img src={thumbnail} alt="Thumbnail" />
        </div>
        <div className="videodetail-text">
          <div className="videodetail-text-top">
            <h4>The dark history of the overthrow of Hawaii</h4>
            <h6>by Ozawa Bineshi Albert</h6>
          </div>
          <div className="videodetail-text-bottom">
            <div className="videodetail-text-count-container">
              <div className="videodetail-text-count">
                <img src={view} alt="views" />
                <h6>100k</h6>
              </div>
              <div className="videodetail-text-count">
                <img src={like} alt="likes" />
                <h6>10k</h6>
              </div>
            </div>
            <div className="videodetail-text-date">
              <h5>Uploaded on September 1998</h5>
            </div>
          </div>
        </div>
      </div>
      <a href="https://yotube.com">
        Watch Video <img src={video} alt="" />
      </a>
    </div>
  );
};

export default VideoDetail;
