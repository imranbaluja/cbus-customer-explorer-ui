import { useEffect } from "react";
import { useCustomerContext } from "../context/useCustomerContext";
import { fetchCustomers } from "../api/client";

export function useCustomers() {
  const { page, limit, search, dispatch, customers, total, loading, error } = useCustomerContext();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      dispatch({ type: "FETCH_START" });
      try {
        const resp = await fetchCustomers({ page, limit, search });
        if (cancelled) return;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: {
            customers: resp.data,
            page: resp.meta.page,
            limit: resp.meta.limit,
            total: resp.meta.totalItems,
          },
        });
      } catch (err) {
        if (cancelled) return;
        dispatch({
          type: "FETCH_ERROR",
          payload: { error: (err as Error).message ?? "Unknown error" },
        });
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [page, limit, search, dispatch]);

  return {
    customers,
    total,
    page,
    limit,
    search,
    loading,
    error,
    dispatch,
  };
}
