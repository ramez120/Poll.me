import { connect } from "react-redux";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Link, Router } from "react-router-dom";
import { getUserLoginStatus } from "../actions";
import Header from "./header/Header";
import Surveys from "./surveys/Surveys";
import history from "./history";
import Landing from "./Landing";
import Thanks from "./Thanks";
import SurveyNew from "./surveys/SurveyNew";
import "./App.css";
import StripePayment from "./checkout/StripePayments";

const App = (props) => {
  useEffect(() => {
    props.getUserLoginStatus();
  }, []);

  return (
    <BrowserRouter>
      <Route component={Header}></Route>
      <Route path="/" component={Landing} exact></Route>
      <Route path="/surveys/new" component={SurveyNew} exact></Route>
      <Route path="/surveys" component={Surveys} exact></Route>
      <Route path="/checkout" component={StripePayment} exact></Route>
      <Route path="/surveys/:id/yes" component={Thanks} exact></Route>
      <Route path="/surveys/:id/no" component={Thanks} exact></Route>

    </BrowserRouter>
  );
};
const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps, {
  getUserLoginStatus,
})(App);
