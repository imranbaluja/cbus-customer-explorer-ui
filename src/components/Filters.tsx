import { useCustomerContext } from "../context/useCustomerContext";

export function Filters() {
  const { search, dispatch } = useCustomerContext();

  return (
    <div className="filters" aria-label="Filters">
      <input
        className="input"
        type="search"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: { search: e.target.value } })}
        aria-label="Search customers by name or email"
      />
    </div>
  );
}
