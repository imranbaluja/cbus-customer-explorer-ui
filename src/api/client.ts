import type { CustomerListResponse } from "../types/customer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001"; // Corrected to use VITE_API_BASE_URL

export interface FetchCustomersParams {
  page: number;
  limit: number;
  search?: string;
}

export async function fetchCustomers(params: FetchCustomersParams): Promise<CustomerListResponse> {
  const url = new URL("/customers", API_BASE_URL);

  url.searchParams.set("page", String(params.page));
  url.searchParams.set("limit", String(params.limit));
  if (params.search) {
    url.searchParams.set("search", params.search.trim());
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch customers (status ${res.status})`);
  }

  const json = (await res.json()) as CustomerListResponse;

  // Basic runtime validation – adjust to match your backend shape if needed
  if (!Array.isArray(json.data) || typeof json.meta.page !== "number") {
    throw new Error("Unexpected response format from server");
  }

  return json;
}
