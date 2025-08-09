import { create } from 'zustand'

interface Notification {
  notificationStatus: boolean;
  updateNotificationStatus: (status: boolean) => void;
}

const useNotificationStatus = create<Notification>((set) => ({
  notificationStatus: false,
  updateNotificationStatus: (status) => set({ notificationStatus: status })
}))

export default useNotificationStatus;