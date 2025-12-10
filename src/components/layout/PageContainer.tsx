import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`max-w-4xl mx-auto px-4 py-6 ${className}`}>
      {children}
    </main>
  );
}
