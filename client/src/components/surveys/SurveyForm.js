import _ from "lodash";
import { Field, reduxForm } from "redux-form";
import {Link} from 'react-router-dom';
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SurveyField from "./SurveyField";
import DoneIcon from "@material-ui/icons/Done";
import ReceiptIcon from "@material-ui/icons/Receipt";
import valdiateEmails from "../../utils/validateEmails";
import formFields from './formFields';
import "./SurveyForm.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));


const SurveyForm = (props) => {
  const classes = useStyles();
  const renderFields = () => {
    return _.map(formFields, ({ name, label }) => {
      return (
        <Field
          label={label}
          name={name}
          type="text"
          component={SurveyField}
          key={name}
        />
      );
    });
  };

  return (
    <Container>
      <div className="d-flex-center-center">
        <form
          onSubmit={props.handleSubmit(props.onFormSubmit)}
          className={classes.root}
        >
          <div className="disp-flex">
            <h3>
              Create a new Survey <ReceiptIcon className="new-survey-icon" />
            </h3>
          </div>
          {renderFields()}
          <div className="align-between">
            <Button variant="contained" className="cancel-btn">
              <Link to = "/surveys" className = "no-decorations">
              Cancel
              </Link>
            </Button>
            <Button variant="contained" type="submit" className="next-btn">
              Next <DoneIcon />
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};
const validate = (values) => {
  const errors = {};
  _.each(formFields, ({ name, notFoundError }) => {
    errors.recipients = valdiateEmails(values.recipients || "");
    if (!values[name]) {
      errors[name] = notFoundError;
    }
  });
  return errors;
};
export default reduxForm({
  form: "surveyForm",
  validate,
  destroyOnUnmount : false
})(SurveyForm);
