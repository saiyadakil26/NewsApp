import React from "react";
import loader from "./loader.gif";

export default class Loader extends React.Component {
  render() {
    return (
      <div className="text-center">
        <img src={loader} alt="Loader" />
      </div>
    );
  }
}
