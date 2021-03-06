import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Landing from "./pages/Landing";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import RequireAuth from "./components/auth/RequireAuth";
import Dashboard from "./pages/Dashboard";
import LeaderBoard from "./pages/Leaderboard";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route path="/" component={Landing} exact />
      <Route path="/leaderboard" component={LeaderBoard} />
      <Route path="/dashboard" component={RequireAuth(Dashboard)} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
