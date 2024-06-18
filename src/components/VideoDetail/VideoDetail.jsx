import "./VideoDetail.style.css";
import { useEffect, useState } from "react";
import * as cheerio from "cheerio";
import defaultThumbnail from "../assets/defaultthumbnail.png";
import view from "../assets/eye-solid.svg";
import like from "../assets/like-solid.svg";
import video from "../assets/video-solid.svg";

const getYoutubeThumbnail = (videoUrl) => {
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
};

const TEDThumbnail = ({ videoUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
          const youtubeThumbnailUrl = getYoutubeThumbnail(videoUrl);
          if (youtubeThumbnailUrl) {
            setThumbnailUrl(youtubeThumbnailUrl);
            return;
          }
        }

        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(proxyUrl + videoUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        const thumbnailMetaTag = $('meta[property="og:image"]').attr("content");
        if (thumbnailMetaTag) {
          setThumbnailUrl(thumbnailMetaTag);
        } else {
          setThumbnailUrl(defaultThumbnail);
        }
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };

    fetchThumbnail();
  }, [videoUrl]);

  return (
    <div className="mostviewcard-img">
      <img src={thumbnailUrl} alt="thumbnail" />
    </div>
  );
};

const VideoDetail = (props) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/videodetail/${props.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch video detail");
        }
        const data = await response.json();
        setVideoData(data.data);
      } catch (error) {
        console.error("Error fetching video detail:", error);
      }
    };

    fetchVideoDetail();
  }, [props.id]);

  if (!videoData) {
    return <div>Loading...</div>; // Menampilkan pesan loading selama fetch data
  }

  return (
    <div className="videodetail-container">
      <div className="videodetail-title">
        <h4>Video Detail</h4>
      </div>
      <div className="videodetail-card">
        <div className="videodetail-thumbnail">
          <TEDThumbnail videoUrl={videoData.link} />
        </div>
        <div className="videodetail-text">
          <div className="videodetail-text-top">
            <h4>{videoData.title}</h4>
            <h6>by {videoData.author}</h6>
          </div>
          <div className="videodetail-text-bottom">
            <div className="videodetail-text-count-container">
              <div className="videodetail-text-count">
                <img src={view} alt="views" />
                <h6>{videoData.views}</h6>
              </div>
              <div className="videodetail-text-count">
                <img src={like} alt="likes" />
                <h6>{videoData.likes}</h6>
              </div>
            </div>
            <div className="videodetail-text-date">
              <h5>Uploaded on {videoData.date}</h5>
            </div>
          </div>
        </div>
      </div>
      <a href={videoData.link} target="_blank" rel="noopener noreferrer">
        Watch Video <img src={video} alt="" />
      </a>
    </div>
  );
};

export default VideoDetail;
