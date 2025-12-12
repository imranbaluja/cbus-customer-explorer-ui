import React, { useReducer, type ReactNode } from "react";
import { CustomerContext } from "./CustomerContextInstance";
import type { Customer } from "../types/customer";

interface CustomerState {
  customers: Customer[];
  page: number;
  limit: number;
  total: number;
  loading: boolean;
  error: string | null;
  search: string;
}

type CustomerAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: { customers: Customer[]; page: number; limit: number; total: number } }
  | { type: "FETCH_ERROR"; payload: { error: string } }
  | { type: "SET_PAGE"; payload: { page: number } }
  | { type: "SET_PAGE_SIZE"; payload: { limit: number } }
  | { type: "SET_SEARCH"; payload: { search: string } };

const initialState: CustomerState = {
  customers: [],
  page: 1,
  limit: 10,
  total: 0,
  loading: false,
  error: null,
  search: "",
};

function customerReducer(state: CustomerState, action: CustomerAction): CustomerState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        customers: action.payload.customers,
        page: action.payload.page,
        limit: action.payload.limit,
        total: action.payload.total,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload.error };
    case "SET_PAGE":
      return { ...state, page: action.payload.page };
    case "SET_PAGE_SIZE":
      return { ...state, limit: action.payload.limit, page: 1 };
    case "SET_SEARCH":
      return { ...state, search: action.payload.search, page: 1 };
    default:
      return state;
  }
}

export interface CustomerContextValue extends CustomerState {
  dispatch: React.Dispatch<CustomerAction>;
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  return <CustomerContext.Provider value={{ ...state, dispatch }}>{children}</CustomerContext.Provider>;
}
