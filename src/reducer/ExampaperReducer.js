import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_Exam,
} from './types.js';

function ExampaperReducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_ANSWER:
            return {
                ...state,
                currentAnswer: action.currentAnswer,
            };
        case SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.currentQuestion,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case SET_SHOW_RESULTS:
            return {
                ...state,
                showResults: action.showResults,
            };
        case SET_ANSWERS:
            return {
                ...state,
                answers: action.answers,
            };
        case RESET_Exam:
            return {
                ...state,
                answers: [],
                currentQuestion: 0,
                currentAnswer: '',
                showResults: false,
                error: '',
            };
        default:
            return state;
    }
}

export default ExampaperReducer;