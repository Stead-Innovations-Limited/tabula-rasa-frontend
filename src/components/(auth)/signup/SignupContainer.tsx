import SignupForm from "./SignupForm";

export default function SignupContainer() {
  return (
    <div className='w-full h-screen'>
      <div className='w-full h-full md:h-fit flex items-center justify-center md:py-20'>
        <SignupForm />
      </div>
    </div>
  );
}
