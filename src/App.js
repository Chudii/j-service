import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [state, setState] = useState({})
  const [score, setScore] = useState(0)
  
  const getQuestion = (evt) => {
      fetch("http://jservice.io/api/random")
      .then(res => res.json())
      .then(json => {
        setState(json[0])
        updateQuestion(json[0])
      })
      .catch(err => console.log(err))
  }

  const updateQuestion = (data) => {
    if (data) {
      const question = document.querySelector('.question')
      const category = document.querySelector('.category')
      const points = document.querySelector('.points')
      const answer = document.querySelector('.answer')
      const incButton = document.querySelector('#incButton')
      const decButton = document.querySelector('#decButton')
      const scoreTrack = document.querySelector('.score')

      incButton.disabled = false
      decButton.disabled = false
      category.innerHTML = data.category.title
      points.innerHTML = data.value || 0
      question.innerHTML = data.question
      answer.style.display = 'none'
      answer.innerHTML = data.answer
      scoreTrack.innerHTML = score
    }
  }

  const getAnswer = (evt) => {
    const answer = document.querySelector('.answer')
    answer.style.display = 'block'
  }

  const incScore = (evt, currentScore) => {
    evt.preventDefault()

    setScore(currentScore + state.value)
    const incButton = document.querySelector('#incButton')
    const decButton = document.querySelector('#decButton')
    const scoreTrack = document.querySelector('.score')
    scoreTrack.innerHTML = `${currentScore} (+${state.value})`
    incButton.disabled = true
    decButton.disabled = true
  }

  const decScore = (evt, currentScore) => {
    evt.preventDefault()
    setScore(currentScore - state.value)
    const incButton = document.querySelector('#incButton')
    const decButton = document.querySelector('#decButton')
    const scoreTrack = document.querySelector('.score')
    scoreTrack.innerHTML = `${currentScore} (-${state.value})`
    incButton.disabled = true
    decButton.disabled = true
    
    
  }

  return (
    <div className="App">
      <div className='welcome'>
        <h1>* jService JEOPARDY *</h1>
      </div>

      <div className='card'>
        <div className='score-card'>
          <div className='score-section'>
            <h2>Score: </h2>
            <p className='score'>-</p>
          </div>
          
          <div className='buttons'>
            <button id='incButton' onClick={evt => incScore(evt, score)}>Increase</button>
            <button id='decButton' onClick={evt => decScore(evt, score)}>Decrease</button>
            <button id='resetButton' onClick={() => document.location.reload(true)}>Reset</button>
          </div>
        </div>

        <div className='question-card'>
          <h2>Lets play!</h2>
          <button id='questionButton' onClick={evt => getQuestion(evt)}>Get Question</button>
          <div className='question-category'>
            <h3>Category: </h3>
            <p className='category'>-</p>
          </div>
          <div className='question-points'>
            <h4>Points: </h4>
            <p className='points'>-</p>
          </div>
          <div className='question-description'>
            <h2>Description: </h2>
            <p className='question'>-</p>
          </div>
        </div>
      </div>
      <button id='answerButton' onClick={evt => getAnswer(evt)}>Click to Reveal Answer </button>
      <div className='question-answer'>
        <h3 className='answer'></h3>
      </div>
    </div>
  );
}

export default App;
