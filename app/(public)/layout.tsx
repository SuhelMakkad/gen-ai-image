import React from "react";

import { Navbar } from "./components/navbar";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar className="bg-transparent backdrop-blur-none" />

      {children}
    </>
  );
};

export default PublicLayout;
