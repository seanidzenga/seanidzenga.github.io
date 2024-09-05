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
  const [caretClass, setCaretClass] = useState();

  // let phraseCounter = 0;

  // we'll need an array of strings, these strings will be the "things I am"
  // we'll store a counter, the counter will reset to 0 once it hits the length of the array
  // we'll use the counter to find the next string to rewrite

  const UpdateTypewriter = () => {

    if(buffer.length > 0){

      // there's stuff in the buffer, we want to erase it one character at a time
      setCaretClass('solid-caret');

      let tempBuffer = buffer;

      while(tempBuffer.length > 0){
        tempBuffer = tempBuffer.slice(0, tempBuffer.length -1);
        setBuffer(tempBuffer);
        setTimeout(200);
      }

      // while(buffer.length > 0){
        // setBuffer(buffer.slice(0, buffer.length -1));
        // setTimeout(2000);
      // }
      // setCaretClass('blinking-caret');
    }

    // setCaretClass('blinking-caret');
  }

  useEffect(() => {
    const interval = setInterval(
      UpdateTypewriter,
      1000,
    );

    return () => clearInterval(interval);
  });

  return(
    <div className="typewriter mt-3 text-lg leading-relaxed text-subtext1 code">
      {buffer}
      <span className={caretClass}>█</span>
    </div>
  );
};

export default Typewriter;