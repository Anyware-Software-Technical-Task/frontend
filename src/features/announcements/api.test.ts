import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchAnnouncements } from "./api";
import axiosInstance from "../../api/axiosInstance";

vi.mock("../../api/axiosInstance");

const mockAnnouncements = [
  {
    _id: "1",
    title: "Test Announcement",
    content: "This is a test",
    author: "Admin",
    role: "events",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

describe("fetchAnnouncements", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches announcements successfully", async () => {
    (axiosInstance.get as any).mockResolvedValue({ data: mockAnnouncements });
    const data = await fetchAnnouncements();
    expect(data).toEqual(mockAnnouncements);
    expect(axiosInstance.get).toHaveBeenCalledWith("/announcements");
  });

  it("throws on error", async () => {
    (axiosInstance.get as any).mockRejectedValue(new Error("Network error"));
    await expect(fetchAnnouncements()).rejects.toThrow("Network error");
  });
});
