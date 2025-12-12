import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-root">
      <main className="app-container" aria-label="Cbusplorer">
        <header className="app-header">
          <h1>Cbus Customer Data Explorer</h1>
          <p>Browse customer records from the backend Lambda with pagination and search.</p>
        </header>
        {children}
      </main>
    </div>
  );
}
