// this component will display some messages
// these messages will appear to be "typed out" one at a time and holding for some set amount of time
// before erasing itself and displaying the next message

function Typewriter(){
  return(
    <typewriter class="mt-3 text-lg leading-relaxed text-subtext1 code">
      Software Developer
      <span className="blinking-caret"> █</span>
    </typewriter>
  );
}

export default Typewriter;