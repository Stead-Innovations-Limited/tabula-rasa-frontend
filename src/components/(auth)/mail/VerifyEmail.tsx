"use client";

import { useEffect, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  IoMail,
  RiMailCloseFill,
} from "@/components/icons";
import ReSendButton from "./reSendButton";
import verifyEmail from "@/server-actions/verifyEmail";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function VerifyEmail({ token }: { token?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null | false>(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // Get email from local storage
    const mail = localStorage.getItem("email") || null;
    if (mail) {
      setEmail(mail);
    }
    
    if(token) {
      const req = async () => {
        const verificationResponse = (await verifyEmail(token)) as {
          error: boolean;
          errorMessage?: string;
          message?: string;
        };

        if (verificationResponse.error === false) {
          toast.success("Email verified successfully!", {
            classNames: {
              toast: "!text-green-700",
              title: "!text-green-700",
              description: "!text-green-700",
            },
          });

          setTimeout(() => {
            router.push("/login");
          }, 700);
        } else {
          setErrorMessage(
            verificationResponse.errorMessage ?? "Verification failed."
          );
        }
      };

      req();
    }

    setLoading(false);
  }, [router, token]);

  const skeleton = (
    <main className='w-full h-screen flex flex-col items-center justify-center bg-cream text-[#565656] font-roboto p-5 md:p-0'>
      <div className='flex flex-col items-center justify-center py-10 gap-10 w-full max-w-xl mx-auto rounded-3xl shadow-lg p-8 overflow-clip'>
        <AiOutlineLoading3Quarters className='animate-spin size-28 text-olive' />
      </div>
    </main>
  );

  if (loading) return skeleton;

  if (email && !token) {
    return (
      <>
        <main className='w-full h-screen flex flex-col items-center justify-center bg-cream text-[#565656] font-roboto p-5 md:p-0'>
          <div className='flex flex-col gap-8 md:gap-10 lg:gap-12 w-full md:max-w-2xl lg:max-w-4xl h-fit mx-auto rounded-3xl shadow-lg p-5 md:p-8 lg:p-12'>
            <div className=''>
              {/* Icon div */}
              <div className=''>
                <IoMail className='text-olive text-9xl mx-auto' />
              </div>
              {/* Instructions */}
              <p className='font-medium text-xl text-center leading-[40px]'>
                We&rsquo;ve sent a confirmation email to{" "}
                <span className='text-lightgreen'>{email}</span> to verify your
                email. Please check your inbox and click the link to complete
                your registration.
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }
  if (!errorMessage) return skeleton;

  if(token && errorMessage) {
    return (<main className='w-full h-screen flex flex-col items-center justify-center bg-cream text-[#565656] font-roboto p-5 md:p-0'>
      <div className='flex flex-col gap-10 w-full max-w-xl mx-auto rounded-3xl shadow-lg p-8'>
        <RiMailCloseFill className='text-destructive text-9xl mx-auto' />
        <p className='font-medium text-xl text-center leading-[40px]'>
          {errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
        </p>
        <hr className='border-olive' />
        <div className='flex items-center justify-center gap-1 font-normal text-lg text-center'>
          <p>Didn’t get the mail?</p>
          <ReSendButton token={token} />
        </div>
      </div>
    </main>)
  };

  return skeleton;
}
