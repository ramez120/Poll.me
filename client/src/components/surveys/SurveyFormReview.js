import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { submitSurvey } from "../../actions";
import _ from "lodash";
import fromFields from "./formFields";
import "./SurveyFormReview.css";
import { Button, TextField } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const renderFieldsReview = (formValues) => {
    return _.map(fromFields, ({ label, name }) => {
      return (
        <div className="field-cont"  key={name}>
          <TextField
           
            fullWidth
            disabled
            label={label}
            defaultValue={formValues[name]}
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
        </div>
      );
    });
  };
  return (
    <div className="display-flex-center">
      <div className="w-100">
        <h2>Please Confirm Your Entries</h2>
        {renderFieldsReview(formValues)}
        <div className="space-between">
          <Button
            variant="contained"
            onClick={onCancel}
            className="back-btn"
            disableRipple
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() =>submitSurvey(formValues,history )}
            className="submit-btn"
            disableRipple
          >
            Submit <ThumbUpIcon fontSize="small" />
          </Button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};
export default connect(mapStateToProps, {
  submitSurvey,
})(withRouter(SurveyFormReview));
