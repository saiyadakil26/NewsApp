import React from "react";

export default class NewsItem extends React.Component {
  render() {
    const {
      title,
      description,
      imageUrl,
      newsUrl,
      author,
      publishedAt,
      source,
    } = this.props;
    return (
      <>
        <div className="card mx-3 my-3" style={{ height: "500px" }}>
          <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <img
            height={"200px"}
            src={
              imageUrl
                ? imageUrl
                : "https://i.pinimg.com/564x/30/f0/d1/30f0d1c2b9163476c86a5902af9920e9.jpg"
            }
            className="card-img-top object-fit-none border rounded"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-sm btn-dark">
              Explore More.
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              By {author ? author : "Unknown"} on{" "}
              {new Date(publishedAt).toGMTString()}
            </small>
          </div>
        </div>
      </>
    );
  }
}
