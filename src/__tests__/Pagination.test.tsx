import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "../components/Pagination";
import { CustomerProvider } from "../context/CustomerContext";
import { useCustomerContext } from "../context/useCustomerContext";
import type { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <CustomerProvider>{children}</CustomerProvider>;
}

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

      // Set an artificial total so that multiple pages exist
      if (total === 0) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { customers: [], page: 1, limit: 10, total: 100 },
        });
      }

      return <Pagination />;
    };

    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    );

    const nextButton = screen.getByRole("button", { name: /Next/i });
    expect(nextButton).not.toBeDisabled();
    fireEvent.click(nextButton);

    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
  });
});
