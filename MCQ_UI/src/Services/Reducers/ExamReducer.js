import {
    LOAD_EXAM_DETAILS,
    LOAD_QUESTIONS,
    MARKED_QUESTIONS,
    UPDATE_MARKEDQUES,
    UPDATE_MINUTES,
    IS_ATTEMPTED,
    CURRENT_QUES_PRO,
    CURRENT_QUES_BACK,
    DECREMENT_MINUTES,
    ONEXAMUPDATE,
    INITIALIZE_EXAM_DETAILS,
    NOT_ATTEMPTED
    // DELETE_TEMP_DETAILS
} from '../Constants';
const initialState = {
    examdetails: null,
    tempdetails:null,
    questions: [],
    isattempted:false,
    currentquestion:1,
    markedques:[],
    minutes:10,
    onexamid:0
}
export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOAD_EXAM_DETAILS:
            return {
                ...state,
                examdetails: payload
            }
        
            
        // case DELETE_TEMP_DETAILS:
        //     return {
        //         ...state,
        //         tempdetails: null
        //     }
        case INITIALIZE_EXAM_DETAILS:
            return {
                ...initialState
            }
        case IS_ATTEMPTED:
            return {
                ...state,
                isattempted: true
            }
        case NOT_ATTEMPTED:
            return {
                ...state,
                isattempted: false
            }
        case ONEXAMUPDATE:
            return {
                ...state,
                onexamid: payload
            }
        case CURRENT_QUES_PRO:
            return {
                ...state,
                currentquestion: state.currentquestion+1
            }
        case CURRENT_QUES_BACK:
            return {
                ...state,
                currentquestion: state.currentquestion-1
            }
        case LOAD_QUESTIONS:
            return {
                ...state,
                questions: payload
            }
        case MARKED_QUESTIONS:
            return {
                ...state,
                markedques: payload
            }
        case UPDATE_MARKEDQUES: 
            state.markedques[state.currentquestion-1]=payload
            return { 
             ...state, 
             markedques:state.markedques
            }
        case UPDATE_MINUTES: 
            return { 
             ...state, 
            minutes:payload
            }
        case DECREMENT_MINUTES: 
        console.log(state.minutes);
            return { 
             ...state, 
            minutes:state.minutes-1
            }
        default:
            return state
    }
};
