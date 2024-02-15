import React from "react";
import Navbar from "./component/Navbar";
import News from "./component/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

class App extends React.Component {
  pageSize = 20;
  state = {
    progress: 10,
  };
  apiKey = process.env.REACT_APP_API_KEY;
  api = process.env.REACT_APP_API;
  setProgres = (val) => {
    this.setState({ progress: val });
  };
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color="#f11946"
          height={"3px"}
          progress={this.state.progress}
          onLoaderFinished={() => this.setState({ process: 0 })}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="general"
                pazeSize={this.pageSize}
                country="In"
                catagory="general"
              ></News>
            }
          ></Route>
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="business"
                pazeSize={this.pageSize}
                country="In"
                catagory="business"
              ></News>
            }
          ></Route>
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="entertainment"
                pazeSize={this.pageSize}
                country="In"
                catagory="entertainment"
              ></News>
            }
          ></Route>
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="health"
                pazeSize={this.pageSize}
                country="In"
                catagory="health"
              ></News>
            }
          ></Route>
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="technology"
                pazeSize={this.pageSize}
                country="In"
                catagory="technology"
              ></News>
            }
          ></Route>
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="science"
                pazeSize={this.pageSize}
                country="In"
                catagory="science"
              ></News>
            }
          ></Route>
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={this.setProgres}
                apiKey={this.apiKey}
                api={this.api}
                key="sports"
                pazeSize={this.pageSize}
                country="In"
                catagory="sports"
              ></News>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
