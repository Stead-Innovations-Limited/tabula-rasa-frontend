"use client";

import { useEffect, useState } from "react";
import {
  AiOutlineLoading3Quarters,
  IoIosCloseCircle,
  IoMail,
  IoIosCheckmarkCircle
} from "@/components/icons";
import ReSendButton from "@/components/(auth)/mail/reSendButton";
import verifyEmail from "@/server-actions/verifyEmail";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmail({ token }: { token?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null | false>(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailVerified, setEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    // Get email from local storage
    const mail = localStorage.getItem("email") || null;
    if (mail) {
      setEmail(mail);
    }

    if (token) {
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

          setEmailVerified(true);
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

  // If email is verified, we show them that mail has been confirmed, and render a UI that can take them to login
  if (emailVerified && token) {
    return (
      <main className='w-full h-screen flex flex-col items-center justify-center bg-cream text-[#565656] font-roboto p-5 md:p-0'>
        <div className='flex flex-col gap-6 w-full max-w-xl mx-auto rounded-3xl shadow-lg px-8 py-12'>
          {/* Icon div */}
          <div className=''>
            <IoIosCheckmarkCircle className='text-olive text-9xl mx-auto' />
          </div>
          {/* Instructions */}
          <p className='font-medium text-xl text-center leading-[40px]'>
            Your email has been confirmed. You can now log in.
          </p>
          <Button asChild className='bg-olive hover:!bg-olive text-white font-normal text-lg py-4 px-14 mx-auto w-fit'>
            <Link href="/login">
              Continue
            </Link>
          </Button>
        </div>
      </main>
    );
  } 
  // Email Verification failed due to an issue or the other, we provide them a means to get a verification email.
  else if (token && errorMessage) {
    return (
      <main className='w-full h-screen flex flex-col items-center justify-center bg-cream text-[#565656] font-roboto p-5 md:p-0'>
        <div className='flex flex-col items-center justify-center gap-6 w-full max-w-xl mx-auto rounded-3xl shadow-lg py-12 px-8'>
          <IoIosCloseCircle className='text-olive text-9xl mx-auto' />
          <p className='font-medium text-xl text-center leading-[40px]'>
            {errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)}
          </p>

          <ReSendButton token={token} />
        </div>
      </main>
    );
  }

  return skeleton;
}