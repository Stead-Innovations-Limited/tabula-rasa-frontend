import BusinessCard from "./BusinessCard";
import PersonalCard from "./PersonalCard";

export default function PickAccountContainer() {
  return (
    <section className='w-full h-screen '>
      <div className='w-full flex flex-col items-center justify-center gap-8 py-14 px-5 md:py-20'>
        {/* The main content */}
          <div className='font-nunito flex flex-col items-center gap-2 text-center text-olive'>
            <h1 className='text-2xl font-bold'>Create Your Tabula Rasa Account</h1>
            <p className='text-xl text-muted-foreground text-balance'>
              Select Your Account Type
            </p>
          </div>
          {/* The container for the cards */}
          <div className="w-full flex flex-col md:flex-row items-start justify-center gap-5">
            <PersonalCard />
            <BusinessCard />
          </div>
      </div>
    </section>
  );
}
