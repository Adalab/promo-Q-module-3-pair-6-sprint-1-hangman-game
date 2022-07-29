import '../styles/App.scss';
import { useState } from 'react';

function App() {
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  // const handleClick = (ev) => {
  //   ev.preventDefault();
  //   setNumberOfErrors(numberOfErrors + 1);
  //   console.log('soy el boton');
  // };

  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('katakroker');
  const [userLetters, setUserLetters] = useState([]);

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, i) => {
      if(!userLetters.includes(letter)) {
        return <li key={i} className="letter"></li>
      } else {
        return <li key={i} className="letter">{letter}</li>
      }
       
    })
  }

  const renderErrorLetters = () => {
    console.log(userLetters);
     const filteredLetters =  userLetters.filter((letter) => !word.includes(letter))
     //setNumberOfErrors()
    return filteredLetters.map((letter) => <li className="letter">{letter}</li>)
  }

  const handleLastLetter = (ev) => {
    console.log(ev.currentTarget.value);
    if (ev.currentTarget.value.search(/[a-zA-ZñÑáÁéÉíÍóÓúÚ]/) === 0) {
      // Letra buena
      setLastLetter(ev.currentTarget.value);
      setUserLetters([... userLetters,ev.currentTarget.value ])
    } else {
      // Letra mala
      console.log('Letra mala', ev.currentTarget.value);
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
            <ul className="letters">{renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
            {renderErrorLetters()}
            </ul>
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
