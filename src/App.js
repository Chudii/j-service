import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({ category: { title: ''} })
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const answer = document.querySelector('.answer')
  const incButton = document.querySelector('#incButton')
  const decButton = document.querySelector('#decButton')

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const getQuestion = (evt) => {
    evt.preventDefault()
    fetch("http://jservice.io/api/random")
      .then(res => res.json())
      .then(json => setState(json[0]))
      .catch(err => console.log(err))
    console.log(state.question)
    answer.style.display = 'none'
  }

  const getAnswer = () => {
    answer.style.display = 'block'
  }

  const incScore = () => {
    setScore(score + state.value)
  }

  const decScore = () => {
    setScore(score - state.value)
  }

  return (
    <div className="App">
      <div className='welcome'>
        <h1>* jService JEOPARDY *</h1>
      </div>
      
      <div className='score-card'>
        <div className='score-section'>
          <h2>Score: </h2>
          <p className='score'>{score}</p>
        </div>
      </div>

      <div className='buttons'>
        <button id='incButton' onClick={incScore}>Increase</button>
        <button id='decButton' onClick={decScore}>Decrease</button>
        <button id='resetButton' onClick={() => document.location.reload(true)}>Reset</button>
      </div>

      <div className='question-card'>
        <h2>Let's play!</h2>
        <button id='questionButton' onClick={(evt) => getQuestion(evt)}>Get Question</button>
      </div>
      
      {!isLoading ?
        <>
          <div className='question-category'>
            <h3>Category: </h3>
            <p className='category'>{state.category.title}</p>
          </div>
      
          <div className='question-points'>
            <h4>Points: </h4>
            <p className='points'>{state.value}</p>
          </div>

          <div className='question-description'>
            <h3>description: </h3>
            <p className='question'>{state.question}</p>
          </div>
        </>
        : <>
          <div className='question-category'>
            <h3>Category: </h3>
            <p className='category'>-</p>
          </div>
      
          <div className='question-points'>
            <h4>Points: </h4>
            <p className='points'>-</p>
          </div>

          <div className='question-description'>
            <h3>Description: </h3>
            <p className='question'>-</p>
          </div>
        </>
      }
      <button id='answerButton' onClick={evt => getAnswer(evt)}>Click to Reveal Answer </button>
      <div className='question-answer'>
        <h3 className='answer'>{state.answer}</h3>
      </div>
    </div>
  );
}

export default App;
