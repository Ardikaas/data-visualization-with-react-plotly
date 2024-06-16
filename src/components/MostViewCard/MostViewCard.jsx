import { useEffect, useState, useRef } from "react";
import * as cheerio from "cheerio";
import defaultThumbnail from "../assets/defaultthumbnail.png";
import view from "../assets/eye-solid.svg";
import "./MostViewCard.style.css";

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

const MostViewCard = () => {
  const [topViews, setTopViews] = useState([]);
  const previousDataRef = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/topviews");
        const result = await response.json();
        if (result.status.code === 200) {
          const isDifferent =
            JSON.stringify(result.data) !==
            JSON.stringify(previousDataRef.current);
          if (isDifferent) {
            setTopViews(result.data);
            previousDataRef.current = result.data;
          }
        } else {
          console.log("failed to fetch data");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mostviewcard-container">
      <div className="mostviewcard">
        <div className="mostviewcard-title">
          <h4>Most views</h4>
        </div>
        <div className="mostviewcard-label-container">
          {topViews.map((item) => (
            <div className="mostviewcard-label" key={item._id}>
              <div className="mostviewcard-img">
                <TEDThumbnail videoUrl={item.link} />
              </div>
              <div className="mostviewcard-text">
                <h5>{item.title}</h5>
                <h6>{item.author}</h6>
                <div className="mostviewcard-text-view">
                  <img src={view} alt="views" />
                  <h6>{item.views}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostViewCard;
