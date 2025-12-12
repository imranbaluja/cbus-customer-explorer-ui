// src/__tests__/useCustomers.test.tsx
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import { CustomerProvider } from "../context/CustomerContext";
import { useCustomers } from "../hooks/useCustomers";
import * as client from "../api/client";

// Mock fetchCustomers from the API client
vi.mock("../api/client");

const mockResponse = {
  data: [
    {
      id: "1",
      fullName: "Test User",
      email: "test@example.com",
      registrationDate: "2024-01-01T00:00:00.000Z",
    },
  ],
  meta: {
    page: 1,
    limit: 10,
    totalItems: 1,
  },
};

describe("useCustomers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => <CustomerProvider>{children}</CustomerProvider>;

  it("fetches data on mount", async () => {
    (client.fetchCustomers as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCustomers(), { wrapper });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customers).toHaveLength(1);
    expect(result.current.customers[0].fullName).toBe("Test User");
  });

  it("handles fetch error", async () => {
    (client.fetchCustomers as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error("Server error"));

    const { result } = renderHook(() => useCustomers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toMatch(/Server error/i);
  });
});
