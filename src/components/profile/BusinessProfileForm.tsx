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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { AiOutlineLoading3Quarters } from "@/components/icons";

import { businessProfileSchema } from "@/lib/clientDefinitions";
import businessProfileAction from "@/server-actions/businessProfileAction";
import BusinessImagePicker from "../reusable-ui/BusinessImagePicker";
import { countriesData } from "@/lib/countries";
import { UserData } from "@/app/page";
import { useSession } from "next-auth/react";
import { getUserDetails } from "@/server-actions/getUserDetails";


export default function BusinessProfileForm({
  userData,
}: {
  userData: UserData;
}) {
  const { data: session, update } = useSession();
  const [state, action, isPending] = useActionState(
    businessProfileAction,
    undefined
  );

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
          email: state.data.email,
        },
      });


      form.reset({
        firstname: state.data.firstname,
        lastname: state.data.lastname,
        email: state.data.email,
        phone: state.data.phone,
        serviceAddress: state.data.serviceAddress,
        expertiseArea: state.data.expertiseArea,
        professionalExperience: state.data.professionalExperience.toString() as "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10",
        businessRate: state.data.businessRate,
        country: state.data.country,
        bio: state.data.bio,
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

  const form = useForm<z.infer<typeof businessProfileSchema>>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      firstname: userData.firstName,
      lastname: userData.lastName,
      email: userData.email,
      phone: "",
      serviceAddress: "",
      expertiseArea: "Vinyasa Yoga",
      professionalExperience: "1",
      businessRate: "",
      country: "Nigeria",
      bio: "",
    },
  });

  useEffect(() => {
    // Call a server action to fetch the user's business profile data
    // and set the form's default values accordingly.
    const fetchProfile = async () => {
      const res = await getUserDetails(userData.token)
      return res;
    }

    // form.reset({

    // });
    fetchProfile();
  }, [userData]);

  function onSubmit(formData: z.infer<typeof businessProfileSchema>) {
    if (!session?.sessionToken || !session?.user.id) {
      return;
    }

    const formDataWithSession = {
      ...formData,
      professionalExperience: parseInt(formData.professionalExperience, 10),
      token: session.sessionToken!,
      userId: session.user.id!,
    };

    startTransition(() => {
      action(formDataWithSession);
    });
  }

  return (
    <section className='w-full'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5 md:pt-10 md:pb-20'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-10'>
            <BusinessImagePicker />
            <hr className='border-olive w-full' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Bisi'
                        type='text'
                        {...field}
                        className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
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
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Adebayo'
                        type='text'
                        {...field}
                        className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
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
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='you@example.com'
                        {...field}
                        className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Business Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='tel'
                        placeholder='XXX-XXXX-XXXX'
                        {...field}
                        className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Address Section */}
              <div className='md:col-span-2'>
                <FormField
                  control={form.control}
                  name='serviceAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Where do you offer your services?
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='e.g, Surulere, Lagos, Nigeria'
                          {...field}
                          className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Area of Expertise */}
              <FormField
                control={form.control}
                name='expertiseArea'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Areas of Expertise
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                          <SelectValue placeholder='Select a verified email to display' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Vinyasa Yoga'>
                          Vinyasa Yoga
                        </SelectItem>
                        <SelectItem value='Mindfulness & Meditation'>
                          Mindfulness & Meditation
                        </SelectItem>
                        <SelectItem value='Emotional Healing & Inner Work'>
                          Emotional Healing & Inner Work
                        </SelectItem>
                        <SelectItem value='Holistic Nutrition & Wellness Coaching'>
                          Holistic Nutrition & Wellness Coaching
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Professional Experience */}
              <FormField
                control={form.control}
                name='professionalExperience'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Professional Experience
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                          <SelectValue placeholder='Select your professional experience' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='0'>Less than 1 year</SelectItem>
                        <SelectItem value='1'>1 year experience</SelectItem>
                        <SelectItem value='2'>2 years experience</SelectItem>
                        <SelectItem value='3'>3 years experience</SelectItem>
                        <SelectItem value='4'>4 years experience</SelectItem>
                        <SelectItem value='5'>5 years experience</SelectItem>
                        <SelectItem value='6'>6 years experience</SelectItem>
                        <SelectItem value='7'>7 years experience</SelectItem>
                        <SelectItem value='8'>8 years experience</SelectItem>
                        <SelectItem value='9'>9 years experience</SelectItem>
                        <SelectItem value='10'>10 years experience</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Business Rate */}
              <FormField
                control={form.control}
                name='businessRate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Rate
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='$ 400.00/hr'
                        {...field}
                        className='py-2 border-1 h-10 md:h-12 !text-base !md:text-lg  border-lightolive focus:border-olive focus:border-1 focus:outline-none'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Country Selection */}
              <FormField
                control={form.control}
                name='country'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-olive !text-base !md:text-lg'>
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full !h-10 md:!h-12 !text-base !md:text-lg border-lightolive focus:outline-none'>
                        <SelectValue placeholder='Select your country' />
                      </SelectTrigger>
                      <SelectContent>
                        {countriesData.map((c) => (
                          <SelectItem key={c.code} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Bio Section */}
              <div className='md:col-span-2'>
                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-olive !text-base !md:text-lg'>
                        Bio
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
              </div>

              <div className='md:col-span-2 w-full flex items-center justify-center'>
                <Button
                  type='submit'
                  className='w-1/2 bg-olive hover:bg-olive/80 text-white disabled:bg-olive/80 py-6'
                >
                  {isPending ? (
                    <>
                      Loading{" "}
                      <AiOutlineLoading3Quarters className='animate-spin size-4' />
                    </>
                  ) : (
                    <>Continue</>
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
