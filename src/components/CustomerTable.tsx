import type { Customer } from "../types/customer";

interface CustomerTableProps {
  customers: Customer[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString();
}

export function CustomerTable({ customers }: CustomerTableProps) {
  if (customers.length === 0) {
    return <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>No customers found.</p>;
  }

  return (
    <div className="table-wrapper" role="region" aria-label="Customer list">
      <table>
        <thead>
          <tr>
            <th scope="col">Customer ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>
                <span className="badge">{c.id}</span>
              </td>
              <td>{c.fullName}</td>
              <td>
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </td>
              <td>{formatDate(c.registrationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
