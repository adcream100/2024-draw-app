import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main className="bg-transparent">{children}</main>
    </div>
  );
};

export default Layout;
