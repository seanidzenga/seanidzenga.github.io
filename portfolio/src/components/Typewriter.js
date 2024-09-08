import React from 'react';
import { useState, useEffect } from 'react';

const Direction = Object.freeze({
  ERASE:   Symbol("erase"),
  WRITE:  Symbol("write"),
  PAUSE: Symbol("pause")
});

const Typewriter = ({writeSpeed = 100, deleteSpeed = 100, pauseDuration = 3000, phrases}) => {

  const [buffer, setBuffer] = useState(phrases[0]);
  const [caretClass, setCaretClass] = useState('blinking-caret');
  const [direction, setDirection] = useState(Direction.PAUSE);
  const [prevDirection, setPrevDirection] = useState(Direction.WRITE);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {

    let interval;

    // ERASING STATE
    if(direction === Direction.ERASE){

      setCaretClass('');
      setPrevDirection(Direction.ERASE);

      interval = setInterval(() => {

        setBuffer((prevBuffer) => {
  
          if(prevBuffer.length === 0){
  
            setDirection(Direction.PAUSE);
            clearInterval(interval);
            return '';
          }
  
          return prevBuffer.slice(0, -1);
        });
      }, deleteSpeed);
    }

    // WRITING STATE
    if(direction === Direction.WRITE){
      
      setCaretClass('');
      setPrevDirection(Direction.WRITE);

      interval = setInterval(() => {

        setBuffer((prevBuffer) => {

          if(buffer.length >= phrases[currentPhrase].length){

            setDirection(Direction.PAUSE);
            clearInterval(interval);
            return buffer;
          }

          return prevBuffer += phrases[currentPhrase][prevBuffer.length]
        });
      }, writeSpeed);
    }

    // PAUSED STATE
    if(direction === Direction.PAUSE){

      // If the last state before pausing was to write then we'll wait for
      // `pauseDuration` before switching to erase -
      // doing so prevents pausing in the erased state.
      if(prevDirection === Direction.WRITE){

        setCaretClass('blinking-caret');

        interval = setInterval(() => {

          setPrevDirection(Direction.PAUSE);
          setDirection(Direction.ERASE);
          clearInterval(interval);
  
        }, pauseDuration);

      } else {

        if(currentPhrase >= phrases.length -1){
          setCurrentPhrase(0);
        }else{
          setCurrentPhrase(currentPhrase +1);
        }
        setDirection(Direction.WRITE);
        setPrevDirection(Direction.PAUSE);
      }
    }

    return () => {
      if(interval !== null){
        clearInterval(interval);
      }
    }
    
  }, [direction, deleteSpeed, writeSpeed, buffer, phrases, currentPhrase, pauseDuration, prevDirection]);

  return(
    <div className="typewriter mt-3 text-lg leading-relaxed text-subtext1 code">
      {buffer}
      <span className={caretClass}>█</span>
    </div>
  );
};

export default Typewriter;