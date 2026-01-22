import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <div className="ml-60">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}