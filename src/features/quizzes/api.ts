import axiosInstance from "../../api/axiosInstance";

export interface Quiz {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  course: string;
  topic: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const res = await axiosInstance.get<Quiz[]>("/quizzes");
  return res.data;
};
