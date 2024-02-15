import React from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends React.Component {
  static defaultProps = {
    country: "in",
    pazeSize: "20",
    catagory: "general",
  };
  static PropType = {
    country: PropTypes.string,
    pazeSize: PropTypes.number,
    catagory: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
    apiKey: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired,
  };
  capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  constructor(props) {
    super(props);
    document.title = `${this.capitalize(this.props.catagory)} - Akhbar`;
    this.state = {
      articals: [],
      isloading: true,
      page: 1,
      disableNext: false,
      totalRecord: 0,
    };
  }
  updateNews = async (newPage) => {
    const articalAPI = `${this.props.api}?country=${
      this.props.country
    }&category=${this.props.catagory}&apiKey=${this.props.apiKey}&page=${
      newPage || this.state.page
    }&pageSize=${this.props.pazeSize}`;
    this.props.setProgress(60);
    const data = await fetch(articalAPI);
    this.props.setProgress(90);
    const articals = await data.json();
    this.props.setProgress(100);
    this.setState({
      articals: this.state.articals.concat(articals.articles),
      totalRecord: articals.totalResults,
    });
  };
  async componentDidMount() {
    this.props.setProgress(40);
    this.updateNews();
  }

  render(props) {
    const fetchData = async (type) => {
      const currentPage = this.state.page;
      const newPage = type === "P" ? currentPage - 1 : currentPage + 1;
      this.setState({ page: newPage });
      this.updateNews(newPage);
      const isLastPage =
        Math.ceil(this.state.totalRecord - newPage * this.props.pazeSize) > 0
          ? false
          : true;
      this.setState({
        disableNext: isLastPage,
      });
    };
    return (
      <div className="container my-3">
        <h3>Todays Top {this.capitalize(this.props.catagory)} Headlines</h3>
        {/* {this.state.isloading ? (
          <Loader />
        ) :  */}
        <div>
          <div className="container my-3">
            <InfiniteScroll
              dataLength={this.state.articals.length}
              next={fetchData}
              hasMore={!this.state.disableNext}
              loader={<Loader />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  {this.state.disableNext ? (
                    <b>Yay! You have seen it all</b>
                  ) : (
                    <Loader />
                  )}
                </p>
              }
            >
              <div className="row">
                {this.state.articals &&
                  this.state.articals.map((element, i) => {
                    const {
                      title = "",
                      description = "",
                      urlToImage = "https://i.pinimg.com/564x/30/f0/d1/30f0d1c2b9163476c86a5902af9920e9.jpg",
                      url,
                      author,
                      publishedAt,
                      source,
                    } = element;
                    return (
                      <div className="col-md-4" key={i}>
                        <NewsItem
                          title={title && title.slice(0, 40) + "..."}
                          description={
                            description && description.slice(0, 80) + "..."
                          }
                          imageUrl={urlToImage}
                          newsUrl={url}
                          author={author}
                          publishedAt={publishedAt}
                          source={source.name}
                        />
                      </div>
                    );
                  })}
              </div>
            </InfiniteScroll>
          </div>
          {/* <div className="container my-3 d-flex justify-content-between">
            <button
              disabled={this.state.page < 2}
              type="button"
              className="btn btn-dark"
              onClick={() => fetchData("P")}
            >
              Previes
            </button>
            <button
              disabled={this.state.disableNext}
              type="button"
              className="btn btn-dark"
              onClick={() => fetchData("U")}
            >
              Next
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
