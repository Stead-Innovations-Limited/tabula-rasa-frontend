"use client";
import { useActionState, useEffect, startTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import PersonalImagePicker from "../reusable-ui/PersonalImagePicker";
import { AiOutlineLoading3Quarters, BsChevronRight } from "@/components/icons";
import personalProfileAction from "@/server-actions/personalProfileAction";
import { UserData } from "@/app/page";
import { useSession } from "next-auth/react";

const schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
});

export default function PersonalProfileForm({
  userData,
}: {
  userData: UserData;
}) {
  const { data: session, update } = useSession();
  const [state, action, isPending] = useActionState(personalProfileAction, {
    errors: {},
    success: undefined,
    message: undefined,
    error: undefined,
    errorData: undefined,
  });

  useEffect(() => {
    if (state?.error) {
      toast.error(state.message, {
        classNames: {
          toast: "!text-red-500",
          title: "!text-red-500",
          description: "!text-red-500",
        },
      });

    }

    if (state?.success) {
      update({
        user: {
          ...session?.user,
          firstName: state.data.firstname,
          lastName: state.data.lastname,
        },
      });

      form.reset({
        firstname: state.data.firstname,
        lastname: state.data.lastname,
      });

      toast.success(state.message, {
        classNames: {
          toast: "!text-green-700",
          title: "!text-green-700",
          description: "!text-green-700",
        },
      });
    }
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: userData.firstName,
      lastname: userData.lastName,
    },
  });

  function onSubmit(formData: z.infer<typeof schema>) {
    if (!session?.sessionToken || !session?.user.id) {
      return;
    }

    startTransition(() => {
      const formDataWithSession = {
        ...formData,
        token: session.sessionToken!,
        userId: session.user.id!,
      };
      action(formDataWithSession);
    });
  }

  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 md:pt-10 md:pb-20 flex flex-col gap-10 md:gap-18'>
        {/* The Button */}
        <div className='w-full flex items-center justify-end font-roboto text-xl md:text-2xl'>
          <Button className='bg-transparent hover:bg-transparent shadow-none md:bg-olive md:hover:bg-olive/90 text-base text-olive md:text-white py-6 !px-0 md:!px-10'>
            Switch to Business Profile
            <BsChevronRight className='size-6 md:hidden' />
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
            <PersonalImagePicker />
            <hr className='border-olive w-full' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive'>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Bisi'
                        type='text'
                        {...field}
                        className='py-2 border-1 border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive'>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Adebayo'
                        type='text'
                        {...field}
                        className='py-2 border-1 border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='md:col-span-2 w-full flex items-center justify-center'>
                <Button
                  type='submit'
                  className='w-1/2 bg-olive hover:bg-olive/90 text-white disabled:bg-olive/90 py-6'
                >
                  {isPending ? (
                    <>
                      Loading{" "}
                      <AiOutlineLoading3Quarters className='animate-spin size-4' />
                    </>
                  ) : (
                    <>Save</>
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
