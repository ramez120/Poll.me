import axios from "axios";
import { getLoginStatus, getSurveys } from "./types";
export const getUserLoginStatus = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({
    type: getLoginStatus,
    payload: res.data,
  });
};
export const submitSurvey = (values, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/surveys", values).catch((error) => {});

    dispatch({
      type: getLoginStatus,
      payload: res.data,
    });
    history.push("/surveys");
  } catch (error) {
    alert("sorry, add some credits first!");
    history.push("/checkout");
  }
};
export const getAllSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({
    type: getSurveys,
    payload: res.data,
  });
};
