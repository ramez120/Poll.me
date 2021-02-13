import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllSurveys  } from "../../actions";
import SurveyItem from "./SurveyItem";
import Box from "@material-ui/core/Box";
import TvOffIcon from "@material-ui/icons/TvOff";
import {Grid} from '@material-ui/core';
import { useState } from "react";

const SurveyList = ({ getAllSurveys, surveys , auth}) => {
  useEffect(() => {
    getAllSurveys();
  }, []);
 
  const renderContent = () => {
   if(!surveys ) return null;
   if (surveys.length < 1 && auth) {
      return (
        <div>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            height = "80vh"
            style = {{textAlign : 'center'}}
          >
            <TvOffIcon style = {{color : '#f66f61', fontSize : '50'}} />
            <h2>No Surveys yet .. Why don't you create your one?</h2>
          </Box>
        </div>
      );
    } 
 
    else{
    return  (<Grid container className = "mt-3"  >
      {
      surveys.map((survey, index) => {
      return (
        <SurveyItem
          key={survey.subject}
          subject={survey.subject}
          body={survey.body}
          dateSent={new Date(Date.parse(survey.dateSent)).toUTCString()}
          index={index}
          noOfYesResponses={survey.yes}
          noOfNoResponses={survey.no}
        />
      );
    })
  }
    </Grid>
    )
}

  
  };
  return renderContent();
};
const mapStateToProps = ({ surveys, auth }) => {
  console.log(surveys);
  return { surveys, auth };
};
export default connect(mapStateToProps, {
  getAllSurveys,
})(SurveyList);
