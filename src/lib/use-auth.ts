import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
  [key: string]: any;
};

function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return Date.now() / 1000 > decoded.exp;
  } catch {
    return true;
  }
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      router.replace("/auth/v2/login");
      return;
    }
    setIsAuthenticated(true);
  }, [router]);

  return isAuthenticated;
}
