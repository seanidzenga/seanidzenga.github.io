import Typewriter from './Typewriter';

function Hero({ headline }){

  const phrases = [
    "Software Developer",
    "Disk Jockey",
    "Game Developer",
    "Cyber Punk"
  ];

  return(
    <section className="py-24 flex items-center min-h-screen justify-center bg-crust">
      <div className="mx-auto max-w-[43rem]">
        <div className="text-center">
          <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-lavender">{headline}</h1>
          <Typewriter phrases={phrases}/>
        </div>
      </div>
    </section>
  );
}

export default Hero;