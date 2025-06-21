import { FiCamera } from "@/components/icons";

export default function PersonalImagePicker() {
  return (
    <section className='w-full flex flex-col items-center gap-6'>
      <div className='bg-olive size-30 md:size-36 rounded-full flex items-center justify-center'>
        <FiCamera className='size-12 md:size-18 text-white' />
      </div>
      <p className='font-roboto text-lg md:text-xl text-center text-olive'>
        A clear profile photo helps personalize your experience.
      </p>
    </section>
  );
}
