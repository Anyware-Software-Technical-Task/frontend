import { describe, it, expect, beforeEach, vi } from "vitest";
import reducer, { loginUser, logout } from "./authSlice";
import authService from "./authService";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null as string | null,
};

describe("authSlice", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle logout", () => {
    const state = { ...initialState, token: "abc", isAuthenticated: true };
    const nextState = reducer(state, logout());
    expect(nextState.token).toBe(null);
    expect(nextState.isAuthenticated).toBe(false);
  });

  it("should handle loginUser.pending", () => {
    const action = { type: loginUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it("should handle loginUser.fulfilled", () => {
    const action = { type: loginUser.fulfilled.type, payload: "token123" };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.token).toBe("token123");
    expect(state.isAuthenticated).toBe(true);
  });

  it("should handle loginUser.rejected", () => {
    const action = {
      type: loginUser.rejected.type,
      payload: "Invalid credentials",
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Invalid credentials");
  });
});

import { configureStore } from "@reduxjs/toolkit";
describe("loginUser thunk", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches fulfilled on success", async () => {
    vi.spyOn(authService, "login").mockResolvedValue("token123");
    const store = configureStore({ reducer: { auth: reducer } });
    await store.dispatch<any>(loginUser({ email: "a", password: "b" }));
    const state = store.getState().auth;
    expect(state.token).toBe("token123");
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it("dispatches rejected on error", async () => {
    vi.spyOn(authService, "login").mockRejectedValue(new Error("fail"));
    const store = configureStore({ reducer: { auth: reducer } });
    await store.dispatch<any>(loginUser({ email: "a", password: "b" }));
    const state = store.getState().auth;
    expect(state.token).toBe(null);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe("fail");
  });
});
