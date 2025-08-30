import { getMetaData } from "@/utils/seo";

import { Navbar } from "../(public)/components/navbar";

export const metadata = getMetaData({
  title: "Dashboard",
});

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar className="border-b-0" />

      <main className="wrapper flex-1">{children}</main>
    </>
  );
};

export default DashboardLayout;
