import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex justify-center items-center h-screen">
      <main className="p-12 z-10 bg-transparent">{children}</main>
    </div>
  );
};

export default Layout;
