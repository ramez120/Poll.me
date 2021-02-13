import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import './Landing.css';
import {Container} from '@material-ui/core';
const Landing = ({auth,history}) =>{
 if(auth){
    history.push("/surveys");
 }
return (
    
    <div className = "landing">
        <Container>
        <div className = "d-flex">
            <div>
            <h1>Poll.me</h1>
            <div className = "desc">Send Surverys and get feedback now!</div>
            </div>
        </div>
        </Container>
    </div>
    
)
}
const mapStateToProps = ({auth}) =>{
    console.log(auth)
    return {auth };


}
export default connect (mapStateToProps) (withRouter(Landing));