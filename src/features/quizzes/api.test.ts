import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchQuizzes } from "./api";
import axiosInstance from "../../api/axiosInstance";

vi.mock("../../api/axiosInstance");

const mockQuizzes = [
  {
    _id: "1",
    question: "What is 2+2?",
    options: ["3", "4", "5"],
    correctAnswer: "4",
    course: "Math 101",
    topic: "Addition",
    dueDate: "2024-01-01T00:00:00.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

describe("fetchQuizzes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches quizzes successfully", async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockQuizzes });
    const data = await fetchQuizzes();
    expect(data).toEqual(mockQuizzes);
    expect(axiosInstance.get).toHaveBeenCalledWith("/quizzes");
  });

  it("throws on error", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("Network error"));
    await expect(fetchQuizzes()).rejects.toThrow("Network error");
  });
});
