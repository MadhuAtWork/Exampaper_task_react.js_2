import React, { useReducer } from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import ExamContext from './context/ExamContext';

import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_Exam,
} from './reducer/types.js';
import ExampaperReducer from './reducer/ExampaperReducer';

import './App.css';

function App() {
  const questions = [
    {
      id: 1,
      question: 'Which statement about Hooks is not true?',
      answer_a:
        'Hooks are 100% backwards-compatible and can be used side by side with classes',
      answer_b: 'Hooks are still in beta and not available yet',
      answer_c:
        "Hooks are completely opt-in, there's no need to rewrite existing code",
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 2,
      question: 'Which one is not a Hook?',
      answer_a: 'useState()',
      answer_b: 'useConst()',
      answer_c: 'useReducer()',
      answer_d: 'All of the above',
      correct_answer: 'b',
    },
    {
      id: 3,
      question: 'What Hook should be used for data fetching?',
      answer_a: 'useDataFetching()',
      answer_b: 'useApi()',
      answer_c: 'useEffect()',
      answer_d: 'useRequest()',
      correct_answer: 'c',
    },
    {
      question: "What is the most preferred image format used for logos in the Wikimedia database?",
      answer_a: ".svg",
      answer_b: ".png",
      answer_c: ".jpeg",
      answer_d: ".gif",
      correct_answer: 'a'
    },

  ]


  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: '',
    answers: [],
    showResults: false,
    error: '',
  };

  const [state, dispatch] = useReducer(ExampaperReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className="error">{error}</div>;
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className="correct">Correct{question.correct_answer}</span>;
    }
    return <span className="failed">Failed   correct_answer  :_{question.correct_answer}</span>;
  };

  const renderResultsData = () => {
    return answers.map(answer => {
      const question = questions.find(
        question => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_Exam });
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };
    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: 'Please select an option' });
      return;
    }
    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  
  const back = () => {
    if (currentQuestion - 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion - 1,
      });
    }

  }
  if (showResults) {
    return (
      <div className="container results">
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <ExamContext.Provider value={{ state, dispatch }}>
        <div className="container">
          <Progress
            total={questions.length}
            current={currentQuestion + 1}
          />
          <Question />
          {renderError()}
          <Answers />
          <div className='button'>
            <button className="btn btn-primary" onClick={back} > back</button>
            <button className="btn btn-secondary" onClick={next}>
              Confirm and Continue
            </button>
          </div>

        </div>
      </ExamContext.Provider>
    );
  }
}

export default App;
