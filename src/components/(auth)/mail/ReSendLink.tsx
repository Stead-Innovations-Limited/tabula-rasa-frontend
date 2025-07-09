"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import reSendMail from "@/server-actions/reSendMail";
import { toast } from "sonner";

export default function ReSendLink({ token }: { token: string }) {
  const [active, setActive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown Effect
  useEffect(() => {
    if (!active || paused) return;

    timerRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 59) {
          clearInterval(timerRef.current!);
          setActive(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [active, paused]);

  const handleResend = async () => {
    setActive(true);
    setPaused(false);
    setSeconds(0); // Reset counter

    const response = (await reSendMail(token)) as {
      message?: string;
      error?: boolean;
      errorMessage?: string;
    };

    if (response?.error) {
      setPaused(true); // Pause countdown
      toast("Error", {
        description: "An error occurred while resending the email.",
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });
    } else {
      toast("Success", {
        description: "Verification email resent successfully.",
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
    }
  };

  return (
    <Button
      variant='link'
      className='text-olive font-normal text-lg'
      disabled={active && !paused}
      onClick={handleResend}
    >
      {paused ? "Retry?" : "Resend Email"}
      {active && !paused ? ` (${60 - seconds})` : ""}
    </Button>
  );
}
