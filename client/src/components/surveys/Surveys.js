import {connect} from 'react-redux';
import DashBoard from './Dashboard';
import { withRouter } from "react-router-dom";
import { useEffect } from 'react';
const Surveys = ({auth, history}) =>{
    useEffect(() => {
    
    
    }, [])
  
    
    return <DashBoard/>;
}
const mapStateToProps = ({auth}) =>{
    return {auth}
}
export default connect(mapStateToProps) (withRouter(Surveys));