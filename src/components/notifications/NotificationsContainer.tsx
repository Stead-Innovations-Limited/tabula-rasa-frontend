import getNotifications from "@/server-actions/getNotifications";
import { Notification } from "@/lib/types";
import NotificationLi from "@/components/notifications/NotificationLi";
import { cn } from "@/lib/utils";


export default async function NotificationsContainer() {
  const notifications = await getNotifications() as Notification[] | { error: boolean; errorData: string; message: string };

  if (!Array.isArray(notifications)) {
    return (
      <div className="w-full">
        <div className="w-full xl:max-w-[1140px] mx-auto p-5 font-roboto">
          <h3 className='text-2xl md:text-3xl font-semibold'>Notifications</h3>
          <p className="text-red-500">{notifications.message}</p>
        </div>
      </div>
    );
  }

  const sortedNotifications = notifications.sort((a: Notification, b: Notification) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <section className="w-full grow">
      <div className="w-full xl:max-w-[1140px] mx-auto p-5 font-roboto text-olive">
         <h3 className='text-2xl md:text-3xl font-semibold mb-5'>Today</h3>
        {/* This is where the notifications gets displayed */}

        <div className={cn("overflow-clip", notifications.length > 0 ? "shadow-lg rounded-3xl" : "shadow-none")}>
          {
              sortedNotifications.length > 0 ? (
                sortedNotifications.map((notification) => (
                  <NotificationLi key={notification.id} notification={notification} />
                ))
              ) : (
                <div className='flex justify-center items-center text-center text-xl text-gray-500'>You have no notifications.</div>
              )
            }
        </div>
      </div>
    </section>
  )
}