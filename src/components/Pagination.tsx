import { useCustomerContext } from "../context/useCustomerContext";

export function Pagination() {
  const { page, limit, total, dispatch, loading } = useCustomerContext();

  const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const handlePrev = () => {
    if (!canPrev) return;
    dispatch({ type: "SET_PAGE", payload: { page: page - 1 } });
  };

  const handleNext = () => {
    if (!canNext) return;
    dispatch({ type: "SET_PAGE", payload: { page: page + 1 } });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value) || 10;
    dispatch({ type: "SET_PAGE_SIZE", payload: { limit: newSize } });
  };

  return (
    <div className="pagination" aria-label="Pagination">
      <div>
        <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>
          Showing{" "}
          <strong>
            {total === 0 ? 0 : (page - 1) * limit + 1}–{Math.min(page * limit, total)}
          </strong>{" "}
          of <strong>{total}</strong> customers
        </span>
      </div>
      <div className="pagination-controls">
        <label style={{ fontSize: "0.85rem" }}>
          Page size{" "}
          <select className="select" value={limit} onChange={handlePageSizeChange} disabled={loading}>
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <button className="btn" onClick={handlePrev} disabled={!canPrev || loading}>
          Previous
        </button>
        <span style={{ fontSize: "0.85rem" }}>
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <button className="btn" onClick={handleNext} disabled={!canNext || loading}>
          Next
        </button>
      </div>
    </div>
  );
}
