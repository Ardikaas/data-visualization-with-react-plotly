import "./AnalyticTextCard.style.css";

const AnalyticTextCard = (props) => {
  return (
    <div className="analyticcarrdtext-continer">
      <h5>{props.title} :</h5>
      <div className="analyticcarrdtext-value">
        <img src={props.img} alt="" />
        <h3>{props.value}</h3>
      </div>
    </div>
  );
};

export default AnalyticTextCard;
