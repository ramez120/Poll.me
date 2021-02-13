import { Container } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import {reduxForm} from 'redux-form';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from './SurveyFormReview';
const SurveyNew = (props) => {
  const [showFormReview, setShowFormReview] = useState(false);
  if (!props.auth) {
    return null;
  }

  const renderContent = () =>{
    if(showFormReview){
      return <SurveyFormReview onCancel = {() => setShowFormReview(false)}/>
    }
    return <SurveyForm onFormSubmit = {() => setShowFormReview(true)}/>
  }
  return (
    <Container>
     
     {renderContent()}
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default reduxForm({
  form: 'surveyForm'
})(connect(mapStateToProps)(SurveyNew));
