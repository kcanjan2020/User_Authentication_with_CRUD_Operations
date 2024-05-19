import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import MyApp from "./MyApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    {/* <React.StrictMode> */}
    {/* how to call components*/}
    {/* <App /> */}
    <BrowserRouter>
      {/* <App></App> */}
      <MyApp></MyApp>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
