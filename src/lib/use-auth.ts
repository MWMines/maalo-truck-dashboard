import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setIsAuthenticated(false);
      router.replace("/auth/v2/login");
      return;
    }
    try {
      // const decoded: any = jwtDecode(token);
      // Check expiration (exp is in seconds)
      //   if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      //     localStorage.removeItem("jwt");
      //     setIsAuthenticated(false);
      //     router.replace("/auth/v2/login");
      //   } else {
      setIsAuthenticated(true);
      // }
    } catch {
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      router.replace("/auth/v2/login");
    }
  }, [router]);

  return isAuthenticated;
}
