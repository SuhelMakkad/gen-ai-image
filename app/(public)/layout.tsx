import React from "react";

import { Navbar } from "./components/navbar";

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};

export default PublicLayout;
