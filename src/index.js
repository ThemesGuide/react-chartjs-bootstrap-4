import React from "react";
import ReactDOM from "react-dom";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Charts from "./components/Charts";
import HeaderHtml from "./components/templates/HeaderHtml";

function App() {
  return (
    <div>
      <HeaderHtml />
      <div className="container py-3">
        <Charts />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
