import '../styles/App.scss';
import { useEffect, useState } from 'react';
import callToApi from '../services/api';

function App() {
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  // const handleClick = (ev) => {
  //   ev.preventDefault();
  //   setNumberOfErrors(numberOfErrors + 1);
  //   console.log('soy el boton');
  // };

  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);

  useEffect(() => {
    callToApi().then((data) => {
      setWord(data.word);
    });
  }, []);

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, i) => {
      if (!userLetters.includes(letter)) {
        return <li key={i} className="letter"></li>;
      } else {
        return (
          <li key={i} className="letter">
            {letter}
          </li>
        );
      }
    });
  };

  const renderErrorLetters = () => {
    console.log(userLetters);
    const filteredLetters = userLetters.filter(
      (letter) => !word.includes(letter)
    );
    // setNumberOfErrors(filteredLetters.length);
    return filteredLetters.map((letter, index) => (
      <li className="letter" key={index}>
        {letter}
      </li>
    ));
  };

  const handleLastLetter = (ev) => {
    console.log(ev.currentTarget.value);
    let lowerCaseWord = ev.currentTarget.value.toLowerCase();

    if (lowerCaseWord.search(/[a-zA-ZñÑáÁéÉíÍóÓúÚ]/) === 0) {
      // Letra buena
      setLastLetter(lowerCaseWord);
      setUserLetters([...userLetters, lowerCaseWord]);
    } else {
      // Letra mala
      console.log('Letra mala', lowerCaseWord);
    }

    // ev.currentTarget.value === /^[A-Za-z]+$/ ?  setLastLetter(ev.currentTarget.value)};
  };

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">{renderSolutionLetters()}</ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">{renderErrorLetters()}</ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              onChange={handleLastLetter}
              value={lastLetter}
            />
          </form>
          {/* <button className="button" onClick={handleClick}>
            Incrementar
          </button> */}
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>
    </div>
  );
}

export default App;
