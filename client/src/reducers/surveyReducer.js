import {getSurveys} from '../actions/types';

const surveyReducer = (state = [], action)=>{
    switch(action.type){
        case getSurveys :
            return action.payload;
            default :
            return null;
    }
}
export default surveyReducer;