import { useAction, useQuery } from "convex/react";

import { useEffect, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";

export const useGetPolarCustUrl = () => {
  const isFetchingRef = useRef(false);
  const [billingUrl, setBillingUrl] = useState<string | null>(null);

  const user = useQuery(api.auth.currentUser);
  const generateCustomerPortalUrl = useAction(api.polar.generateCustomerPortalUrl);

  useEffect(() => {
    if (!user) return;

    const fetchBillingUrl = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      const response = await generateCustomerPortalUrl().catch(() => null);
      if (response) {
        setBillingUrl(response.url);
      }

      isFetchingRef.current = false;
    };

    fetchBillingUrl();
  }, [generateCustomerPortalUrl, user]);

  return { billingUrl };
};
