import { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import kidding from './assets/kidding.png';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

library.add(faSpinner);

interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

function App() {
  const [joke, setJoke] = useState<Joke | undefined>();
  const [showPunchLine, setShowPunchLine] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questionGrammar, setQuestionGrammar] = useState('');

  const updateQuestionGrammar = (joke: Joke) => {
    const questionTypes = ['what', 'how', 'why', 'when'];
    if (joke) {
      setQuestionGrammar(
        questionTypes.includes(joke.setup.split(' ')[0].toLowerCase())
          ? `${joke.setup.split(' ')[0]}?`
          : 'What?',
      );
    }
  };

  const onCrackMeUp = () => {
    setIsLoading(true);
    const url = `https://official-joke-api.appspot.com/random_joke`;
    fetch(url)
      .then((response) => response.json())
      .then((joke) => {
        setIsLoading(true);
        setShowPunchLine(false);
        setJoke(joke);
        updateQuestionGrammar(joke);
        setIsLoading(false);
      });
  };

  return (
    <div className='container mx-auto w-full h-screen grid place-content-center'>
      <div className='flex flex-row justify-center'>
        {showPunchLine && <img src={kidding} className='h-48 w-48' />}
      </div>
      <div>{isLoading && <FontAwesomeIcon icon={faSpinner} spin size='2xl' />}</div>
      {joke && (
        <div className='flex flex-col justify-center content-center'>
          <p className='text-lg font-medium text-gray-900'>{joke?.setup}</p>
          {showPunchLine && joke ? (
            <p className='text-lg text-gray-500'>{joke?.punchline}</p>
          ) : (
            <a className='cursor-pointer' onClick={() => setShowPunchLine(true)}>
              {questionGrammar}
            </a>
          )}
        </div>
      )}

      <button className='rounded bg-sky-500/100 p-2 mt-2' onClick={onCrackMeUp}>
        {joke ? 'Generate new one' : 'Crack me up!'}
      </button>
    </div>
  );
}

export default App;
