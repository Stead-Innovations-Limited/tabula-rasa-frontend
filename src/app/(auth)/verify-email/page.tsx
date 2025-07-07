import VerifyEmail from "@/components/(auth)/mail/VerifyEmail";

import { RiMailCloseFill } from "@/components/icons";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <main className='w-full h-screen flex flex-col items-center justify-center bg-cream text-[#565656] font-roboto p-5 md:p-0'>
        <div className='flex flex-col gap-10 w-full max-w-xl mx-auto rounded-3xl shadow-lg p-8'>
          <RiMailCloseFill className='text-destructive text-9xl mx-auto' />
          <p className='font-medium text-xl text-center leading-[40px]'>
            No token provided. Please check the link in your email or contact
            support if you believe this is an error.
          </p>
        </div>
      </main>
    );
  }

  return <VerifyEmail token={token} />;
}
