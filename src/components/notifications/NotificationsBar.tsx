"use client";

import useNotificationStatus from "@/hooks/useNotificationStatus";
import { useEffect } from "react";

export default function NotificationsBar() {
  const notificationStatus = useNotificationStatus((state) => state.notificationStatus);
  const updateNotificationStatus = useNotificationStatus((state) => state.updateNotificationStatus);

  useEffect(() => {
    if(notificationStatus) {
      updateNotificationStatus(false);
    }
  }, [notificationStatus, updateNotificationStatus])

  return (
    <section className='w-full bg-linear-to-r from-olivewhite to-olive'>
      <div className='w-full xl:max-w-[1140px] mx-auto p-5'>
        <div className='flex flex-col gap-2 font-roboto text-olive'>
          <h2 className='text-3xl md:text-4xl font-semibold'>Notifications</h2>
        </div>
      </div>
    </section>
  )
}