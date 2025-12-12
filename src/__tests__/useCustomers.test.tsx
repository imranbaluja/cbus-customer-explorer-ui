/// <reference types="vitest" />
import { renderHook, waitFor } from "@testing-library/react";
import { CustomerProvider } from "../context/CustomerContext";
import { useCustomers } from "../hooks/useCustomers";

// Mock fetch
global.fetch = vi.fn();

const mockResponse = {
  data: [
    {
      id: "1",
      fullName: "Test User",
      email: "test@example.com",
      registrationDate: "2024-01-01T00:00:00.000Z",
    },
  ],
  page: 1,
  limit: 10,
  total: 1,
};

describe("useCustomers", () => {
  beforeEach(() => {
    // @ts-expect-error Vitest global
    (global.fetch as unknown as vi.Mock).mockReset();
  });

  it("fetches data on mount", async () => {
    // @ts-expect-error Vitest global
    (global.fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => <CustomerProvider>{children}</CustomerProvider>;

    const { result } = renderHook(() => useCustomers(), { wrapper });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.customers).toHaveLength(1);
    expect(result.current.customers[0].fullName).toBe("Test User");
  });

  it("handles fetch error", async () => {
    // @ts-expect-error Vitest global
    (global.fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Server error",
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => <CustomerProvider>{children}</CustomerProvider>;

    const { result } = renderHook(() => useCustomers(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toMatch(/Server error/i);
  });
});
