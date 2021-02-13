import { Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from "react-router-dom";
import SurveyList from './SurveyList';
import "./Dashboard.css";

const DashBoard = () => {

  return (
    <Container className="cont-relative">
     <SurveyList/>
     
      <Button variant="contained" className="fixed-btn" disableRipple>
      <Link to= "/surveys/new">
        <AddCircleIcon className="fixed-icon" style = {{fontSize : 70}}/>
        </Link>
      </Button>
      
    </Container>
  );
};
export default DashBoard;
