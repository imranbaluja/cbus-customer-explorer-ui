import { Layout } from "./components/Layout";
import { CustomerProvider } from "./context/CustomerContext";
import { useCustomers } from "./hooks/useCustomers";
import { CustomerTable } from "./components/CustomerTable";
import { Pagination } from "./components/Pagination";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorMessage } from "./components/ErrorMessage";
import { Filters } from "./components/Filters";

function CustomerPage() {
  const { customers, loading, error, dispatch, page } = useCustomers();

  return (
    <>
      <Filters />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} onRetry={() => dispatch({ type: "SET_PAGE", payload: { page } })} />}
      {!loading && !error && <CustomerTable customers={customers} />}
      <Pagination />
    </>
  );
}

// Simpler: wrap CustomerPage directly in provider
export default function App() {
  return (
    <CustomerProvider>
      <Layout>
        <CustomerPage />
      </Layout>
    </CustomerProvider>
  );
}
