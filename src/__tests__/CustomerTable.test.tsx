import { render, screen } from "@testing-library/react";
import { CustomerTable } from "../components/CustomerTable";
import type { Customer } from "../types/customer";
import { describe, it, expect } from "vitest";
const customers: Customer[] = [
  {
    id: "1",
    fullName: "Alice Smith",
    email: "alice@example.com",
    registrationDate: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    fullName: "Bob Brown",
    email: "bob@example.com",
    registrationDate: "2024-02-01T00:00:00.000Z",
  },
];

describe("CustomerTable", () => {
  it("renders customer rows", () => {
    render(<CustomerTable customers={customers} />);

    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Brown")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("renders empty state when no customers", () => {
    render(<CustomerTable customers={[]} />);
    expect(screen.getByText(/No customers found/i)).toBeInTheDocument();
  });
});
