import { Navbar } from "../(public)/components/navbar";

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />

      <main className="wrapper flex-1">{children}</main>
    </>
  );
};

export default DashboardLayout;
