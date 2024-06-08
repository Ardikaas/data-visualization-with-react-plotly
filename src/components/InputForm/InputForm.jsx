import React, { useState } from "react";
import "./InputForm.style.css";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState("");
  const [views, setViews] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "likes":
        setLikes(value);
        break;
      case "views":
        setViews(value);
        break;
      case "date":
        setDate(value);
        break;
      case "link":
        setLink(value);
        break;
      default:
        break;
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(dateObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoData = {
      title,
      author,
      likes: Number(likes),
      views: Number(views),
      date: formatDate(date),
      link,
    };

    try {
      const response = await fetch("http://localhost:8080/input", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(videoData),
      });

      if (response.ok) {
        console.log("Data berhasil dikirim!");
        setTitle("");
        setAuthor("");
        setLikes("");
        setViews("");
        setDate("");
        setLink("");
      } else {
        console.error("Gagal mengirim data.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div className="inputform-container">
      <div className="inputform-top">
        <h1>VIDEO DATA INPUT</h1>
      </div>
      <div className="inputform-bottom">
        <div className="inputform-bottom-left">
          <h4>Video detail</h4>
        </div>
        <div className="inputform-bottom-right">
          <h2>About Video</h2>
          <form className="inputform-form" onSubmit={handleSubmit}>
            <div className="field">
              <label>Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Author</label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field-duo">
              <div className="field">
                <label>Likes</label>
                <input
                  type="text"
                  id="likes"
                  value={likes}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="field">
                <label>Views</label>
                <input
                  type="text"
                  id="views"
                  value={views}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label>Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label>Link</label>
              <input
                type="text"
                id="link"
                value={link}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
