import Typewriter from './Typewriter';

function Hero({ headline }){
  return(
    <section class="py-24 flex items-center min-h-screen justify-center bg-crust">
      <div class="mx-auto max-w-[43rem]">
        <div class="text-center">
          <h1 class="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-lavender">{headline}</h1>
          <Typewriter/>
        </div>
      </div>
    </section>
  );
}

export default Hero;