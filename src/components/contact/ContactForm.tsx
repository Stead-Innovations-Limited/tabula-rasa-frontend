"use client";
import { useActionState, startTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";

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
import { AiOutlineLoading3Quarters } from "@/components/icons";
import { contactSchema } from "@/lib/definitions";
import { Textarea } from "../ui/textarea";
import submitContactAction from "@/server-actions/submitContactAction";
import useToast from "@/hooks/useToast";

function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactAction, {
    errors: {},
    message: undefined,
    error: undefined,
    data: undefined,
  });

  useToast(state);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(formData: z.infer<typeof contactSchema>) {
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <section className="flex flex-col gap-5">
      <h2 className="font-roboto text-olive text-4xl font-semibold">Contact Us</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-olive'>Name</FormLabel>
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-olive'>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='tabularasa@mail.io'
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
            name='message'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-olive !text-base !md:text-lg'>
                  Message*
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us about yourself'
                    {...field}
                    className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full flex items-center justify-center'>
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
                <>Send Message</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}

export default ContactForm;
