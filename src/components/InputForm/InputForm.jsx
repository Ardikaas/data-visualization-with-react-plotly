import "./InputForm.style.css";

const InputForm = () => {
  return (
    <div className="inputform-container">
      <div className="inputform-top">
        <h1>Video Data Input</h1>
      </div>
      <div className="inputform-bottom">
        <div className="inputform-bottom-left">
          <h4>Video detail</h4>
        </div>
        <div className="inputform-bottom-right">
          <h2>About Video</h2>
          <div className="inputform-form">
            <div className="field">
              <label>Title</label>
              <input type="text" id="title" />
            </div>
            <div className="field">
              <label>Author</label>
              <input type="text" id="author" />
            </div>
            <div className="field-duo">
              <div className="field">
                <label>Likes</label>
                <input type="text" id="links" />
              </div>
              <div className="field">
                <label>Views</label>
                <input type="text" id="views" />
              </div>
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" id="date" />
            </div>
            <div className="field">
              <label>Link</label>
              <input type="text" id="link" />
            </div>
            <div>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
