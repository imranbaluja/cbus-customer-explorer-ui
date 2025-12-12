import { useContext } from "react";
import { CustomerContext } from "./CustomerContextInstance";
import type { CustomerContextValue } from "./CustomerContext";

export function useCustomerContext(): CustomerContextValue {
  const ctx = useContext(CustomerContext);
  if (!ctx) {
    throw new Error("useCustomerContext must be used within a CustomerProvider");
  }
  return ctx;
}
