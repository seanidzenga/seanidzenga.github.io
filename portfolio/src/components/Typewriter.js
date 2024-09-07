import React from 'react';
import { useState, useEffect } from 'react';

const Typewriter = () => {
  
  const phrases = [
    "Software Developer",
    "Disk Jockey",
    "Game Developer",
    "Cyber Punk"
  ];

  const [buffer, setBuffer] = useState(phrases[0]);
  const [caretClass, setCaretClass] = useState('blinking-caret');
  const [direction, setDirection] = useState('erasing');
  const [prevDirection, setPrevDirection] = useState('erasing');
  const [currentPhrase, setCurrentPhrase] = useState(0);

  // let phraseCounter = 0;

  // we'll need an array of strings, these strings will be the "things I am"
  // we'll store a counter, the counter will reset to 0 once it hits the length of the array
  // we'll use the counter to find the next string to rewrite

  useEffect(() => {

    // main loop - controls the flow to each state (erasing, writing)

    let interval;

    if(direction === 'erasing'){

      setCaretClass('');
      setPrevDirection('erasing');

      interval = setInterval(() => {

        setBuffer((prevBuffer) => {
  
          if(prevBuffer.length === 0){
  
            setDirection('pausing');
            clearInterval(interval);
            return '';
          }
  
          return prevBuffer.slice(0, -1);
        });
      }, 100); // delay 100, todo - make that a prop
    }

    if(direction === 'writing'){
      
      setCaretClass('');
      setPrevDirection('writing');

      interval = setInterval(() => {

        setBuffer((prevBuffer) => {

          if(buffer.length >= phrases[currentPhrase].length){

            setDirection('pausing');
            clearInterval(interval);
            return buffer;
          }

          return prevBuffer += phrases[currentPhrase][prevBuffer.length]
        });
      }, 100);
    }

    if(direction === 'pausing'){

      setCaretClass('blinking-caret');
      
      interval = setInterval(() => {

        // in the pause state we decide what the next state is
        if(prevDirection === 'writing'){
          setDirection('erasing');
          setPrevDirection('pausing');
        }else{
          if(currentPhrase >= phrases.length -1){
            setCurrentPhrase(0);
          }else{
            setCurrentPhrase(currentPhrase +1);
          }
          setDirection('writing');
          setPrevDirection('pausing');
        }

        clearInterval(interval);

      }, 2000); // delay 2s, todo - make this a 'pause between changes' prop
    }

    if(interval === null){
      return;
    }

    return () => clearInterval(interval);
  }, [buffer, direction, phrases, currentPhrase, prevDirection]);

  return(
    <div className="typewriter mt-3 text-lg leading-relaxed text-subtext1 code">
      {buffer}
      <span className={caretClass}>█</span>
    </div>
  );
};

export default Typewriter;