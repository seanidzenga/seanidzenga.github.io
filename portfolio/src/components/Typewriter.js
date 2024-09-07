import React from 'react';
import { useState, useEffect } from 'react';

const Typewriter = ({writeSpeed = 100, deleteSpeed = 100, pauseDuration = 5000, phrases}) => {

  const [buffer, setBuffer] = useState(phrases[0]);
  const [caretClass, setCaretClass] = useState('blinking-caret');
  const [direction, setDirection] = useState('erasing');
  const [prevDirection, setPrevDirection] = useState('erasing');
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {

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
      }, deleteSpeed);
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
      }, writeSpeed);
    }

    if(direction === 'pausing'){

      setCaretClass('blinking-caret');

      interval = setInterval(() => {

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

      }, pauseDuration);
    }

    if(interval === null){
      return;
    }

    return () => clearInterval(interval);
  }, [direction, deleteSpeed, writeSpeed, buffer, phrases, currentPhrase, pauseDuration, prevDirection]);

  return(
    <div className="typewriter mt-3 text-lg leading-relaxed text-subtext1 code">
      {buffer}
      <span className={caretClass}>█</span>
    </div>
  );
};

export default Typewriter;