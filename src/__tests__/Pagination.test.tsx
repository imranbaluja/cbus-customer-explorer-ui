import { cleanup, render, screen, fireEvent, within } from "@testing-library/react";
import { Pagination } from "../components/Pagination";
import { CustomerProvider } from "../context/CustomerContext";
import { useCustomerContext } from "../context/useCustomerContext";
import type { ReactNode } from "react";
import { describe, it, expect, afterEach } from "vitest";
import React from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <CustomerProvider>{children}</CustomerProvider>;
}
// Ensures each test starts with a clean DOM so queries don't find duplicates.
afterEach(() => {
  cleanup();
});

describe("Pagination", () => {
  it("disables Previous on first page", () => {
    render(
      <Wrapper>
        <Pagination />
      </Wrapper>
    );

    const prevButton = screen.getByRole("button", { name: /Previous/i });
    expect(prevButton).toBeDisabled();
  });

  it("changes page size", () => {
    render(
      <Wrapper>
        <Pagination />
      </Wrapper>
    );

    const select = screen.getByLabelText(/Page size/i) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "20" } });
    expect(select.value).toBe("20");
  });

  it("increments page when Next is clicked (when allowed)", () => {
    const TestComponent = () => {
      const { dispatch, total } = useCustomerContext();

      React.useEffect(() => {
        if (total === 0) {
          dispatch({
            type: "FETCH_SUCCESS",
            payload: { customers: [], page: 1, limit: 10, total: 100 },
          });
        }
      }, [dispatch, total]);

      return <Pagination />;
    };

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    const pagination = screen.getByLabelText("Pagination");
    const nextButton = within(pagination).getByRole("button", { name: /Next/i });

    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    const pageInfo = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "span" && content.includes("Page") && content.includes("of");
    });

    expect(pageInfo).toHaveTextContent("Page 2 of 10");
  });
});
