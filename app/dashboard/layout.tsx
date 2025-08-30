import { Navbar } from "../(public)/components/navbar";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar className="border-b-0" />

      <main className="wrapper flex-1">{children}</main>
    </>
  );
};

export default DashboardLayout;
