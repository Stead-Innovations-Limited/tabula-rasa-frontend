import Image from "next/image";

function AfterHero() {
  return (
    <section className='hidden lg:block relative -top-36 -z-[20]'>
      <div className='hidden relative lg:block w-full lg:h-[27rem] bg-olive '>
        <Image src="/shadow-lg.png" alt="shadow" fill={true} className="hidden lg:block aspect-[635/216] -right-[20%] relative z-1" />
      </div>
    </section>
  );
}

export default AfterHero;
