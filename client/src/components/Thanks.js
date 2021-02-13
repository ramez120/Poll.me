import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './Thanks.css';
const Thanks = () => {
  return (
    <div className="d-f-center">
      <h2>Thanks for Voting !!</h2>
      <CheckCircleOutlineIcon className = "thanks-icon" style = {{fontSize : 40}}/>
    </div>
  );
};
export default Thanks;
