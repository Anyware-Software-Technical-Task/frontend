import axiosInstance from "../../api/axiosInstance";

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const res = await axiosInstance.get<Announcement[]>("/announcements");
  return res.data;
};
