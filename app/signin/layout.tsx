import { getMetaData } from "@/utils/seo";

export const metadata = getMetaData({
  title: "Sign In",
});

const SignInLayout = ({ children }: React.PropsWithChildren) => {
  return <>{children}</>;
};

export default SignInLayout;
