import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
const SurveyField = ({ input, label, meta: { touched, error } }) => {
  const renderError = () => {
    return touched && error ? <Alert severity="error">{error}</Alert> : "";
  };
  return (
    <div>
      <TextField {...input} label={label} variant="standard" fullWidth autoComplete='off' />
      {renderError()}
    </div>
  );
};
export default SurveyField;
