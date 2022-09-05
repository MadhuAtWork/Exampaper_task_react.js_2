import React, {useContext} from 'react';
import ExamContext from '../context/ExamContext';

function Question() {
    const {state} = useContext(ExamContext);
    const {currentQuestion, questions} = state;
    const question = questions[currentQuestion];
    return <h1>{question.question}</h1>;
}

export default Question;